import { Worker } from 'bullmq'
import { createLogger } from '@mydigisence/logger'
import { redisConnection } from '../redis.js'
import type { AnalyticsJobData } from '../queues.js'

const log = createLogger('queue:analytics-worker')
const ANALYTICS_SERVICE_URL = process.env['ANALYTICS_SERVICE_URL'] ?? 'http://localhost:4016'

export const analyticsWorker = new Worker<AnalyticsJobData>(
  'analytics',
  async (job) => {
    const res = await fetch(`${ANALYTICS_SERVICE_URL}/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job.data),
    })
    if (!res.ok) throw new Error(`Analytics service error ${res.status}`)
  },
  { connection: redisConnection, concurrency: 20 },
)

analyticsWorker.on('failed', (job, err) => {
  log.error({ jobId: job?.id, err }, 'Analytics job failed')
})
