import { z } from 'zod'

export const objectIdSchema = z.string().regex(/^[0-9a-f]{24}$/, 'Invalid ID format')

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

export const slugSchema = z
  .string()
  .min(3)
  .max(50)
  .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only')

export type ObjectId = z.infer<typeof objectIdSchema>
export type Pagination = z.infer<typeof paginationSchema>
