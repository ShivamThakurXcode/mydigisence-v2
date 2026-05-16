import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import { createLogger } from '@mydigisence/logger'
import { config } from './config.js'
import { emailRoutes } from './email/email.routes.js'

const log = createLogger('email-service')
const app = Fastify({ logger: false, trustProxy: true })

async function bootstrap() {
  await app.register(helmet)
  await app.register(cors, { origin: ['http://localhost:4000', 'http://localhost:4001'] })

  app.setErrorHandler((err, _req, reply) => {
    if (err.name === 'ZodError') return reply.code(422).send({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } })
    log.error({ err }, 'email error')
    return reply.code(500).send({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } })
  })

  app.get('/health', async () => ({ status: 'ok', service: 'email-service', timestamp: new Date().toISOString() }))
  await app.register(emailRoutes)

  await app.listen({ port: config.port, host: '0.0.0.0' })
  log.info(`Email service running on port ${config.port}`)
}

bootstrap().catch((err) => { log.error({ err }, 'startup failed'); process.exit(1) })
process.on('SIGTERM', async () => { await app.close(); process.exit(0) })
process.on('SIGINT', async () => { await app.close(); process.exit(0) })
