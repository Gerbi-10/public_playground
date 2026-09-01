import { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  fullWidth,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const cls = `bp-btn bp-btn--${variant} ${fullWidth ? 'bp-btn--block' : ''} ${className}`.trim()
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
