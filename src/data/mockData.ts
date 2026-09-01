import type { Card, Game, Player, Round } from '../types/entities'

export const mockGame: Game = {
  id: 'game-1',
  room_code: '4827',
  difficulty: '11-14',
  status: 'lobby',
  current_round: 1,
  created_at: new Date().toISOString(),
}

export const mockPlayers: Player[] = [
  { id: 'p1', game_id: 'game-1', nickname: 'נחשון', turn_order: 1 },
  { id: 'p2', game_id: 'game-1', nickname: 'קיקי', turn_order: 2 },
  { id: 'p3', game_id: 'game-1', nickname: 'זורו', turn_order: 3 },
  { id: 'p4', game_id: 'game-1', nickname: 'פיקסל', turn_order: 4 },
]

export const mockCards: Card[] = [
  { id: 'c1', concept_text: 'הנחיתה על הירח', difficulty_level: '11-14', category: 'היסטוריה' },
  { id: 'c2', concept_text: 'פוטוסינתזה', difficulty_level: '15-18', category: 'מדע' },
  { id: 'c3', concept_text: 'איך מכינים פיצה', difficulty_level: '8-10', category: 'אוכל' },
]

export const mockRounds: Round[] = [
  { id: 'r1', game_id: 'game-1', round_number: 1, player_id: 'p1', source_text: 'הנחית על הירח', blocked_words: ['ירח', 'נאס"א', 'חללית'], player_prompt: 'הליכה על כדור גדול לבן בשמיים בלילה', ai_output: 'אסטרונאוט הולך על כוכב לבן בשמיים הליליים', timestamp: new Date().toISOString() },
  { id: 'r2', game_id: 'game-1', round_number: 2, player_id: 'p2', source_text: 'אסטרונאוט הולך על כוכב לבן בשמיים הליליים', blocked_words: ['אסטרונאוט', 'כוכב'], player_prompt: 'אדם עם חליפה מיוחדת דורך על כדור בהיר מעלינו', ai_output: 'איש עם בגד מיוחד עומד על עיגול זוהר בשמיים', timestamp: new Date().toISOString() },
  { id: 'r3', game_id: 'game-1', round_number: 3, player_id: 'p3', source_text: 'איש עם בגד מיוחד עומד על עיגול זוהר בשמיים', blocked_words: ['איש', 'שמיים'], player_prompt: 'דמות זוהרת מרחפת מעל כולנו בלילה', ai_output: 'ישות אור צפה מעל בני האדם בחושך', timestamp: new Date().toISOString() },
  { id: 'r4', game_id: 'game-1', round_number: 4, player_id: 'p4', source_text: 'ישות אור צפה מעל בני האדם בחושך', blocked_words: ['אור', 'חושך'], player_prompt: 'משהו מואר מרחף גבוה מעל אנשים', ai_output: 'עצם זוהר תלוי באוויר מעל קהל', timestamp: new Date().toISOString() },
]
