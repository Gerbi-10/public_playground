import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldProps {
  label?: string
  hint?: string
}

export function TextField({
  label,
  hint,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & FieldProps) {
  return (
    <label className="bp-field">
      {label && <span className="bp-field__label">{label}</span>}
      <input className="bp-input" {...rest} />
      {hint && <span className="bp-field__hint">{hint}</span>}
    </label>
  )
}

export function TextArea({
  label,
  hint,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps) {
  return (
    <label className="bp-field">
      {label && <span className="bp-field__label">{label}</span>}
      <textarea className="bp-textarea" {...rest} />
      {hint && <span className="bp-field__hint">{hint}</span>}
    </label>
  )
}
