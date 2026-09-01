// Central adapter for all Base44 Entity operations.
// TODO: replace mock returns with real Base44 SDK calls.
import { mockCards, mockGame, mockPlayers, mockRounds } from '../data/mockData'
import type { Card, Game, Player, Round } from '../types/entities'

export const base44Adapter = {
  async getGame(): Promise<Game> { return mockGame },
  async listPlayers(): Promise<Player[]> { return mockPlayers },
  async listRounds(): Promise<Round[]> { return mockRounds },
  async listCards(): Promise<Card[]> { return mockCards },
  // TODO: createGame, createPlayer, createRound, updateRound, updateGameStatus...
}
