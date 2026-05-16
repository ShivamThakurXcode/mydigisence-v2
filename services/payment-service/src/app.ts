import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import { createLogger } from '@mydigisence/logger'
import { config } from './config.js'
import { paymentRoutes } from './payment/payment.routes.js'

const log = createLogger('payment-service')
const app = Fastify({ logger: false, trustProxy: true, bodyLimit: 1048576 })

async function bootstrap() {
  await app.register(helmet)
  await app.register(cors, { origin: config.corsOrigins, credentials: true })

  app.setErrorHandler((err, _req, reply) => {
    log.error({ err }, 'payment error')
    return reply.code(500).send({ success: false, error: { code: 'INTERNAL_ERROR', message: err.message } })
  })

  app.get('/health', async () => ({ status: 'ok', service: 'payment-service', timestamp: new Date().toISOString() }))
  await app.register(paymentRoutes)

  await app.listen({ port: config.port, host: '0.0.0.0' })
  log.info(`Payment service running on port ${config.port}`)
}

bootstrap().catch((err) => { log.error({ err }, 'startup failed'); process.exit(1) })
process.on('SIGTERM', async () => { await app.close(); process.exit(0) })
process.on('SIGINT', async () => { await app.close(); process.exit(0) })
