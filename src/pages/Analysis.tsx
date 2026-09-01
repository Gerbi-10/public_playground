import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { Heading } from '../components/Heading'
import { mockRounds } from '../data/mockData'

export default function Analysis() {
  const navigate = useNavigate()
  const worstStepIndex = 2
  const bestPrompt = mockRounds[0].player_prompt
  const promptToImprove = mockRounds[2].player_prompt
  const conceptCard = { title: 'מה זה פרומפט טוב?', body: 'פרומפט טוב מתאר את המושג במילים שלא נחסמו, בצורה ספציפית וברורה.' }
  const personalTip = 'נסו לתאר צורה, תנועה ומיקום — בלי להשתמש במילים האסורות.'

  return (
    <>
      <header className="animate-slide-up"><Heading level={2}>למה זה קרה?</Heading></header>

      <Card className="animate-slide-up-2">
        <span className="bp-chip bp-chip--magenta">איפה אבד הכי הרבה מידע?</span>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '1.2rem' }}>שלב {worstStepIndex + 1}</p>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{mockRounds[worstStepIndex].ai_output}</p>
      </Card>

      <Card className="animate-slide-up-2">
        <span className="bp-chip">הפרומפט הטוב</span>
        <p style={{ margin: 0 }}>{bestPrompt}</p>
      </Card>

      <Card className="animate-slide-up-3">
        <span className="bp-chip bp-chip--magenta">פרומפט שדורש שיפור</span>
        <p style={{ margin: 0 }}>{promptToImprove}</p>
      </Card>

      <Card className="animate-slide-up-3">
        <span className="bp-chip bp-chip--muted">כרטיס מושג חינוכי</span>
        <Heading level={3}>{conceptCard.title}</Heading>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{conceptCard.body}</p>
      </Card>

      <Card className="animate-slide-up-3">
        <span className="bp-chip">טיפ אישי</span>
        <p style={{ margin: 0 }}>{personalTip}</p>
      </Card>

      <Button variant="ghost" fullWidth onClick={() => navigate('/')}>חזרה לדף הבית</Button>
    </>
  )
}
