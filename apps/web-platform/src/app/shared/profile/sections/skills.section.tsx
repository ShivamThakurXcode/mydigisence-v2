interface SkillsSectionProps {
  config?: { skills?: string[] }
}

export function SkillsSection({ config }: SkillsSectionProps) {
  const skills = config?.skills ?? []
  if (skills.length === 0) return null

  return (
    <section className="py-6">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
