import { CSSProperties, ReactNode } from 'react'

interface HeadingProps {
  level?: 1 | 2 | 3
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Render the text with an animated rainbow gradient. */
  gradient?: boolean
}

export function Heading({
  level = 1,
  children,
  className = '',
  style,
  gradient = false,
}: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3'
  const cls = [`bp-heading`, `bp-heading--${level}`, gradient ? 'text-gradient' : '', className]
    .filter(Boolean)
    .join(' ')
  return (
    <Tag className={cls} style={style}>
      {children}
    </Tag>
  )
}

export function Subheading({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <p className={`bp-subheading ${className}`.trim()} style={style}>
      {children}
    </p>
  )
}
