interface AboutData {
  content?: string
  highlights?: string[]
}

interface AboutSectionProps {
  config?: AboutData
}

export function AboutSection({ config }: AboutSectionProps) {
  if (!config?.content) return null
  return (
    <section className="py-6">
      <h2 className="text-xl font-semibold mb-4">About</h2>
      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{config.content}</p>
      {config.highlights && config.highlights.length > 0 && (
        <ul className="mt-4 space-y-2">
          {config.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {h}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
