import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { Heading } from '../components/Heading'

export default function Handoff() {
  return <HandoffInner />
}

function HandoffInner() {
  const navigate = useNavigate()
  return (
    <div
      className="animate-fade"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 'var(--space-5)',
        minHeight: '60vh',
      }}
    >
      <div className="animate-bounce-soft" style={{ fontSize: '3.5rem' }} aria-hidden>
        📱➡️
      </div>
      <Heading level={2} gradient>
        מעבירים את המכשיר לשחקן הבא
      </Heading>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 340, fontWeight: 500 }}>
        ודאו שהשחקן הבא מוכן לפני שממשיכים.
      </p>
      <Button fullWidth onClick={() => navigate('/reveal')}>
        ✅ אני מוכן/ה
      </Button>
    </div>
  )
}
