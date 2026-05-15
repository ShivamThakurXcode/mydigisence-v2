import { z } from 'zod'

export const createBookingSchema = z.object({
  serviceId: z.string().min(1),
  workspaceId: z.string().min(1),
  dateTime: z.string().datetime(),
  duration: z.number().int().positive().default(60),
  notes: z.string().max(1000).optional(),
})

export const updateBookingSchema = z.object({
  status: z.enum(['confirmed', 'cancelled', 'completed']),
  notes: z.string().max(1000).optional(),
})

export type CreateBookingInput = z.infer<typeof createBookingSchema>
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>
