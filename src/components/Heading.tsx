import { ReactNode } from 'react'

interface HeadingProps {
  level?: 1 | 2 | 3
  children: ReactNode
  className?: string
}

export function Heading({ level = 1, children, className = '' }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3'
  return <Tag className={`bp-heading bp-heading--${level} ${className}`.trim()}>{children}</Tag>
}

export function Subheading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`bp-subheading ${className}`.trim()}>{children}</p>
}
