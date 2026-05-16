import { prisma } from '@mydigisence/database'
import type { BookingStatus } from '@mydigisence/database'

const bookingSelect = {
  id: true, serviceId: true, customerId: true, workspaceId: true,
  dateTime: true, duration: true, status: true, paymentId: true,
  paymentStatus: true, amount: true, currency: true, notes: true,
  metadata: true, createdAt: true, updatedAt: true,
} as const

export const bookingRepository = {
  findById(id: string) { return prisma.booking.findUnique({ where: { id }, select: bookingSelect }) },

  findByUser(customerId: string, opts: { status?: BookingStatus; limit?: number; skip?: number }) {
    return prisma.booking.findMany({
      where: { customerId, ...(opts.status && { status: opts.status }) },
      select: bookingSelect, orderBy: { dateTime: 'desc' }, take: opts.limit ?? 20, skip: opts.skip ?? 0,
    })
  },

  findByWorkspace(workspaceId: string, opts: { status?: BookingStatus; limit?: number; skip?: number; from?: Date; to?: Date }) {
    return prisma.booking.findMany({
      where: {
        workspaceId, ...(opts.status && { status: opts.status }),
        ...(opts.from || opts.to ? { dateTime: { ...(opts.from && { gte: opts.from }), ...(opts.to && { lte: opts.to }) } } : {}),
      },
      select: bookingSelect, orderBy: { dateTime: 'asc' }, take: opts.limit ?? 50, skip: opts.skip ?? 0,
    })
  },

  countOverlapping(workspaceId: string, serviceId: string, dateTime: Date, duration: number) {
    const endTime = new Date(dateTime.getTime() + duration * 60000)
    return prisma.booking.count({
      where: {
        workspaceId, serviceId,
        status: { in: ['pending', 'confirmed'] },
        dateTime: { gte: dateTime, lt: endTime },
      },
    })
  },

  create(data: { serviceId: string; customerId: string; workspaceId: string; dateTime: Date; duration: number; notes?: string }) {
    return prisma.booking.create({ data: { ...data, status: 'pending' }, select: bookingSelect })
  },

  updateStatus(id: string, status: BookingStatus, extra?: { paymentId?: string; paymentStatus?: string; amount?: number }) {
    return prisma.booking.update({ where: { id }, data: { status, ...extra }, select: bookingSelect })
  },

  delete(id: string) { return prisma.booking.delete({ where: { id } }) },
}
