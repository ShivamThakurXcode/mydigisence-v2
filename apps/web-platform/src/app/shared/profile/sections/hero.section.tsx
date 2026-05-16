'use client'

import { Avatar } from '@mydigisence/ui'

interface HeroData {
  headline?: string
  subheadline?: string
  ctaText?: string
  ctaUrl?: string
}

interface HeroSectionProps {
  config?: HeroData
  profile: {
    displayName: string
    bio?: string | null
    avatar?: string | null
    location?: string | null
    website?: string | null
  }
}

export function HeroSection({ profile, config }: HeroSectionProps) {
  return (
    <section className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-border">
      <Avatar
        src={profile.avatar}
        fallback={profile.displayName}
        size="xl"
        className="shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold tracking-tight">{profile.displayName}</h1>
        {config?.headline && (
          <p className="text-lg text-muted-foreground mt-1">{config.headline}</p>
        )}
        {profile.bio && (
          <p className="text-muted-foreground mt-2 max-w-xl">{profile.bio}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
          {profile.location && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {profile.location}
            </span>
          )}
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {profile.website.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
        {config?.ctaText && config.ctaUrl && (
          <a
            href={config.ctaUrl}
            className="mt-4 inline-flex h-10 px-5 items-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {config.ctaText}
          </a>
        )}
      </div>
    </section>
  )
}
