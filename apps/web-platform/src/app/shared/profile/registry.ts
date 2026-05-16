import type { ComponentType } from 'react'
import { HeroSection } from './sections/hero.section.js'
import { AboutSection } from './sections/about.section.js'
import { ServicesSection } from './sections/services.section.js'
import { SkillsSection } from './sections/skills.section.js'
import { ReviewsSection } from './sections/reviews.section.js'
import { ContactSection } from './sections/contact.section.js'

export type SectionComponent = ComponentType<{ config?: Record<string, unknown>; profile?: unknown }>

export const sectionRegistry: Record<string, SectionComponent> = {
  hero: HeroSection as SectionComponent,
  about: AboutSection as SectionComponent,
  services: ServicesSection as SectionComponent,
  skills: SkillsSection as SectionComponent,
  reviews: ReviewsSection as SectionComponent,
  contact: ContactSection as SectionComponent,
}

export function getSectionComponent(type: string): SectionComponent | null {
  return sectionRegistry[type] ?? null
}
