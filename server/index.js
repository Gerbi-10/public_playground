/**
 * Broken Prompt — minimal LLM proxy backend.
 *
 * WHY THIS EXISTS
 * ---------------
 * This repo is PUBLIC and the app is frontend-only (Vite + React).
 * An LLM API key must NEVER reach the browser and must NEVER be committed.
 * This tiny server is the only place that holds the key. The browser talks
 * to /api/ai/* and never to the provider directly.
 *
 * SECRETS
 * -------
 * The key is read at runtime from (in priority order):
 *   1. process.env  (passed through by docker compose)
 *   2. APP_ENV_FILE (default: /run/base44/app.env) — provided by the platform,
 *      lives outside the repo and outside git.
 * Nothing is ever written to disk and the key is never logged.
 *
 * PROVIDER AGNOSTIC
 * -----------------
 * LLM_PROVIDER = "openai" | "anthropic"   (choose at runtime, not in code)
 * LLM_API_KEY  = the secret
 * LLM_MODEL    = optional model override
 *
 * PRIVACY (hackathon rule: ages 8-18, no personal data)
 * ----------------------------------------------------
 * Nothing is persisted. No logging of prompt content. No cookies, no IDs.
 * Zero runtime dependencies — Node 22 built-ins only.
 */

import http from 'node:http'
import fs from 'node:fs'

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

function loadEnvFile(path) {
  let raw
  try {
    raw = fs.readFileSync(path, 'utf8')
  } catch {
    return false // file absent is perfectly fine
  }
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    const quoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    if (quoted) value = value.slice(1, -1)
    if (!process.env[key]) process.env[key] = value
  }
  return true
}

const ENV_FILE = process.env.APP_ENV_FILE || '/run/base44/app.env'
const envFileFound = loadEnvFile(ENV_FILE)

const PORT = Number(process.env.PORT || 8787)
const PROVIDER = (process.env.LLM_PROVIDER || '').toLowerCase()
const API_KEY = process.env.LLM_API_KEY || ''
const MODEL = process.env.LLM_MODEL || ''

const DEFAULT_MODELS = {
  openai: 'gpt-4o-mini',
  anthropic: 'claude-3-5-haiku-latest',
}

const isConfigured = () =>
  Boolean(API_KEY) && (PROVIDER === 'openai' || PROVIDER === 'anthropic')

/* ------------------------------------------------------------------ */
/* Guards                                                              */
/* ------------------------------------------------------------------ */

const MAX_BODY_BYTES = 16 * 1024
const MAX_PROMPT_CHARS = 500
const MAX_ROUNDS = 12

// Very small in-memory rate limiter. Resets on restart. Stores no identity
// beyond a coarse bucket key, and the map is cleared every window.
const RATE_WINDOW_MS = 60_000
const RATE_MAX = 40
let windowStart = Date.now()
let hits = new Map()

function rateLimited(key) {
  const now = Date.now()
  if (now - windowStart > RATE_WINDOW_MS) {
    windowStart = now
    hits = new Map()
  }
  const n = (hits.get(key) || 0) + 1
  hits.set(key, n)
  return n > RATE_MAX
}

/* ------------------------------------------------------------------ */
/* Prompts                                                             */
/* ------------------------------------------------------------------ */

const SYSTEM_GENERATE = [
  'אתה מנוע דמיון במשחק חינוכי בשם "טלפון שבור עם AI" לילדים ונוער בגילאי 8–18.',
  'קיבלת תיאור שכתב שחקן. המשימה שלך: לנסח מחדש את התיאור במילים שלך.',
  'כללים:',
  '- ענה בעברית בלבד, במשפט אחד קצר (עד 15 מילים).',
  '- אל תנחש את המושג המקורי ואל תנסה לתקן את השחקן.',
  '- השתמש רק במידע שמופיע בתיאור. אל תוסיף פרטים מהידע הכללי שלך.',
  '- תוכן בטוח לילדים בלבד: ללא אלימות, מיניות, שנאה או תוכן מפחיד.',
  '- אל תבקש ואל תחזור פרטים מזהים אישית של אף אחד.',
  '- החזר את המשפט בלבד, בלי מרכאות ובלי הסברים.',
].join('\n')

const SYSTEM_ANALYZE = [
  'אתה מורה שמסביר לילדים ונוער (8–18) איך מודלי שפה עובדים ומה הופך פרומפט לטוב.',
  'קיבלת שרשרת סבבים ממשחק "טלפון שבור עם AI", שבו המושג הלך והשתנה.',
  'נתח איפה אבד הכי הרבה מידע ולמה.',
  'החזר JSON תקין בלבד, ללא טקסט נוסף וללא code fences, במבנה:',
  '{"worstStepIndex":number,"bestPrompt":string,"promptToImprove":string,',
  '"conceptCard":{"title":string,"body":string},"personalTip":string}',
  'כל הטקסט בעברית, קצר, מעודד ומתאים לגיל. אל תזכיר שמות שחקנים.',
].join('\n')

const FALLBACK_ANALYSIS = {
  worstStepIndex: 0,
  bestPrompt: '',
  promptToImprove: '',
  conceptCard: {
    title: 'מה זה פרומפט טוב?',
    body: 'פרומפט טוב מתאר את המושג במילים שלא נחסמו, בצורה ספציפית וברורה.',
  },
  personalTip: 'נסו לתאר צורה, תנועה ומיקום — בלי להשתמש במילים האסורות.',
}

/* ------------------------------------------------------------------ */
/* Provider calls                                                      */
/* ------------------------------------------------------------------ */

async function callOpenAI(system, user, maxTokens) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL || DEFAULT_MODELS.openai,
      max_tokens: maxTokens,
      temperature: 0.8,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  })
  if (!res.ok) throw new Error(`provider_error_${res.status}`)
  const json = await res.json()
  return String(json?.choices?.[0]?.message?.content || '').trim()
}

async function callAnthropic(system, user, maxTokens) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL || DEFAULT_MODELS.anthropic,
      max_tokens: maxTokens,
      temperature: 0.8,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  })
  if (!res.ok) throw new Error(`provider_error_${res.status}`)
  const json = await res.json()
  const parts = Array.isArray(json?.content) ? json.content : []
  return parts
    .map((p) => (p && p.type === 'text' ? p.text : ''))
    .join('')
    .trim()
}

function callLLM(system, user, maxTokens) {
  if (PROVIDER === 'anthropic') return callAnthropic(system, user, maxTokens)
  return callOpenAI(system, user, maxTokens)
}

/* ------------------------------------------------------------------ */
/* HTTP helpers                                                        */
/* ------------------------------------------------------------------ */

function send(res, status, payload) {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  })
  res.end(body)
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        reject(new Error('body_too_large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('invalid_json'))
      }
    })
    req.on('error', reject)
  })
}

function stripFences(text) {
  let t = text.trim()
  if (t.startsWith('```')) {
    const firstNewline = t.indexOf('\n')
    if (firstNewline !== -1) t = t.slice(firstNewline + 1)
    if (t.endsWith('```')) t = t.slice(0, -3)
  }
  return t.trim()
}

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */

async function handleGenerate(body) {
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : ''
  if (!prompt) return { status: 400, payload: { error: 'missing_prompt' } }
  if (prompt.length > MAX_PROMPT_CHARS) {
    return { status: 400, payload: { error: 'prompt_too_long' } }
  }

  const output = await callLLM(SYSTEM_GENERATE, prompt, 200)
  return { status: 200, payload: { output } }
}

async function handleAnalyze(body) {
  const rounds = Array.isArray(body.rounds) ? body.rounds.slice(0, MAX_ROUNDS) : []
  if (rounds.length === 0) return { status: 400, payload: { error: 'missing_rounds' } }

  // Only the fields needed for analysis are forwarded. Nicknames, ids and
  // timestamps are deliberately dropped before anything leaves this server.
  const safe = rounds.map((r, i) => ({
    step: i + 1,
    blocked_words: Array.isArray(r?.blocked_words) ? r.blocked_words.slice(0, 6) : [],
    player_prompt: String(r?.player_prompt || '').slice(0, MAX_PROMPT_CHARS),
    ai_output: String(r?.ai_output || '').slice(0, MAX_PROMPT_CHARS),
  }))

  const raw = await callLLM(SYSTEM_ANALYZE, JSON.stringify(safe), 700)

  let parsed
  try {
    parsed = JSON.parse(stripFences(raw))
  } catch {
    return { status: 200, payload: { ...FALLBACK_ANALYSIS, degraded: true } }
  }

  const payload = {
    worstStepIndex: Number.isInteger(parsed?.worstStepIndex) ? parsed.worstStepIndex : 0,
    bestPrompt: String(parsed?.bestPrompt || ''),
    promptToImprove: String(parsed?.promptToImprove || ''),
    conceptCard: {
      title: String(parsed?.conceptCard?.title || FALLBACK_ANALYSIS.conceptCard.title),
      body: String(parsed?.conceptCard?.body || FALLBACK_ANALYSIS.conceptCard.body),
    },
    personalTip: String(parsed?.personalTip || FALLBACK_ANALYSIS.personalTip),
  }
  return { status: 200, payload }
}

/* ------------------------------------------------------------------ */
/* Server                                                              */
/* ------------------------------------------------------------------ */

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost')
  const path = url.pathname

  if (req.method === 'GET' && (path === '/api/ai/health' || path === '/health')) {
    return send(res, 200, {
      ok: true,
      configured: isConfigured(),
      provider: isConfigured() ? PROVIDER : null,
      model: isConfigured() ? MODEL || DEFAULT_MODELS[PROVIDER] : null,
    })
  }

  if (req.method !== 'POST' || !path.startsWith('/api/ai/')) {
    return send(res, 404, { error: 'not_found' })
  }

  if (!isConfigured()) {
    // The frontend treats this as "stay in demo mode" and shows placeholders.
    return send(res, 503, {
      error: 'llm_not_configured',
      hint: 'Set LLM_PROVIDER and LLM_API_KEY as runtime secrets (never in the repo).',
    })
  }

  const bucket = req.socket.remoteAddress || 'unknown'
  if (rateLimited(bucket)) return send(res, 429, { error: 'rate_limited' })

  let body
  try {
    body = await readBody(req)
  } catch (err) {
    return send(res, 400, { error: err.message })
  }

  try {
    let result
    if (path === '/api/ai/generate') result = await handleGenerate(body)
    else if (path === '/api/ai/analyze') result = await handleAnalyze(body)
    else return send(res, 404, { error: 'not_found' })

    return send(res, result.status, result.payload)
  } catch (err) {
    // Log the error CODE only — never the prompt, never the key.
    console.error('[ai] request failed:', err.message)
    return send(res, 502, { error: 'upstream_failed' })
  }
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[ai] listening on :${PORT}`)
  console.log(`[ai] env file ${envFileFound ? 'loaded from' : 'not found at'} ${ENV_FILE}`)
  console.log(
    isConfigured()
      ? `[ai] provider=${PROVIDER} model=${MODEL || DEFAULT_MODELS[PROVIDER]} (key present)`
      : '[ai] no LLM configured — running in demo mode, /api/ai/* returns 503',
  )
})
