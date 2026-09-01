# Broken Prompt — Base44 dev notes

A scaffold for an educational hackathon game ("טלפון שבור. עכשיו עם AI."). Hebrew, RTL, mobile-first.

## Stack
Vite + React + TypeScript. Runs as a single dev server on port 3000.

## Run
docker compose -f docker-compose.base44.yml up -d
- Uses node:22-slim with the repo bind-mounted; npm install + vite dev on start.
- Live reload (Vite HMR). Binds 0.0.0.0, allows all hosts.

## Design language (refactored)
Light/white canvas with vibrant multi-color accents, playful geometry and motion.
- Surfaces are white (`--bg-main`, `--bg-card`) on a soft tinted shell (`--bg-soft`).
- Vibrant palette: purple, pink, orange, yellow, lime, teal, cyan, blue (`--c-*`).
- Gradients: `--grad-hero`, `--grad-cool`, `--grad-warm`, `--grad-mint`, `--grad-candy`, `--grad-rainbow`.
- `src/components/Shapes.tsx` renders the decorative background layer
  (morphing blobs, rings, triangles, squares, dots, squiggles, stars).
  It is `aria-hidden` and non-interactive.
- Motion utilities live in `global.css`: `animate-fade`, `animate-slide-up[-2..4]`,
  `animate-pop`, `animate-float`, `animate-wiggle`, `animate-bounce-soft`,
  `animate-pulse-ring`, `text-gradient`.
- All animation is disabled under `prefers-reduced-motion: reduce`.

### Component props
- `Card`: `tone` (`purple|pink|cyan|lime|yellow`), `strip` (rainbow top strip), `blob` (corner blob), `style`.
- `Heading`: `level`, `gradient` (animated rainbow text), `style`.
- `Button`: `variant` (`primary|secondary|ghost`), `fullWidth`.

## Architecture (separation of concerns)
- src/components/ — shared UI only. No entity/LLM calls.
- src/pages/ — screens; call gameService only.
- src/services/gameService.ts — game logic; the only layer UI calls.
- src/services/base44Adapter.ts — single integration point for Base44 Entities (mock).
- src/services/aiService.ts — placeholder for LLM calls (not implemented).
- src/data/mockData.ts — mock data so all screens render without a backend.
- src/types/entities.ts — Entity type definitions.
- src/styles/tokens.css — design tokens.

## What is mock / TODO
- All entity access returns mock data (base44Adapter.ts TODOs).
- No LLM calls (aiService.ts returns placeholders).
- No blocked-word masking, no realtime, no real QR, no round chaining.
- No auth, no personal fields, no analytics/tracking.

## Verify
Open / — Home with "Broken Prompt". Navigate Lobby → Round → Handoff → Reveal → Analysis.
