import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import multipart from '@fastify/multipart'
import { createLogger } from '@mydigisence/logger'
import { config } from './config.js'
import { uploadRoutes } from './upload/upload.routes.js'

const log = createLogger('media-service')
const app = Fastify({ logger: false, trustProxy: true })

async function bootstrap() {
  await app.register(helmet)
  await app.register(cors, { origin: true, credentials: true })
  await app.register(multipart, { limits: { fileSize: config.maxFileSizeMb * 1024 * 1024 } })

  app.setErrorHandler((err, _req, reply) => {
    log.error({ err }, 'error')
    return reply.code(500).send({ success: false, error: { code: 'INTERNAL_ERROR', message: err.message } })
  })

  app.get('/health', async () => ({ status: 'ok', service: 'media-service', timestamp: new Date().toISOString() }))
  await app.register(uploadRoutes)

  await app.listen({ port: config.port, host: '0.0.0.0' })
  log.info(`Media service running on port ${config.port}`)
}

bootstrap().catch((err) => { log.error({ err }, 'startup failed'); process.exit(1) })
process.on('SIGTERM', async () => { await app.close(); process.exit(0) })
process.on('SIGINT', async () => { await app.close(); process.exit(0) })
