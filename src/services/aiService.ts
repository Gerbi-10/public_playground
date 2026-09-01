/**
 * The single seam between the app and any LLM.
 *
 * The browser NEVER holds an API key and NEVER calls a provider directly.
 * It calls our own backend at /api/ai/*, which is proxied (see vite.config.ts)
 * to the `api` container that reads the key from a runtime secret.
 *
 * If the backend is unreachable or no key is configured, every function
 * degrades gracefully to demo content so the game still runs end to end.
 */

export interface AnalysisResult {
  worstStepIndex: number
  bestPrompt: string
  promptToImprove: string
  conceptCard: { title: string; body: string }
  personalTip: string
}

export interface AiStatus {
  configured: boolean
  provider: string | null
  model: string | null
}

const API_BASE = '/api/ai'

const DEMO_OUTPUT = 'פלט AI לדוגמה — המודל טרם מחובר. (מצב דמו)'

const DEMO_ANALYSIS: AnalysisResult = {
  worstStepIndex: 2,
  bestPrompt: 'הליכה על כדור גדול לבן בשמיים בלילה',
  promptToImprove: 'משהו מואר מרחף גבוה מעל אנשים',
  conceptCard: {
    title: 'מה זה פרומפט טוב?',
    body: 'פרומפט טוב מתאר את המושג במילים שלא נחסמו, בצורה ספציפית וברורה.',
  },
  personalTip: 'נסו לתאר צורה, תנועה ומיקום — בלי להשתמש במילים האסורות.',
}

async function post<T>(path: string, body: unknown): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export const aiService = {
  /** Is a real model wired up, or are we in demo mode? */
  async status(): Promise<AiStatus> {
    try {
      const res = await fetch(`${API_BASE}/health`)
      if (!res.ok) return { configured: false, provider: null, model: null }
      const json = (await res.json()) as AiStatus
      return {
        configured: Boolean(json.configured),
        provider: json.provider ?? null,
        model: json.model ?? null,
      }
    } catch {
      return { configured: false, provider: null, model: null }
    }
  },

  /** Re-render a player's description through the model. */
  async generateOutput(prompt: string): Promise<string> {
    const data = await post<{ output: string }>('/generate', { prompt })
    return data?.output?.trim() || DEMO_OUTPUT
  },

  /** Explain where meaning was lost across the chain. */
  async analyzeRound(rounds: unknown[]): Promise<AnalysisResult> {
    const data = await post<AnalysisResult>('/analyze', { rounds })
    return data ?? DEMO_ANALYSIS
  },
}
