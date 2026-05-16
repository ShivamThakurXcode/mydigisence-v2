import type { FastifyInstance } from 'fastify'
import { authenticate, optionalAuth } from '../middleware/auth.middleware.js'
import { marketplaceServiceLayer } from './service.service.js'
import { createListingSchema, updateListingSchema } from '@mydigisence/validations'

export async function serviceRoutes(app: FastifyInstance) {
  // GET /services — public list with filters
  app.get('/services', { preHandler: [optionalAuth] }, async (req, reply) => {
    const q = req.query as { workspaceId?: string; category?: string; status?: string; page?: string; limit?: string }
    const result = await marketplaceServiceLayer.list({
      workspaceId: q.workspaceId, category: q.category, status: q.status,
      page: Number(q.page ?? 1), limit: Number(q.limit ?? 20),
    })
    return reply.send({ success: true, data: result })
  })

  // GET /services/:id — public detail
  app.get('/services/:id', { preHandler: [optionalAuth] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const service = await marketplaceServiceLayer.getOne(id)
    return reply.send({ success: true, data: service })
  })

  // POST /services — create (authenticated, requires workspaceId in body)
  app.post('/services', { preHandler: [authenticate] }, async (req, reply) => {
    const body = req.body as { workspaceId: string } & Record<string, unknown>
    const { workspaceId, ...rest } = body
    const data = createListingSchema.parse(rest)
    const service = await marketplaceServiceLayer.create(workspaceId, req.user!.sub, data)
    return reply.code(201).send({ success: true, data: service })
  })

  // PUT /services/:id — update
  app.put('/services/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const data = updateListingSchema.parse(req.body)
    const service = await marketplaceServiceLayer.update(id, req.user!.sub, data)
    return reply.send({ success: true, data: service })
  })

  // POST /services/:id/publish — publish listing
  app.post('/services/:id/publish', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const service = await marketplaceServiceLayer.publish(id)
    return reply.send({ success: true, data: service })
  })

  // DELETE /services/:id
  app.delete('/services/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    await marketplaceServiceLayer.remove(id)
    return reply.code(204).send()
  })
}
