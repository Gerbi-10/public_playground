import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { Heading } from '../components/Heading'
import { mockRounds } from '../data/mockData'

export default function Reveal() {
  const navigate = useNavigate()
  const rounds = mockRounds

  return (
    <>
      <header className="animate-slide-up"><Heading level={2}>מסע העיוותים</Heading></header>

      <div className="animate-slide-up-2" style={{ display: 'flex', gap: 'var(--space-3)', overflowX: 'auto', padding: 'var(--space-3) var(--space-1)', position: 'relative', scrollSnapType: 'x mandatory' }} role="list" aria-label="שלבי המסע">
        {rounds.map((r, i) => (
          <div key={r.id} role="listitem" style={{ flex: '0 0 220px', scrollSnapAlign: 'start', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="bp-chip" style={{ background: i === 0 ? 'rgba(0,240,255,0.15)' : 'rgba(255,45,149,0.15)', color: i === 0 ? 'var(--accent-cyan)' : 'var(--accent-magenta)', borderColor: i === 0 ? 'rgba(0,240,255,0.3)' : 'rgba(255,45,149,0.3)' }}>שלב {i + 1}</span>
            {i < rounds.length - 1 && (<span aria-hidden style={{ position: 'absolute', top: '20px', right: 'calc(-1 * var(--space-3))', width: 'var(--space-3)', height: 2, background: 'rgba(138,138,163,0.4)' }} />)}
            <Card style={{ width: '100%', minHeight: 120 }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>פלט ה-AI</span>
              <p style={{ margin: 0, fontWeight: 700 }}>{r.ai_output}</p>
            </Card>
          </div>
        ))}
      </div>

      <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>גללו ימינה כדי לראות את כל השלבים ←</p>
      <Button fullWidth onClick={() => navigate('/analysis')}>למה זה קרה?</Button>
    </>
  )
}
