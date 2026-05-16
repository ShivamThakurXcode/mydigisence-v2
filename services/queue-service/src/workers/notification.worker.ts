import { Worker } from 'bullmq'
import { createLogger } from '@mydigisence/logger'
import { redisConnection } from '../redis.js'
import type { NotificationJobData } from '../queues.js'

const log = createLogger('queue:notification-worker')
const NOTIFICATION_SERVICE_URL = process.env['NOTIFICATION_SERVICE_URL'] ?? 'http://localhost:4008'

export const notificationWorker = new Worker<NotificationJobData>(
  'notification',
  async (job) => {
    log.info({ jobId: job.id, userId: job.data.userId }, 'Processing notification job')
    const res = await fetch(`${NOTIFICATION_SERVICE_URL}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job.data),
    })
    if (!res.ok) throw new Error(`Notification service error ${res.status}`)
    log.info({ jobId: job.id }, 'Notification job completed')
  },
  { connection: redisConnection, concurrency: 10 },
)

notificationWorker.on('failed', (job, err) => {
  log.error({ jobId: job?.id, err }, 'Notification job failed')
})
