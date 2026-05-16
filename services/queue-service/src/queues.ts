import { Queue } from 'bullmq'
import { redisConnection } from './redis.js'

export const emailQueue = new Queue('email', { connection: redisConnection })
export const notificationQueue = new Queue('notification', { connection: redisConnection })
export const searchIndexQueue = new Queue('search-index', { connection: redisConnection })
export const analyticsQueue = new Queue('analytics', { connection: redisConnection })

export type EmailJobData =
  | { type: 'verify-email'; to: string; name: string; token: string }
  | { type: 'reset-password'; to: string; name: string; token: string }
  | { type: 'welcome'; to: string; name: string }
  | { type: 'booking-confirmation'; to: string; customerName: string; serviceName: string; providerName: string; dateTime: string; duration: number; bookingId: string }
  | { type: 'booking-reminder'; to: string; customerName: string; serviceName: string; providerName: string; dateTime: string }
  | { type: 'workspace-invite'; to: string; inviteeName: string; inviterName: string; workspaceName: string; role: string; acceptUrl: string }

export type NotificationJobData = {
  userId: string
  type: string
  title: string
  content: string
  actionUrl?: string
  data?: object
}

export type SearchIndexJobData = {
  action: 'index' | 'delete'
  entity: 'profile' | 'listing' | 'workspace'
  id: string
  data?: object
}

export type AnalyticsJobData = {
  eventType: string
  userId?: string
  workspaceId?: string
  sessionId?: string
  data?: object
}
