import { CSSProperties, ReactNode } from 'react'

type Tone = 'plain' | 'purple' | 'pink' | 'cyan' | 'lime' | 'yellow'

interface CardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Tinted background variant. */
  tone?: Tone
  /** Animated rainbow strip across the top of the card. */
  strip?: boolean
  /** Decorative morphing blob in the corner. */
  blob?: boolean
}

export default function Card({
  children,
  className = '',
  style,
  tone = 'plain',
  strip = false,
  blob = false,
}: CardProps) {
  const cls = [
    'bp-card',
    tone !== 'plain' ? `bp-card--${tone}` : '',
    strip ? 'bp-card--strip' : '',
    blob ? 'bp-card--blob' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls} style={style}>
      {children}
    </div>
  )
}
