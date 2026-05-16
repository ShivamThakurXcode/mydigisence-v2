import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import httpProxy from '@fastify/http-proxy'
import { createLogger } from '@mydigisence/logger'
import { config } from './config.js'

const log = createLogger('gateway-service')
const app = Fastify({ logger: false, trustProxy: true })

async function bootstrap() {
  // ─── Security plugins ──────────────────────────────────────
  await app.register(helmet)
  await app.register(cors, {
    origin: config.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
  await app.register(rateLimit, {
    max: 500,
    timeWindow: '1 minute',
    keyGenerator: (req) => (req.headers['x-forwarded-for'] as string) ?? req.ip,
  })

  // ─── Health ────────────────────────────────────────────────
  app.get('/health', async () => ({
    status: 'ok',
    service: 'gateway',
    timestamp: new Date().toISOString(),
    services: config.services,
  }))

  // ─── Proxy Routes ──────────────────────────────────────────
  // Auth routes — proxy to auth-service
  await app.register(httpProxy, {
    upstream: config.services.auth,
    prefix: '/auth',
    rewritePrefix: '/auth',
    http2: false,
  })

  // User routes — proxy to user-service (requires auth)
  await app.register(httpProxy, {
    upstream: config.services.user,
    prefix: '/users',
    rewritePrefix: '/users',
    http2: false,
  })

  // Profile routes
  await app.register(httpProxy, {
    upstream: config.services.profile,
    prefix: '/profiles',
    rewritePrefix: '/profiles',
    http2: false,
  })

  // Marketplace routes
  await app.register(httpProxy, {
    upstream: config.services.marketplace,
    prefix: '/marketplace',
    rewritePrefix: '/marketplace',
    http2: false,
  })

  // Booking routes
  await app.register(httpProxy, {
    upstream: config.services.booking,
    prefix: '/bookings',
    rewritePrefix: '/bookings',
    http2: false,
  })

  // Search routes
  await app.register(httpProxy, {
    upstream: config.services.search,
    prefix: '/search',
    rewritePrefix: '/search',
    http2: false,
  })

  // AI routes
  await app.register(httpProxy, {
    upstream: config.services.ai,
    prefix: '/ai',
    rewritePrefix: '/ai',
    http2: false,
  })

  // Notification routes
  await app.register(httpProxy, {
    upstream: config.services.notification,
    prefix: '/notifications',
    rewritePrefix: '/notifications',
    http2: false,
  })

  // Business profile routes
  await app.register(httpProxy, {
    upstream: config.services.business,
    prefix: '/business',
    rewritePrefix: '/business',
    http2: false,
  })

  // ─── Start ────────────────────────────────────────────────
  await app.listen({ port: config.port, host: '0.0.0.0' })
  log.info(`Gateway running on port ${config.port}`)
}

bootstrap().catch((err) => {
  log.error({ err }, 'Failed to start gateway')
  process.exit(1)
})

const shutdown = async (signal: string) => {
  log.info(`Received ${signal}, shutting down...`)
  await app.close()
  process.exit(0)
}

process.on('SIGTERM', () => { shutdown('SIGTERM').catch(() => process.exit(1)) })
process.on('SIGINT', () => { shutdown('SIGINT').catch(() => process.exit(1)) })
