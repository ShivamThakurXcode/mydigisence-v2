import type { FastifyInstance } from 'fastify'
import { authenticate } from '../middleware/auth.middleware.js'
import { workspaceService } from './workspace.service.js'
import { createWorkspaceSchema, updateWorkspaceSchema, updateModulesSchema } from '@mydigisence/validations'

export async function workspaceRoutes(app: FastifyInstance) {
  // POST /users/:id/workspaces — Create workspace for user
  app.post('/users/:id/workspaces', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    if (req.user!.sub !== id) {
      return reply.code(403).send({ success: false, error: { code: 'FORBIDDEN', message: 'Forbidden' } })
    }
    const body = createWorkspaceSchema.parse(req.body)
    const workspace = await workspaceService.createWorkspace(id, body)
    return reply.code(201).send({ success: true, data: workspace })
  })

  // GET /workspaces/:id
  app.get('/workspaces/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const workspace = await workspaceService.getWorkspace(req.user!.sub, id)
    return reply.send({ success: true, data: workspace })
  })

  // PUT /workspaces/:id
  app.put('/workspaces/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const body = updateWorkspaceSchema.parse(req.body)
    const workspace = await workspaceService.updateWorkspace(req.user!.sub, id, body)
    return reply.send({ success: true, data: workspace })
  })

  // GET /workspaces/:id/modules
  app.get('/workspaces/:id/modules', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const result = await workspaceService.getWorkspaceModules(req.user!.sub, id)
    return reply.send({ success: true, data: result })
  })

  // PUT /workspaces/:id/modules
  app.put('/workspaces/:id/modules', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const body = updateModulesSchema.parse(req.body)
    const result = await workspaceService.updateModules(req.user!.sub, id, body)
    return reply.send({ success: true, data: result })
  })
}
