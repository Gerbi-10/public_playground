# Broken Prompt — Base44 dev notes

A scaffold for an educational hackathon game ("טלפון שבור. עכשיו עם AI."). Hebrew, RTL, mobile-first.

## Stack
Vite + React + TypeScript. Runs as a single dev server on port 3000.

## Run
docker compose -f docker-compose.base44.yml up -d
- Uses node:22-slim with the repo bind-mounted; npm install + vite dev on start.
- Live reload (Vite HMR). Binds 0.0.0.0, allows all hosts.

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
