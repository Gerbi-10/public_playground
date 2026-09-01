// Game logic layer — the only place UI code should call.
import { base44Adapter } from './base44Adapter'
import { aiService } from './aiService'
import type { Card, Game, Player, Round } from '../types/entities'

export const gameService = {
  async getLobbyState(): Promise<{ game: Game; players: Player[] }> {
    const [game, players] = await Promise.all([
      base44Adapter.getGame(),
      base44Adapter.listPlayers(),
    ])
    return { game, players }
  },
  async getRoundState(): Promise<{ game: Game; card: Card }> {
    const [game, cards] = await Promise.all([
      base44Adapter.getGame(),
      base44Adapter.listCards(),
    ])
    return { game, card: cards[0] }
  },
  async getRevealState(): Promise<Round[]> {
    return base44Adapter.listRounds()
  },
  // TODO: filter blocked words, call LLM, persist round.
  async submitPrompt(prompt: string): Promise<string> {
    return aiService.generateOutput(prompt)
  },
}
