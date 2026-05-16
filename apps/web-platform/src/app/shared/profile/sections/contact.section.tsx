interface ContactData {
  email?: string
  phone?: string
  website?: string
  socialLinks?: Record<string, string>
}

interface ContactSectionProps {
  config?: ContactData
}

export function ContactSection({ config }: ContactSectionProps) {
  if (!config) return null
  const hasContent = config.email || config.phone || config.website || (config.socialLinks && Object.keys(config.socialLinks).length > 0)
  if (!hasContent) return null

  return (
    <section className="py-6">
      <h2 className="text-xl font-semibold mb-4">Contact</h2>
      <div className="space-y-2">
        {config.email && (
          <a href={`mailto:${config.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {config.email}
          </a>
        )}
        {config.phone && (
          <a href={`tel:${config.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {config.phone}
          </a>
        )}
        {config.website && (
          <a href={config.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            {config.website.replace(/^https?:\/\//, '')}
          </a>
        )}
      </div>
    </section>
  )
}
