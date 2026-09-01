import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import Button from '../components/Button'
import Card from '../components/Card'
import { Heading } from '../components/Heading'
import { TextField } from '../components/TextField'
import { mockGame, mockPlayers } from '../data/mockData'

export default function Lobby() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [nickname, setNickname] = useState('')

  // A scanned QR lands here with ?code=XXXX, so the room is preselected.
  const roomCode = searchParams.get('code') || mockGame.room_code
  const players = mockPlayers

  const joinUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return `${window.location.origin}/lobby?code=${encodeURIComponent(roomCode)}`
  }, [roomCode])

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
        <span className="bp-room-code">{roomCode}</span>

        <div className="bp-qr animate-float">
          {joinUrl ? (
            <QRCodeSVG
              value={joinUrl}
              size={172}
              bgColor="#ffffff"
              fgColor="#7c3aed"
              level="M"
              marginSize={2}
            />
          ) : (
            <div className="bp-placeholder" style={{ width: 172, height: 172 }}>
              QR
            </div>
          )}
        </div>

        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>
          סרקו כדי להצטרף לחדר — בלי להקליד כלום
        </p>
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
