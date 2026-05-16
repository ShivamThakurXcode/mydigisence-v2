import { prisma } from '@mydigisence/database'
import type { NotificationType } from '@mydigisence/database'

export const notificationRepository = {
  create(data: {
    userId: string
    type: NotificationType
    title: string
    content: string
    actionUrl?: string
    data?: object
  }) {
    return prisma.notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        title: data.title,
        content: data.content,
        actionUrl: data.actionUrl,
        data: data.data ?? {},
      },
    })
  },

  findByUser(userId: string, limit = 20, skip = 0) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    })
  },

  countUnread(userId: string) {
    return prisma.notification.count({ where: { userId, read: false } })
  },

  markRead(id: string, userId: string) {
    return prisma.notification.updateMany({
      where: { id, userId },
      data: { read: true, readAt: new Date() },
    })
  },

  markAllRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true, readAt: new Date() },
    })
  },

  deleteOld(userId: string, keepCount = 100) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: keepCount,
      select: { id: true },
    }).then((old) => {
      if (old.length === 0) return
      return prisma.notification.deleteMany({ where: { id: { in: old.map((n) => n.id) } } })
    })
  },
}
