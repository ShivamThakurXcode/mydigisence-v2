import type { FastifyInstance } from 'fastify'
import { authenticate, optionalAuth } from '../middleware/auth.middleware.js'
import { productRepository } from './product.repository.js'
import { NotFoundError } from '@mydigisence/utils'

export async function productRoutes(app: FastifyInstance) {
  app.get('/products', { preHandler: [optionalAuth] }, async (req, reply) => {
    const q = req.query as { workspaceId?: string; category?: string; page?: string; limit?: string }
    const limit = Number(q.limit ?? 20), skip = (Number(q.page ?? 1) - 1) * limit
    const [items, total] = await Promise.all([
      productRepository.findAll({ workspaceId: q.workspaceId, category: q.category, limit, skip }),
      productRepository.count({ workspaceId: q.workspaceId }),
    ])
    return reply.send({ success: true, data: { items, total, page: Number(q.page ?? 1), limit } })
  })

  app.get('/products/:id', { preHandler: [optionalAuth] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const product = await productRepository.findById(id)
    if (!product) throw new NotFoundError('Product', id)
    return reply.send({ success: true, data: product })
  })

  app.post('/products', { preHandler: [authenticate] }, async (req, reply) => {
    const { workspaceId, ...data } = req.body as { workspaceId: string } & Parameters<typeof productRepository.create>[1]
    const product = await productRepository.create(workspaceId, data)
    return reply.code(201).send({ success: true, data: product })
  })

  app.put('/products/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const product = await productRepository.findById(id)
    if (!product) throw new NotFoundError('Product', id)
    const updated = await productRepository.update(id, req.body as Parameters<typeof productRepository.update>[1])
    return reply.send({ success: true, data: updated })
  })

  app.delete('/products/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const product = await productRepository.findById(id)
    if (!product) throw new NotFoundError('Product', id)
    await productRepository.delete(id)
    return reply.code(204).send()
  })
}
