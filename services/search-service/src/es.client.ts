import { Client } from '@elastic/elasticsearch'
import { createLogger } from '@mydigisence/logger'
import { config } from './config.js'

const log = createLogger('search-service:es')

export const esClient = new Client({ node: config.elasticsearchUrl })

export async function ensureIndices() {
  const indices = [
    {
      index: 'profiles',
      mappings: {
        properties: {
          userId: { type: 'keyword' },
          username: { type: 'keyword' },
          displayName: { type: 'text', fields: { keyword: { type: 'keyword' } } },
          bio: { type: 'text' },
          location: { type: 'keyword' },
          isPublic: { type: 'boolean' },
          createdAt: { type: 'date' },
        },
      },
    },
    {
      index: 'services',
      mappings: {
        properties: {
          workspaceId: { type: 'keyword' },
          title: { type: 'text', fields: { keyword: { type: 'keyword' } } },
          description: { type: 'text' },
          category: { type: 'keyword' },
          tags: { type: 'keyword' },
          price: { type: 'float' },
          status: { type: 'keyword' },
          rating: { type: 'float' },
          createdAt: { type: 'date' },
        },
      },
    },
    {
      index: 'workspaces',
      mappings: {
        properties: {
          name: { type: 'text', fields: { keyword: { type: 'keyword' } } },
          slug: { type: 'keyword' },
          type: { type: 'keyword' },
          description: { type: 'text' },
          isActive: { type: 'boolean' },
          isVerified: { type: 'boolean' },
          createdAt: { type: 'date' },
        },
      },
    },
  ]

  for (const { index, mappings } of indices) {
    const exists = await esClient.indices.exists({ index }).catch(() => false)
    if (!exists) {
      await esClient.indices.create({ index, mappings: mappings as Parameters<typeof esClient.indices.create>[0]['mappings'] })
      log.info({ index }, 'Created Elasticsearch index')
    }
  }
}
