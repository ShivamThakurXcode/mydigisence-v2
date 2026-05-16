import * as React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated'
}

export function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  const variantClasses = {
    default: 'bg-card border border-border shadow-sm',
    bordered: 'bg-card border-2 border-border',
    elevated: 'bg-card border border-border shadow-md',
  }
  return (
    <div
      className={['rounded-xl', variantClasses[variant], className].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['flex flex-col space-y-1.5 p-6', className].join(' ')} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={['font-semibold leading-none tracking-tight', className].join(' ')} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={['text-sm text-muted-foreground', className].join(' ')} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['p-6 pt-0', className].join(' ')} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['flex items-center p-6 pt-0', className].join(' ')} {...props}>
      {children}
    </div>
  )
}
