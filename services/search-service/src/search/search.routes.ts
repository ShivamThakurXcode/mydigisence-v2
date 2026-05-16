import type { FastifyInstance } from 'fastify'
import { esClient } from '../es.client.js'
import { createLogger } from '@mydigisence/logger'

const log = createLogger('search-service:routes')

export async function searchRoutes(app: FastifyInstance) {
  // GET /search?q=&type=all|profiles|services|workspaces&category=&page=&limit=
  app.get('/search', async (req, reply) => {
    const { q = '', type = 'all', category, page = '1', limit = '20' } = req.query as Record<string, string>
    const from = (Number(page) - 1) * Number(limit)
    const size = Number(limit)

    if (!q.trim()) return reply.send({ success: true, data: { hits: [], total: 0 } })

    const indices: string[] = type === 'all' ? ['profiles', 'services', 'workspaces'] : [type]

    try {
      const response = await esClient.search({
        index: indices.join(','),
        from, size,
        query: {
          bool: {
            must: [{ multi_match: { query: q, fields: ['title^3', 'name^3', 'displayName^3', 'description^2', 'bio', 'category', 'tags'], fuzziness: 'AUTO' } }],
            filter: [
              ...(category ? [{ term: { category } }] : []),
              ...(indices.includes('profiles') ? [{ term: { isPublic: true } }] : []),
            ],
          },
        },
        highlight: { fields: { title: {}, name: {}, displayName: {}, description: {} } },
      })

      const hits = response.hits.hits.map((h) => ({
        id: h._id, index: h._index, score: h._score,
        ...h._source as object,
        highlights: h.highlight,
      }))

      return reply.send({ success: true, data: { hits, total: typeof response.hits.total === 'object' ? response.hits.total.value : response.hits.total, page: Number(page), limit: size } })
    } catch (err) {
      log.warn({ err }, 'Elasticsearch search error — returning empty results')
      return reply.send({ success: true, data: { hits: [], total: 0, page: Number(page), limit: size } })
    }
  })

  // GET /search/autocomplete?q=&type=
  app.get('/search/autocomplete', async (req, reply) => {
    const { q = '', type = 'profiles' } = req.query as Record<string, string>
    if (q.length < 2) return reply.send({ success: true, data: [] })

    try {
      const response = await esClient.search({
        index: type,
        size: 5,
        query: {
          multi_match: {
            query: q, fields: ['title^2', 'name^2', 'displayName^2', 'username'],
            type: 'phrase_prefix',
          },
        },
        _source: ['id', 'title', 'name', 'displayName', 'username', 'category'],
      })

      return reply.send({ success: true, data: response.hits.hits.map((h) => ({ id: h._id, ...h._source as object })) })
    } catch {
      return reply.send({ success: true, data: [] })
    }
  })

  // POST /search/index — index a document (internal)
  app.post('/search/index', async (req, reply) => {
    const { index, id, document } = req.body as { index: string; id: string; document: object }
    await esClient.index({ index, id, document })
    return reply.send({ success: true })
  })

  // DELETE /search/index/:index/:id — remove from index
  app.delete('/search/index/:index/:id', async (req, reply) => {
    const { index, id } = req.params as { index: string; id: string }
    await esClient.delete({ index, id }).catch(() => null)
    return reply.send({ success: true })
  })
}
