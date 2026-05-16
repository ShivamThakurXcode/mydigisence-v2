import { Worker } from 'bullmq'
import { createLogger } from '@mydigisence/logger'
import { redisConnection } from '../redis.js'
import type { EmailJobData } from '../queues.js'

const log = createLogger('queue:email-worker')
const EMAIL_SERVICE_URL = process.env['EMAIL_SERVICE_URL'] ?? 'http://localhost:4009'

export const emailWorker = new Worker<EmailJobData>(
  'email',
  async (job) => {
    log.info({ jobId: job.id, type: job.data.type }, 'Processing email job')
    const res = await fetch(`${EMAIL_SERVICE_URL}/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job.data),
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Email service error ${res.status}: ${text}`)
    }
    log.info({ jobId: job.id }, 'Email job completed')
  },
  {
    connection: redisConnection,
    concurrency: 5,
    limiter: { max: 20, duration: 1000 },
  },
)

emailWorker.on('failed', (job, err) => {
  log.error({ jobId: job?.id, err }, 'Email job failed')
})
