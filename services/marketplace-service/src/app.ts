import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import { createLogger } from '@mydigisence/logger'
import { prisma } from '@mydigisence/database'
import { isAppError } from '@mydigisence/utils'
import { config } from './config.js'
import { serviceRoutes } from './service/service.routes.js'
import { productRoutes } from './product/product.routes.js'

const log = createLogger('marketplace-service')
const app = Fastify({ logger: false, trustProxy: true })

async function bootstrap() {
  await app.register(helmet)
  await app.register(cors, { origin: config.corsOrigins, credentials: true })
  await app.register(rateLimit, { max: 300, timeWindow: '1 minute' })

  app.setErrorHandler((err, _req, reply) => {
    if (isAppError(err)) return reply.code(err.statusCode).send({ success: false, error: { code: err.code, message: err.message } })
    if (err.name === 'ZodError') return reply.code(422).send({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: err } })
    log.error({ err }, 'unhandled error')
    return reply.code(500).send({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } })
  })

  app.get('/health', async () => ({ status: 'ok', service: 'marketplace-service', timestamp: new Date().toISOString() }))
  await app.register(serviceRoutes)
  await app.register(productRoutes)

  await prisma.$connect()
  await app.listen({ port: config.port, host: '0.0.0.0' })
  log.info(`Marketplace service running on port ${config.port}`)
}

bootstrap().catch((err) => { log.error({ err }, 'startup failed'); process.exit(1) })
process.on('SIGTERM', async () => { await app.close(); await prisma.$disconnect(); process.exit(0) })
process.on('SIGINT', async () => { await app.close(); await prisma.$disconnect(); process.exit(0) })
