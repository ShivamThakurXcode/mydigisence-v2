import type { FastifyInstance } from 'fastify'
import { verifyAccessToken } from '@mydigisence/auth'
import { ERROR_CODES } from '@mydigisence/constants'
import { bookingService } from './booking.service.js'
import { createBookingSchema } from '@mydigisence/validations'
import type { JwtPayload } from '@mydigisence/auth'

declare module 'fastify' { interface FastifyRequest { user?: JwtPayload } }

async function authenticate(req: Parameters<Parameters<FastifyInstance['addHook']>[1]>[0], reply: Parameters<Parameters<FastifyInstance['addHook']>[1]>[1]) {
  const auth = req.headers['authorization']
  if (!auth?.startsWith('Bearer ')) return reply.code(401).send({ success: false, error: { code: ERROR_CODES.TOKEN_INVALID, message: 'Unauthorized' } })
  try { ;(req as typeof req & { user: JwtPayload }).user = verifyAccessToken(auth.slice(7)) }
  catch { return reply.code(401).send({ success: false, error: { code: ERROR_CODES.TOKEN_EXPIRED, message: 'Token expired' } }) }
}

export async function bookingRoutes(app: FastifyInstance) {
  // GET /availability — check slot availability
  app.get('/availability', async (req, reply) => {
    const q = req.query as { workspaceId: string; serviceId: string; dateTime: string; duration?: string }
    const result = await bookingService.checkAvailability(q.workspaceId, q.serviceId, q.dateTime, Number(q.duration ?? 60))
    return reply.send({ success: true, data: result })
  })

  // POST /bookings — create booking
  app.post('/bookings', { preHandler: [authenticate] }, async (req, reply) => {
    const data = createBookingSchema.parse(req.body)
    const booking = await bookingService.create(data, (req as typeof req & { user: JwtPayload }).user!.sub)
    return reply.code(201).send({ success: true, data: booking })
  })

  // GET /bookings/me — my bookings as customer
  app.get('/bookings/me', { preHandler: [authenticate] }, async (req, reply) => {
    const q = req.query as { page?: string; limit?: string }
    const bookings = await bookingService.getForUser((req as typeof req & { user: JwtPayload }).user!.sub, Number(q.page ?? 1), Number(q.limit ?? 20))
    return reply.send({ success: true, data: bookings })
  })

  // GET /bookings/workspace/:workspaceId — bookings for a workspace (provider)
  app.get('/bookings/workspace/:workspaceId', { preHandler: [authenticate] }, async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string }
    const q = req.query as { page?: string; limit?: string; from?: string; to?: string; status?: string }
    const bookings = await bookingService.getForWorkspace(workspaceId, { page: Number(q.page), limit: Number(q.limit), from: q.from, to: q.to, status: q.status })
    return reply.send({ success: true, data: bookings })
  })

  // GET /bookings/:id
  app.get('/bookings/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const booking = await bookingService.getOne(id, (req as typeof req & { user: JwtPayload }).user!.sub)
    return reply.send({ success: true, data: booking })
  })

  // POST /bookings/:id/confirm
  app.post('/bookings/:id/confirm', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const booking = await bookingService.confirm(id)
    return reply.send({ success: true, data: booking })
  })

  // POST /bookings/:id/cancel
  app.post('/bookings/:id/cancel', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const booking = await bookingService.cancel(id, (req as typeof req & { user: JwtPayload }).user!.sub)
    return reply.send({ success: true, data: booking })
  })

  // POST /bookings/:id/complete
  app.post('/bookings/:id/complete', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const booking = await bookingService.complete(id)
    return reply.send({ success: true, data: booking })
  })
}
