import * as React from 'react'

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  label?: string
}

export function Separator({ orientation = 'horizontal', label, className = '', ...props }: SeparatorProps) {
  if (orientation === 'vertical') {
    return <div className={['w-px bg-border self-stretch', className].join(' ')} {...props} />
  }

  if (label) {
    return (
      <div className={['relative flex items-center', className].join(' ')} {...props}>
        <div className="flex-1 border-t border-border" />
        <span className="mx-3 text-xs text-muted-foreground">{label}</span>
        <div className="flex-1 border-t border-border" />
      </div>
    )
  }

  return <div className={['border-t border-border', className].join(' ')} {...props} />
}
