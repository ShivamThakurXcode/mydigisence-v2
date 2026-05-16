import * as React from 'react'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?: string | null
  alt?: string
  fallback?: string
  size?: AvatarSize
  className?: string
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
}

function getInitials(name?: string): string {
  if (!name) return '?'
  return name
    .split(' ')
    .map((p) => p[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function Avatar({ src, alt, fallback, size = 'md', className = '' }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false)

  return (
    <div
      className={[
        'relative inline-flex shrink-0 rounded-full overflow-hidden bg-muted',
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt ?? 'avatar'}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-medium text-muted-foreground bg-muted">
          {getInitials(fallback)}
        </span>
      )}
    </div>
  )
}
