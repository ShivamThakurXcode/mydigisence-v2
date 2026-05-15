import { z } from 'zod'
import { PROFILE_SECTION_TYPES } from '@mydigisence/constants'

export const sectionConfigSchema = z.object({
  type: z.enum(Object.values(PROFILE_SECTION_TYPES) as [string, ...string[]]),
  enabled: z.boolean().default(true),
  order: z.number().int().min(0),
  config: z.record(z.string(), z.unknown()).optional(),
})

export const updateProfileSectionsSchema = z.object({
  sections: z.array(sectionConfigSchema),
})

export const heroSectionDataSchema = z.object({
  headline: z.string().max(200).optional(),
  subheadline: z.string().max(500).optional(),
  ctaText: z.string().max(50).optional(),
  ctaUrl: z.string().url().optional(),
  backgroundImage: z.string().url().optional(),
})

export const aboutSectionDataSchema = z.object({
  content: z.string().max(2000),
  highlights: z.array(z.string().max(100)).max(6).optional(),
})

export type SectionConfig = z.infer<typeof sectionConfigSchema>
export type HeroSectionData = z.infer<typeof heroSectionDataSchema>
export type AboutSectionData = z.infer<typeof aboutSectionDataSchema>
