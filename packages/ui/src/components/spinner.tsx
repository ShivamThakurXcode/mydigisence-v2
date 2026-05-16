import * as React from 'react'

type SpinnerSize = 'sm' | 'md' | 'lg'

interface SpinnerProps {
  size?: SpinnerSize
  className?: string
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-4',
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div
      className={[
        'rounded-full border-primary border-t-transparent animate-spin',
        sizeClasses[size],
        className,
      ].join(' ')}
      role="status"
      aria-label="Loading"
    />
  )
}

export function FullPageSpinner() {
  return (
    <div className="flex h-full min-h-[200px] w-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}
