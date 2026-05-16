import * as React from 'react'

type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'destructive'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  title?: string
}

const variantClasses: Record<AlertVariant, string> = {
  default: 'bg-muted border-border text-foreground',
  info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-300',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300',
  warning: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-300',
  destructive: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800 dark:text-red-300',
}

export function Alert({ variant = 'default', title, children, className = '', ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={['rounded-lg border p-4', variantClasses[variant], className].join(' ')}
      {...props}
    >
      {title && <p className="font-medium mb-1">{title}</p>}
      <div className="text-sm">{children}</div>
    </div>
  )
}
