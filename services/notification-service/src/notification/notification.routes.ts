import type { FastifyInstance } from 'fastify'
import { verifyAccessToken } from '@mydigisence/auth'
import { ERROR_CODES } from '@mydigisence/constants'
import { notificationService } from './notification.service.js'

async function authenticate(req: Parameters<Parameters<FastifyInstance['addHook']>[1]>[0], reply: Parameters<Parameters<FastifyInstance['addHook']>[1]>[1]) {
  const auth = req.headers['authorization']
  if (!auth?.startsWith('Bearer ')) {
    return reply.code(401).send({ success: false, error: { code: ERROR_CODES.TOKEN_INVALID, message: 'Unauthorized' } })
  }
  try {
    ;(req as typeof req & { user: ReturnType<typeof verifyAccessToken> }).user = verifyAccessToken(auth.slice(7))
  } catch {
    return reply.code(401).send({ success: false, error: { code: ERROR_CODES.TOKEN_EXPIRED, message: 'Token expired' } })
  }
}

export async function notificationRoutes(app: FastifyInstance) {
  // Internal: POST /notifications — create notification (called by other services)
  app.post('/notifications', async (req, reply) => {
    const body = req.body as { userId: string; type: string; title: string; content: string; actionUrl?: string; data?: object }
    const notification = await notificationService.create(body as Parameters<typeof notificationService.create>[0])
    return reply.code(201).send({ success: true, data: notification })
  })

  // GET /notifications/me — list for current user
  app.get('/notifications/me', { preHandler: [authenticate] }, async (req, reply) => {
    const user = (req as typeof req & { user: { sub: string } }).user
    const q = req.query as { page?: string; limit?: string }
    const notifications = await notificationService.getForUser(user.sub, Number(q.page ?? 1), Number(q.limit ?? 20))
    const unread = await notificationService.getUnreadCount(user.sub)
    return reply.send({ success: true, data: { notifications, unreadCount: unread } })
  })

  // PUT /notifications/:id/read — mark single read
  app.put('/notifications/:id/read', { preHandler: [authenticate] }, async (req, reply) => {
    const user = (req as typeof req & { user: { sub: string } }).user
    const { id } = req.params as { id: string }
    await notificationService.markRead(id, user.sub)
    return reply.send({ success: true })
  })

  // PUT /notifications/read-all — mark all read
  app.put('/notifications/read-all', { preHandler: [authenticate] }, async (req, reply) => {
    const user = (req as typeof req & { user: { sub: string } }).user
    await notificationService.markAllRead(user.sub)
    return reply.send({ success: true })
  })

  // GET /notifications/unread-count
  app.get('/notifications/unread-count', { preHandler: [authenticate] }, async (req, reply) => {
    const user = (req as typeof req & { user: { sub: string } }).user
    const count = await notificationService.getUnreadCount(user.sub)
    return reply.send({ success: true, data: { count } })
  })
}
