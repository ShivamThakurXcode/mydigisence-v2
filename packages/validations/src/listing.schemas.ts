import { z } from 'zod'
import { LISTING_STATUS } from '@mydigisence/constants'

export const createListingSchema = z.object({
  title: z.string().min(3).max(200).trim(),
  description: z.string().min(20).max(5000),
  price: z.number().positive().multipleOf(0.01),
  currency: z.string().length(3).default('USD'),
  category: z.string().min(1).max(100),
  tags: z.array(z.string().max(50)).max(10).default([]),
  images: z.array(z.string().url()).max(10).default([]),
  deliveryTime: z.number().int().positive().optional(),
})

export const updateListingSchema = createListingSchema
  .partial()
  .extend({
    status: z
      .enum([LISTING_STATUS.ACTIVE, LISTING_STATUS.DRAFT, LISTING_STATUS.ARCHIVED])
      .optional(),
  })

export type CreateListingInput = z.infer<typeof createListingSchema>
export type UpdateListingInput = z.infer<typeof updateListingSchema>
