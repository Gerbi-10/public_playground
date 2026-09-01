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
      <header className="animate-slide-up">
        <Heading level={2} gradient>
          🎪 חדר משחק
        </Heading>
      </header>

      <Card
        className="animate-slide-up-2"
        tone="purple"
        strip
        style={{ alignItems: 'center', textAlign: 'center' }}
      >
        <span className="bp-chip bp-chip--purple">קוד חדר</span>
        <span className="bp-room-code">{game.room_code}</span>
        <div
          className="bp-placeholder animate-float"
          style={{ width: 180, height: 180 }}
          aria-label="קוד QR (placeholder)"
        >
          QR
        </div>
      </Card>

      <Card className="animate-slide-up-3" tone="cyan">
        <TextField
          label="כינוי"
          hint="בחרו כינוי זמני — ללא שם אמיתי או פרטים אישיים"
          placeholder="הכנס כינוי"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={16}
        />
      </Card>

      <Card className="animate-slide-up-4" tone="lime" blob>
        <Heading level={3} style={{ marginBottom: 'var(--space-2)' }}>
          👥 שחקנים בחדר
        </Heading>
        <ul className="bp-player-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {players.map((p) => (
            <li key={p.id} className="bp-player-row animate-pop">
              <span className="bp-player-avatar">{p.nickname.slice(0, 1)}</span>
              <span style={{ fontWeight: 800 }}>{p.nickname}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Button fullWidth onClick={start}>
        ✨ מתחילים
      </Button>
    </>
  )
}
