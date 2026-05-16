import { PrismaClient } from '../../packages/database/node_modules/.prisma/client/index.js'

const prisma = new PrismaClient()
const ES_URL = process.env['ELASTICSEARCH_URL'] ?? 'http://localhost:9200'

async function indexEntity(index: string, id: string, doc: object) {
  await fetch(`${ES_URL}/${index}/_doc/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doc),
  })
}

async function reindex() {
  console.log('🔄 Reindexing Elasticsearch...')
  await prisma.$connect()

  // Index profiles
  const profiles = await prisma.profile.findMany({ where: { isPublic: true } })
  console.log(`Indexing ${profiles.length} profiles...`)
  for (const p of profiles) {
    await indexEntity('profiles', p.id, { userId: p.userId, username: p.username, displayName: p.displayName, bio: p.bio, location: p.location, isPublic: p.isPublic, viewCount: p.viewCount, createdAt: p.createdAt })
  }

  // Index services
  const services = await prisma.service.findMany({ where: { status: 'active' } })
  console.log(`Indexing ${services.length} services...`)
  for (const s of services) {
    await indexEntity('services', s.id, { workspaceId: s.workspaceId, title: s.title, description: s.description, category: s.category, tags: s.tags, price: s.price, currency: s.currency, status: s.status, rating: s.rating, reviewCount: s.reviewCount, createdAt: s.createdAt })
  }

  // Index workspaces
  const workspaces = await prisma.workspace.findMany({ where: { isActive: true } })
  console.log(`Indexing ${workspaces.length} workspaces...`)
  for (const w of workspaces) {
    await indexEntity('workspaces', w.id, { ownerId: w.ownerId, name: w.name, slug: w.slug, type: w.type, description: w.description, isActive: w.isActive, isVerified: w.isVerified, subscription: w.subscription, createdAt: w.createdAt })
  }

  console.log('✅ Reindex complete!')
  await prisma.$disconnect()
}

reindex().catch((err) => { console.error('❌ Reindex failed:', err); process.exit(1) })
