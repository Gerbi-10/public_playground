// Placeholder service for LLM / AI calls. NOT implemented.
// TODO: wire to a real model via Base44 backend functions.
export const aiService = {
  async generateOutput(_prompt: string): Promise<string> {
    return 'פלט AI לדוגמה — המודל טרם מחובר. (TODO)'
  },
  async analyzeRound(_rounds: unknown[]): Promise<AnalysisResult> {
    return {
      worstStepIndex: 2,
      bestPrompt: 'הליכה על כדור גדול לבן בשמיים בלילה',
      promptToImprove: 'משהו מואר מרחף גבוה מעל אנשים',
      conceptCard: { title: 'מה זה פרומפט טוב?', body: 'פרומפט טוב מתאר את המושג במילים שלא נחסמו, בצורה ספציפית וברורה.' },
      personalTip: 'נסו לתאר צורה, תנועה ומיקום — בלי להשתמש במילים האסורות.',
    }
  },
}

export interface AnalysisResult {
  worstStepIndex: number
  bestPrompt: string
  promptToImprove: string
  conceptCard: { title: string; body: string }
  personalTip: string
}
