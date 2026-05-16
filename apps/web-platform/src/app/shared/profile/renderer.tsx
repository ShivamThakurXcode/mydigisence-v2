'use client'

import { getSectionComponent } from './registry.js'

interface SectionConfig {
  type: string
  enabled: boolean
  order: number
  config?: Record<string, unknown>
}

interface ProfileRendererProps {
  sections: SectionConfig[]
  profile: {
    displayName: string
    bio?: string | null
    avatar?: string | null
    location?: string | null
    website?: string | null
  }
}

export function ProfileRenderer({ sections, profile }: ProfileRendererProps) {
  const sorted = [...sections]
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-2 divide-y divide-border">
      {sorted.map((section) => {
        const Component = getSectionComponent(section.type)
        if (!Component) return null
        return (
          <Component
            key={section.type}
            config={section.config}
            profile={profile}
          />
        )
      })}
    </div>
  )
}
