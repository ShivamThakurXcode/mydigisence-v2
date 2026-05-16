import type { FastifyInstance } from 'fastify'
import { authenticate, optionalAuth } from '../middleware/auth.middleware.js'
import { businessService } from './business.service.js'

export async function businessRoutes(app: FastifyInstance) {
  // GET /business/:workspaceId/public — public view, no auth
  app.get('/business/:workspaceId/public', { preHandler: [optionalAuth] }, async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string }
    const profile = await businessService.getPublicBusinessProfile(workspaceId)
    return reply.send({ success: true, data: profile })
  })

  // GET /business/:workspaceId — workspace member only
  app.get('/business/:workspaceId', { preHandler: [authenticate] }, async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string }
    const profile = await businessService.getBusinessProfile(req.user!.sub, workspaceId)
    return reply.send({ success: true, data: profile })
  })

  // POST /business/:workspaceId — create (owner/admin)
  app.post('/business/:workspaceId', { preHandler: [authenticate] }, async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string }
    const profile = await businessService.createBusinessProfile(
      req.user!.sub,
      workspaceId,
      req.body as Record<string, unknown>,
    )
    return reply.code(201).send({ success: true, data: profile })
  })

  // PUT /business/:workspaceId — update (admin+)
  app.put('/business/:workspaceId', { preHandler: [authenticate] }, async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string }
    const profile = await businessService.updateBusinessProfile(
      req.user!.sub,
      workspaceId,
      req.body as Record<string, unknown>,
    )
    return reply.send({ success: true, data: profile })
  })
}
