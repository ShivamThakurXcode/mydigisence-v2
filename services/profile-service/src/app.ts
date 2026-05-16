import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import { createLogger } from '@mydigisence/logger'
import { prisma } from '@mydigisence/database'
import { isAppError } from '@mydigisence/utils'
import { config } from './config.js'
import { profileRoutes } from './profile/profile.routes.js'

const log = createLogger('profile-service')
const app = Fastify({ logger: false, trustProxy: true })

async function bootstrap() {
  await app.register(helmet)
  await app.register(cors, {
    origin: config.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
  await app.register(rateLimit, {
    max: 300,
    timeWindow: '1 minute',
    keyGenerator: (req) => (req.headers['x-forwarded-for'] as string) ?? req.ip,
  })

  app.setErrorHandler((error, _req, reply) => {
    if (isAppError(error)) {
      return reply.code(error.statusCode).send({
        success: false,
        error: { code: error.code, message: error.message },
      })
    }
    if (error.name === 'ZodError') {
      return reply.code(422).send({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: error },
      })
    }
    log.error({ err: error }, 'Unhandled error')
    return reply.code(500).send({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Internal server error' },
    })
  })

  app.get('/health', async () => ({
    status: 'ok',
    service: 'profile-service',
    timestamp: new Date().toISOString(),
  }))

  await app.register(profileRoutes)

  await prisma.$connect()
  await app.listen({ port: config.port, host: '0.0.0.0' })
  log.info(`Profile service running on port ${config.port}`)
}

bootstrap().catch((err) => {
  log.error({ err }, 'Failed to start profile service')
  process.exit(1)
})

const shutdown = async (signal: string) => {
  log.info(`Received ${signal}, shutting down...`)
  await app.close()
  await prisma.$disconnect()
  process.exit(0)
}

process.on('SIGTERM', () => { shutdown('SIGTERM').catch(() => process.exit(1)) })
process.on('SIGINT', () => { shutdown('SIGINT').catch(() => process.exit(1)) })
