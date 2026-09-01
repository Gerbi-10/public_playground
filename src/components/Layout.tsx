import { ReactNode } from 'react'
import Shapes from './Shapes'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <Shapes />
      <main className="app-main">{children}</main>
    </div>
  )
}
