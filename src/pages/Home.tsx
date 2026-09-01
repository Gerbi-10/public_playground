import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { Heading, Subheading } from '../components/Heading'
import type { DifficultyLevel } from '../types/entities'

const DIFFICULTIES: { value: DifficultyLevel; label: string; emoji: string }[] = [
  { value: '8-10', label: 'גילאי 8–10', emoji: '🟢' },
  { value: '11-14', label: 'גילאי 11–14', emoji: '🟡' },
  { value: '15-18', label: 'גילאי 15–18', emoji: '🔴' },
]

const STEPS = [
  { n: 1, title: 'מקבלים כרטיס מושג', text: 'עם כמה מילים שאסור להשתמש בהן' },
  { n: 2, title: 'כותבים פרומפט ל-AI', text: 'מתארים את המושג בלי המילים החסומות' },
  { n: 3, title: 'רואים איך זה התעוות', text: 'ה-AI מעביר משחקן לשחקן והמושג משתנה' },
]

export default function Home() {
  const navigate = useNavigate()
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('11-14')
  const go = () => navigate('/lobby', { state: { difficulty } })

  return (
    <>
      <header
        className="animate-slide-up"
        style={{ textAlign: 'center', paddingTop: 'var(--space-5)' }}
      >
        <div className="animate-bounce-soft" style={{ fontSize: '3rem' }} aria-hidden>
          🧩✨
        </div>
        <Heading level={1} gradient>
          Broken Prompt
        </Heading>
        <Subheading>טלפון שבור. עכשיו עם AI.</Subheading>
      </header>

      <Card className="animate-slide-up-2" strip blob>
        <ol
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {STEPS.map((s) => (
            <li
              key={s.n}
              style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}
            >
              <span className="bp-chip bp-chip--num" aria-hidden>
                {s.n}
              </span>
              <span>
                <strong>{s.title}</strong>
                <br />
                <span style={{ color: 'var(--text-secondary)' }}>{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </Card>

      <section className="animate-slide-up-3" aria-label="בחירת רמת קושי">
        <Heading level={3} style={{ marginBottom: 'var(--space-2)' }}>
          רמת קושי
        </Heading>
        <div className="bp-difficulty" role="group" aria-label="בחירת רמת קושי">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.value}
              type="button"
              className="bp-diff-option"
              aria-pressed={difficulty === d.value}
              onClick={() => setDifficulty(d.value)}
            >
              <span aria-hidden style={{ marginInlineEnd: 'var(--space-2)' }}>
                {d.emoji}
              </span>
              {d.label}
            </button>
          ))}
        </div>
      </section>

      <div
        className="animate-slide-up-4"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          marginTop: 'var(--space-2)',
        }}
      >
        <Button fullWidth onClick={go}>
          🚀 יצירת חדר
        </Button>
        <Button variant="secondary" fullWidth onClick={go}>
          🔑 הצטרפות לחדר
        </Button>
      </div>
    </>
  )
}
