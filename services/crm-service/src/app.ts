import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import { createLogger } from '@mydigisence/logger'
import { prisma } from '@mydigisence/database'
import { isAppError } from '@mydigisence/utils'
import { config } from './config.js'
import { contactRoutes } from './contact/contact.routes.js'

const log = createLogger('crm-service')
const app = Fastify({ logger: false, trustProxy: true })

async function bootstrap() {
  await app.register(helmet)
  await app.register(cors, { origin: config.corsOrigins, credentials: true })
  await app.register(rateLimit, { max: 200, timeWindow: '1 minute' })

  app.setErrorHandler((err, _req, reply) => {
    if (isAppError(err)) return reply.code(err.statusCode).send({ success: false, error: { code: err.code, message: err.message } })
    log.error({ err }, 'error')
    return reply.code(500).send({ success: false, error: { code: 'INTERNAL_ERROR', message: err.message } })
  })

  app.get('/health', async () => ({ status: 'ok', service: 'crm-service', timestamp: new Date().toISOString() }))
  await app.register(contactRoutes)

  await prisma.$connect()
  await app.listen({ port: config.port, host: '0.0.0.0' })
  log.info(`CRM service running on port ${config.port}`)
}

bootstrap().catch((err) => { log.error({ err }, 'startup failed'); process.exit(1) })
process.on('SIGTERM', async () => { await app.close(); await prisma.$disconnect(); process.exit(0) })
process.on('SIGINT', async () => { await app.close(); await prisma.$disconnect(); process.exit(0) })
