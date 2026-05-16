import { NotFoundError, ConflictError, ForbiddenError } from '@mydigisence/utils'
import { bookingRepository } from './booking.repository.js'
import { config } from '../config.js'
import type { CreateBookingInput, UpdateBookingInput } from '@mydigisence/validations'

async function notifyBooking(booking: { id: string; customerId: string; workspaceId: string }, event: string) {
  await fetch(`${config.notificationServiceUrl}/notifications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: booking.customerId,
      type: event === 'confirmed' ? 'booking_confirmed' : 'booking_cancelled',
      title: event === 'confirmed' ? 'Booking Confirmed' : 'Booking Cancelled',
      content: `Your booking has been ${event}.`,
      actionUrl: `/dashboard`,
      data: { bookingId: booking.id },
    }),
  }).catch(() => null)
}

export const bookingService = {
  async create(data: CreateBookingInput, customerId: string) {
    const dateTime = new Date(data.dateTime)
    if (dateTime < new Date()) throw new ConflictError('Cannot book a time in the past')

    const overlapping = await bookingRepository.countOverlapping(data.workspaceId, data.serviceId, dateTime, data.duration ?? 60)
    if (overlapping > 0) throw new ConflictError('This time slot is already booked')

    return bookingRepository.create({ ...data, customerId, dateTime, duration: data.duration ?? 60 })
  },

  async getOne(id: string, requesterId: string) {
    const booking = await bookingRepository.findById(id)
    if (!booking) throw new NotFoundError('Booking', id)
    if (booking.customerId !== requesterId && booking.workspaceId !== requesterId) {
      throw new ForbiddenError('Cannot access this booking')
    }
    return booking
  },

  getForUser(customerId: string, page = 1, limit = 20) {
    return bookingRepository.findByUser(customerId, { limit, skip: (page - 1) * limit })
  },

  getForWorkspace(workspaceId: string, opts: { page?: number; limit?: number; from?: string; to?: string; status?: string }) {
    return bookingRepository.findByWorkspace(workspaceId, {
      limit: opts.limit ?? 50, skip: ((opts.page ?? 1) - 1) * (opts.limit ?? 50),
      from: opts.from ? new Date(opts.from) : undefined,
      to: opts.to ? new Date(opts.to) : undefined,
      status: opts.status as Parameters<typeof bookingRepository.findByWorkspace>[1]['status'],
    })
  },

  async confirm(id: string) {
    const booking = await bookingRepository.findById(id)
    if (!booking) throw new NotFoundError('Booking', id)
    if (booking.status !== 'pending') throw new ConflictError('Booking is not in pending state')
    const updated = await bookingRepository.updateStatus(id, 'confirmed')
    await notifyBooking(booking, 'confirmed')
    return updated
  },

  async cancel(id: string, requesterId: string) {
    const booking = await bookingRepository.findById(id)
    if (!booking) throw new NotFoundError('Booking', id)
    if (booking.customerId !== requesterId && booking.workspaceId !== requesterId) throw new ForbiddenError('Cannot cancel this booking')
    if (booking.status === 'completed') throw new ConflictError('Cannot cancel a completed booking')
    const updated = await bookingRepository.updateStatus(id, 'cancelled')
    await notifyBooking(booking, 'cancelled')
    return updated
  },

  async complete(id: string) {
    const booking = await bookingRepository.findById(id)
    if (!booking) throw new NotFoundError('Booking', id)
    return bookingRepository.updateStatus(id, 'completed')
  },

  checkAvailability(workspaceId: string, serviceId: string, dateTime: string, duration = 60) {
    return bookingRepository.countOverlapping(workspaceId, serviceId, new Date(dateTime), duration)
      .then((count) => ({ available: count === 0, conflictCount: count }))
  },
}
