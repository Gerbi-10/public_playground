# Broken Prompt — Base44 dev notes

An educational hackathon game ("טלפון שבור. עכשיו עם AI."). Hebrew, RTL, mobile-first.

## Stack
Vite + React + TypeScript on port 3000, plus a tiny Node LLM proxy on 8787.

## Run
docker compose -f docker-compose.base44.yml up -d
- `web`: node:22-slim, repo bind-mounted, npm install + vite dev. Live reload.
- `api`: node:22-slim, `server/index.js`, zero npm dependencies.
- Vite proxies `/api/*` to the `api` container (see `vite.config.ts`).

## ⚠️ This repo is PUBLIC — secret handling
- Never commit keys. `.env` / `*.env` are gitignored; `.env.example` is empty.
- Only `server/index.js` sees the API key. The browser never does.
- Keys arrive at runtime from `process.env` or `/run/base44/app.env`
  (declared in `.base44/environment.json` under `secrets`).
- The proxy never logs prompt content or the key.

## Base44 integrations — important
This is an **imported app**: it runs from this repo inside docker, not on the
Base44 managed runtime. There is **no** `base44` package, no `window.base44`,
no built-in `InvokeLLM`, and no Base44 Entities API available here. Do not
write code against those. Use the `api` service for anything server-side.

## AI wiring
`src/services/aiService.ts` is the single seam. It calls:
- `GET  /api/ai/health`   — `{ configured, provider, model }`
- `POST /api/ai/generate` — `{ prompt }` -> `{ output }`
- `POST /api/ai/analyze`  — `{ rounds }` -> `AnalysisResult`

Provider is chosen at runtime via `LLM_PROVIDER` (`openai` | `anthropic`), so
swapping providers needs no code change. With no key configured the endpoints
return 503 and the UI silently falls back to demo content.

Safeguards in the proxy: 16KB body cap, 500-char prompt cap, 12-round cap,
in-memory rate limit, kid-safe system prompts, and nickname/id/timestamp
stripping before anything is sent upstream.

## Architecture (separation of concerns)
- src/components/ — shared UI only. No entity/LLM calls.
- src/pages/ — screens; call gameService only.
- src/services/gameService.ts — game logic; the only layer UI calls.
- src/services/base44Adapter.ts — data access seam (currently mock).
- src/services/aiService.ts — the only place that talks to the AI backend.
- src/data/mockData.ts — mock data so all screens render without a backend.
- src/types/entities.ts — Entity type definitions.
- src/styles/tokens.css — design tokens.
- server/index.js — LLM proxy. The only holder of the API key.

## Design language
Light/white canvas with vibrant multi-color accents, playful geometry, motion.
- White surfaces (`--bg-main`, `--bg-card`) on a soft tinted shell (`--bg-soft`).
- Vibrant palette `--c-*`: purple, pink, orange, yellow, lime, teal, cyan, blue.
- Gradients: `--grad-hero`, `--grad-cool`, `--grad-warm`, `--grad-mint`,
  `--grad-candy`, `--grad-rainbow`.
- `src/components/Shapes.tsx` renders the decorative background layer
  (morphing blobs, rings, triangles, squares, dots, squiggles, stars).
  It is `aria-hidden` and non-interactive.
- Motion utilities in `global.css`: `animate-fade`, `animate-slide-up[-2..4]`,
  `animate-pop`, `animate-float`, `animate-wiggle`, `animate-bounce-soft`,
  `animate-pulse-ring`, `text-gradient`.
- All animation is disabled under `prefers-reduced-motion: reduce`.

### Component props
- `Card`: `tone` (`purple|pink|cyan|lime|yellow`), `strip`, `blob`, `style`.
- `Heading`: `level`, `gradient`, `style`.
- `Button`: `variant` (`primary|secondary|ghost`), `fullWidth`.

## Still mock / TODO
- `base44Adapter.ts` returns mock data — no real persistence layer yet.
- No blocked-word masking, no realtime sync, no round chaining.
- Lobby QR is real, but joining via `?code=` does not yet load a real room.
- No auth, no personal fields, no analytics/tracking (by design).

## Verify
Open `/` — Home with "Broken Prompt". Navigate Lobby → Round → Handoff →
Reveal → Analysis. `curl localhost:8787/health` reports AI wiring status.
