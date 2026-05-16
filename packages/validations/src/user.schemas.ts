import { z } from 'zod'
import { slugSchema } from './common.schemas'

export const updateUserSchema = z.object({
  firstName: z.string().min(1).max(50).trim().optional(),
  lastName: z.string().min(1).max(50).trim().optional(),
  phone: z.string().max(20).optional(),
})

export const updateProfileSchema = z.object({
  username: slugSchema.optional(),
  displayName: z.string().min(1).max(100).trim().optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  banner: z.string().url().optional(),
  location: z.string().max(100).optional(),
  website: z.string().url().optional(),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
