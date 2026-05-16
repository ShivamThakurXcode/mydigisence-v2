interface Service {
  title: string
  description?: string
  price?: number
  currency?: string
  category?: string
}

interface ServicesSectionProps {
  config?: { items?: Service[] }
}

export function ServicesSection({ config }: ServicesSectionProps) {
  const items = config?.items ?? []
  if (items.length === 0) return null

  return (
    <section className="py-6">
      <h2 className="text-xl font-semibold mb-4">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((service, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-sm transition-all">
            <h3 className="font-medium">{service.title}</h3>
            {service.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
            )}
            {service.price !== undefined && (
              <p className="mt-3 text-sm font-semibold text-primary">
                {service.currency ?? 'USD'} {service.price.toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
