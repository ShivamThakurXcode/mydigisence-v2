import type { FastifyInstance } from 'fastify'
import { authenticate } from '../middleware/auth.middleware.js'
import { userService } from './user.service.js'
import { updateUserSchema } from '@mydigisence/validations'

export async function userRoutes(app: FastifyInstance) {
  // GET /users/:id
  app.get('/users/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const user = await userService.getUser(req.user!.sub, id)
    return reply.send({ success: true, data: user })
  })

  // PUT /users/:id
  app.put('/users/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const body = updateUserSchema.parse(req.body)
    const user = await userService.updateUser(req.user!.sub, id, body)
    return reply.send({ success: true, data: user })
  })

  // GET /users/:id/workspaces
  app.get('/users/:id/workspaces', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const workspaces = await userService.getUserWorkspaces(req.user!.sub, id)
    return reply.send({ success: true, data: workspaces })
  })
}
