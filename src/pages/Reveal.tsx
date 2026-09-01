import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { Heading } from '../components/Heading'
import { mockRounds } from '../data/mockData'

const TONES = ['purple', 'pink', 'cyan', 'lime', 'yellow'] as const
const CHIP_TONES = ['bp-chip--purple', 'bp-chip--pink', 'bp-chip--cyan', 'bp-chip--lime', 'bp-chip--yellow']

export default function Reveal() {
  const navigate = useNavigate()
  const rounds = mockRounds

  return (
    <>
      <header className="animate-slide-up">
        <Heading level={2} gradient>
          🌀 מסע העיוותים
        </Heading>
      </header>

      <div className="bp-timeline animate-slide-up-2" role="list" aria-label="שלבי המסע">
        {rounds.map((r, i) => (
          <div key={r.id} role="listitem" className="bp-timeline__item">
            <span className={`bp-chip ${CHIP_TONES[i % CHIP_TONES.length]}`}>שלב {i + 1}</span>
            {i < rounds.length - 1 && <span aria-hidden className="bp-timeline__link" />}
            <Card
              tone={TONES[i % TONES.length]}
              blob
              className="animate-pop"
              style={{ width: '100%', minHeight: 130 }}
            >
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 700 }}>
                פלט ה-AI
              </span>
              <p style={{ margin: 0, fontWeight: 700 }}>{r.ai_output}</p>
            </Card>
          </div>
        ))}
      </div>

      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontWeight: 600 }}>
        גללו ימינה כדי לראות את כל השלבים ←
      </p>
      <Button fullWidth onClick={() => navigate('/analysis')}>
        🔎 למה זה קרה?
      </Button>
    </>
  )
}
