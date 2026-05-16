import type { FastifyInstance } from 'fastify'
import { verifyAccessToken } from '@mydigisence/auth'
import { stripe, PLANS } from '../stripe.js'
import { config } from '../config.js'
import { createLogger } from '@mydigisence/logger'

const log = createLogger('payment-service')

async function authenticate(req: Parameters<Parameters<FastifyInstance['addHook']>[1]>[0], reply: Parameters<Parameters<FastifyInstance['addHook']>[1]>[1]) {
  const auth = req.headers['authorization']
  if (!auth?.startsWith('Bearer ')) return reply.code(401).send({ success: false, error: 'Unauthorized' })
  try { ;(req as typeof req & { userId: string }).userId = verifyAccessToken(auth.slice(7)).sub }
  catch { return reply.code(401).send({ success: false, error: 'Token expired' }) }
}

export async function paymentRoutes(app: FastifyInstance) {
  // GET /payments/plans — list available plans
  app.get('/payments/plans', async (_req, reply) => {
    return reply.send({ success: true, data: Object.entries(PLANS).map(([key, plan]) => ({ id: key, ...plan })) })
  })

  // POST /payments/intent — create payment intent for one-time booking payment
  app.post('/payments/intent', { preHandler: [authenticate] }, async (req, reply) => {
    const { amount, currency = 'usd', metadata = {} } = req.body as { amount: number; currency?: string; metadata?: Record<string, string> }
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    })
    return reply.send({ success: true, data: { clientSecret: intent.client_secret, intentId: intent.id } })
  })

  // POST /payments/subscription — create subscription checkout session
  app.post('/payments/subscription', { preHandler: [authenticate] }, async (req, reply) => {
    const { plan, workspaceId, successUrl, cancelUrl } = req.body as { plan: string; workspaceId: string; successUrl: string; cancelUrl: string }
    const planConfig = PLANS[plan]
    if (!planConfig) return reply.code(400).send({ success: false, error: { message: 'Invalid plan' } })

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { workspaceId, plan },
    })
    return reply.send({ success: true, data: { sessionUrl: session.url, sessionId: session.id } })
  })

  // POST /payments/portal — billing portal session
  app.post('/payments/portal', { preHandler: [authenticate] }, async (req, reply) => {
    const { customerId, returnUrl } = req.body as { customerId: string; returnUrl: string }
    const session = await stripe.billingPortal.sessions.create({ customer: customerId, return_url: returnUrl })
    return reply.send({ success: true, data: { url: session.url } })
  })

  // POST /payments/webhooks/stripe — Stripe webhook handler
  app.post('/payments/webhooks/stripe', async (req, reply) => {
    const sig = req.headers['stripe-signature'] as string
    let event: ReturnType<typeof stripe.webhooks.constructEvent>
    try {
      const body = JSON.stringify(req.body)
      event = stripe.webhooks.constructEvent(Buffer.from(body), sig, config.stripe.webhookSecret)
    } catch (err) {
      log.warn({ err }, 'Webhook signature verification failed')
      return reply.code(400).send({ error: 'Invalid signature' })
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        log.info({ intentId: (event.data.object as { id: string }).id }, 'Payment succeeded')
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        log.info({ subscriptionId: (event.data.object as { id: string }).id }, 'Subscription updated')
        break
      case 'customer.subscription.deleted':
        log.info({ subscriptionId: (event.data.object as { id: string }).id }, 'Subscription cancelled')
        break
      default:
        log.info({ type: event.type }, 'Unhandled webhook event')
    }

    return reply.send({ received: true })
  })
}
