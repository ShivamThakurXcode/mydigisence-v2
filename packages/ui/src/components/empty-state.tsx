import * as React from 'react'

interface EmptyStateProps {
  icon?: string | React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={['flex flex-col items-center justify-center py-16 text-center', className].join(' ')}>
      {icon && (
        <div className="mb-4 text-4xl">
          {typeof icon === 'string' ? <span>{icon}</span> : icon}
        </div>
      )}
      <h3 className="font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground max-w-xs">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
