import type { FastifyInstance } from 'fastify'
import { verifyAccessToken } from '@mydigisence/auth'
import { contactRepository } from './contact.repository.js'
import { NotFoundError } from '@mydigisence/utils'
import type { JwtPayload } from '@mydigisence/auth'

declare module 'fastify' { interface FastifyRequest { user?: JwtPayload } }

async function authenticate(req: Parameters<Parameters<FastifyInstance['addHook']>[1]>[0], reply: Parameters<Parameters<FastifyInstance['addHook']>[1]>[1]) {
  const auth = req.headers['authorization']
  if (!auth?.startsWith('Bearer ')) return reply.code(401).send({ success: false, error: 'Unauthorized' })
  try { ;(req as typeof req & { user: JwtPayload }).user = verifyAccessToken(auth.slice(7)) }
  catch { return reply.code(401).send({ success: false, error: 'Token expired' }) }
}

export async function contactRoutes(app: FastifyInstance) {
  // GET /crm/:workspaceId/contacts
  app.get('/crm/:workspaceId/contacts', { preHandler: [authenticate] }, async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string }
    const q = req.query as { status?: string; stage?: string; page?: string; limit?: string; q?: string }
    const limit = Number(q.limit ?? 20), skip = (Number(q.page ?? 1) - 1) * limit
    const [contacts, total] = await Promise.all([
      contactRepository.findAll(workspaceId, { status: q.status as Parameters<typeof contactRepository.findAll>[1]['status'], stage: q.stage, limit, skip, q: q.q }),
      contactRepository.count(workspaceId, { status: q.status as Parameters<typeof contactRepository.count>[1]['status'], stage: q.stage }),
    ])
    return reply.send({ success: true, data: { contacts, total, page: Number(q.page ?? 1), limit } })
  })

  // GET /crm/:workspaceId/contacts/:id
  app.get('/crm/:workspaceId/contacts/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const contact = await contactRepository.findById(id)
    if (!contact) throw new NotFoundError('Contact', id)
    return reply.send({ success: true, data: contact })
  })

  // POST /crm/:workspaceId/contacts
  app.post('/crm/:workspaceId/contacts', { preHandler: [authenticate] }, async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string }
    const contact = await contactRepository.create(workspaceId, req.body as Parameters<typeof contactRepository.create>[1])
    return reply.code(201).send({ success: true, data: contact })
  })

  // PUT /crm/:workspaceId/contacts/:id
  app.put('/crm/:workspaceId/contacts/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const contact = await contactRepository.update(id, req.body as Parameters<typeof contactRepository.update>[1])
    return reply.send({ success: true, data: contact })
  })

  // POST /crm/:workspaceId/contacts/:id/notes
  app.post('/crm/:workspaceId/contacts/:id/notes', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const user = (req as typeof req & { user: JwtPayload }).user!
    const { content } = req.body as { content: string }
    const contact = await contactRepository.addNote(id, { content, authorId: user.sub, createdAt: new Date().toISOString() })
    return reply.send({ success: true, data: contact })
  })

  // DELETE /crm/:workspaceId/contacts/:id
  app.delete('/crm/:workspaceId/contacts/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    await contactRepository.delete(id)
    return reply.code(204).send()
  })
}
