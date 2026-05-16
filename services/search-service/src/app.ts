import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import { createLogger } from '@mydigisence/logger'
import { config } from './config.js'
import { ensureIndices } from './es.client.js'
import { searchRoutes } from './search/search.routes.js'

const log = createLogger('search-service')
const app = Fastify({ logger: false, trustProxy: true })

async function bootstrap() {
  await app.register(helmet)
  await app.register(cors, { origin: config.corsOrigins, credentials: true })
  await app.register(rateLimit, { max: 200, timeWindow: '1 minute' })

  app.setErrorHandler((err, _req, reply) => {
    log.error({ err }, 'error')
    return reply.code(500).send({ success: false, error: { code: 'INTERNAL_ERROR', message: err.message } })
  })

  app.get('/health', async () => ({ status: 'ok', service: 'search-service', timestamp: new Date().toISOString() }))
  await app.register(searchRoutes)

  await ensureIndices().catch((err) => log.warn({ err }, 'Elasticsearch not available — indices not created'))
  await app.listen({ port: config.port, host: '0.0.0.0' })
  log.info(`Search service running on port ${config.port}`)
}

bootstrap().catch((err) => { log.error({ err }, 'startup failed'); process.exit(1) })
process.on('SIGTERM', async () => { await app.close(); process.exit(0) })
process.on('SIGINT', async () => { await app.close(); process.exit(0) })
