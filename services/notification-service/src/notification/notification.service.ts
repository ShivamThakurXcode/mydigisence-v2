import { notificationRepository } from './notification.repository.js'
import type { NotificationType } from '@mydigisence/database'

export const notificationService = {
  async create(data: {
    userId: string
    type: NotificationType
    title: string
    content: string
    actionUrl?: string
    data?: object
  }) {
    const notification = await notificationRepository.create(data)
    await notificationRepository.deleteOld(data.userId)
    return notification
  },

  getForUser(userId: string, page = 1, limit = 20) {
    return notificationRepository.findByUser(userId, limit, (page - 1) * limit)
  },

  getUnreadCount(userId: string) {
    return notificationRepository.countUnread(userId)
  },

  markRead(id: string, userId: string) {
    return notificationRepository.markRead(id, userId)
  },

  markAllRead(userId: string) {
    return notificationRepository.markAllRead(userId)
  },
}
