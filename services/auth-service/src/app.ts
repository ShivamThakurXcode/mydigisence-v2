import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import { createLogger } from '@mydigisence/logger'
import { prisma } from '@mydigisence/database'
import { redis } from './redis.js'
import { authRoutes, authErrorHandler } from './auth.routes.js'
import { config } from './config.js'

const log = createLogger('auth-service')

const app = Fastify({ logger: false, trustProxy: true })

async function bootstrap() {
  // ─── Plugins ───────────────────────────────────────────────
  await app.register(helmet)
  await app.register(cors, {
    origin: config.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req) => (req.headers['x-forwarded-for'] as string) ?? req.ip,
  })

  // ─── Error Handler ─────────────────────────────────────────
  app.setErrorHandler(authErrorHandler)

  // ─── Health Check ──────────────────────────────────────────
  app.get('/health', async () => ({
    status: 'ok',
    service: 'auth-service',
    timestamp: new Date().toISOString(),
  }))

  // ─── Routes ────────────────────────────────────────────────
  await app.register(authRoutes)

  // ─── Connect DB + Redis ────────────────────────────────────
  await redis.connect().catch(() => log.warn('Redis connection deferred'))
  await prisma.$connect()

  // ─── Start Server ──────────────────────────────────────────
  await app.listen({ port: config.port, host: '0.0.0.0' })
  log.info(`Auth service running on port ${config.port}`)
}

bootstrap().catch((err) => {
  log.error({ err }, 'Failed to start auth service')
  process.exit(1)
})

// Graceful shutdown
const shutdown = async (signal: string) => {
  log.info(`Received ${signal}, shutting down...`)
  await app.close()
  await prisma.$disconnect()
  await redis.quit()
  process.exit(0)
}

process.on('SIGTERM', () => { shutdown('SIGTERM').catch(() => process.exit(1)) })
process.on('SIGINT', () => { shutdown('SIGINT').catch(() => process.exit(1)) })
