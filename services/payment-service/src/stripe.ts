import Stripe from 'stripe'
import { config } from './config.js'

export const stripe = new Stripe(config.stripe.secretKey, { apiVersion: '2025-04-30.basil' })

export const PLANS: Record<string, { priceId: string; name: string; amount: number }> = {
  starter: { priceId: 'price_starter', name: 'Starter', amount: 900 },
  pro: { priceId: 'price_pro', name: 'Pro', amount: 2900 },
  business: { priceId: 'price_business', name: 'Business', amount: 7900 },
  enterprise: { priceId: 'price_enterprise', name: 'Enterprise', amount: 19900 },
}
