import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { Heading } from '../components/Heading'
import { TextField } from '../components/TextField'
import { mockGame, mockPlayers } from '../data/mockData'

export default function Lobby() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')
  const game = mockGame
  const players = mockPlayers
  const start = () => navigate('/round')

  return (
    <>
      <header className="animate-slide-up"><Heading level={2}>חדר משחק</Heading></header>

      <Card className="animate-slide-up-2" style={{ alignItems: 'center', textAlign: 'center' }}>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>קוד חדר</span>
        <span style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '0.4em', color: 'var(--accent-cyan)', textShadow: '0 0 18px rgba(0,240,255,0.5)' }}>
          {game.room_code}
        </span>
        <div className="bp-placeholder" style={{ width: 180, height: 180 }} aria-label="קוד QR (placeholder)">QR</div>
      </Card>

      <Card className="animate-slide-up-3">
        <TextField label="כינוי" hint="בחרו כינוי זמני — ללא שם אמיתי או פרטים אישיים" placeholder="הכנס כינוי" value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={16} />
      </Card>

      <Card className="animate-slide-up-3">
        <Heading level={3} style={{ marginBottom: 'var(--space-2)' }}>שחקנים בחדר</Heading>
        <ul className="bp-player-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {players.map((p) => (
            <li key={p.id} className="bp-player-row">
              <span className="bp-player-avatar">{p.nickname.slice(0, 1)}</span>
              <span style={{ fontWeight: 700 }}>{p.nickname}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Button fullWidth onClick={start}>מתחילים</Button>
    </>
  )
}
