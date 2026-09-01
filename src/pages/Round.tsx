import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { Heading } from '../components/Heading'
import { TextArea } from '../components/TextField'
import { mockCards } from '../data/mockData'

export default function Round() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const card = mockCards[0]
  const blockedWords = ['ירח', 'נאס"א', 'חללית']
  const wordCount = useMemo(() => (prompt.trim() ? prompt.trim().split(/\s+/).length : 0), [prompt])
  const submit = () => navigate('/handoff')

  return (
    <>
      <header className="animate-slide-up"><Heading level={2}>סבב 1</Heading></header>

      <Card className="animate-slide-up-2">
        <span className="bp-chip bp-chip--muted">כרטיס מושג</span>
        <Heading level={2} style={{ color: 'var(--accent-cyan)' }}>{card.concept_text}</Heading>
      </Card>

      <Card className="animate-slide-up-2">
        <Heading level={3}>מילים חסומות</Heading>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {blockedWords.map((w) => (<span key={w} className="bp-chip bp-chip--magenta">{w}</span>))}
        </div>
      </Card>

      <Card className="animate-slide-up-3">
        <TextArea label="הפרומפט שלך" placeholder="תאר את המושג בלי המילים החסומות…" value={prompt} onChange={(e) => setPrompt(e.target.value)} maxLength={300} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-secondary)' }}>מונה מילים</span>
          <span className="bp-chip">{wordCount} מילים</span>
        </div>
      </Card>

      <Card className="animate-slide-up-3">
        <Heading level={3}>מה ה-AI באמת יקבל</Heading>
        <div className="bp-placeholder" style={{ minHeight: 80, padding: 'var(--space-3)', textAlign: 'right' }}>
          {prompt.trim() ? prompt : 'הפרומפט שלך יופיע כאן אחרי חסימת המילים'}
        </div>
      </Card>

      <div className="bp-placeholder animate-fade" style={{ minHeight: 56, fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-magenta)' }} aria-label="טיימר (placeholder)">⏱ טיימר — 00:45</div>

      <Button fullWidth onClick={submit} disabled={!prompt.trim()}>שליחה ל-AI</Button>
    </>
  )
}
