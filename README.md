# Broken Prompt

טלפון שבור. עכשיו עם AI. — an educational hackathon game for ages 8–18.

Players describe a concept to an AI without using the blocked words. Each
round the AI's output becomes the next player's source, and the meaning
drifts. The final screen explains *why* it drifted, teaching what makes a
good prompt.

Hebrew, RTL, mobile-first. Vite + React + TypeScript.

## Run

```
docker compose -f docker-compose.base44.yml up -d
```

Two services come up:
- `web` — Vite dev server on port 3000
- `api` — zero-dependency LLM proxy on port 8787 (internal only)

The app runs fine with no LLM configured; it falls back to demo content.

## ⚠️ Security — this repository is PUBLIC

**Never commit an API key, token or secret to this repo.**

- The browser never holds a key and never calls an LLM provider directly.
- `server/index.js` is the only component that sees the key.
- The key is supplied at runtime as a platform secret via `/run/base44/app.env`,
  which lives outside the repo and outside git.
- `.env` and `*.env` are gitignored. `.env.example` is a template with empty
  values only.
- The proxy never logs prompt content and never logs the key.

### Configuring a model

Set these as runtime secrets in the Base44 dashboard (not in the repo):

| Secret | Value |
| --- | --- |
| `LLM_PROVIDER` | `openai` or `anthropic` |
| `LLM_API_KEY` | the provider key |
| `LLM_MODEL` | optional override |

Check wiring with `GET /api/ai/health` — it reports `configured: true/false`
and never echoes the key.

## Privacy

No accounts, no personal data. Players use a temporary nickname and a room
code. Nothing is persisted server-side, and nicknames and identifiers are
stripped before any text is sent to a model.

See `AGENTS.md` for architecture and design-system notes.
