import { createLogger } from '@mydigisence/logger'
import { emailWorker } from './workers/email.worker.js'
import { notificationWorker } from './workers/notification.worker.js'
import { analyticsWorker } from './workers/analytics.worker.js'

const log = createLogger('queue-service')

log.info('Queue workers starting...')
log.info('✓ Email worker started')
log.info('✓ Notification worker started')
log.info('✓ Analytics worker started')

const shutdown = async () => {
  log.info('Shutting down workers...')
  await Promise.all([emailWorker.close(), notificationWorker.close(), analyticsWorker.close()])
  process.exit(0)
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
