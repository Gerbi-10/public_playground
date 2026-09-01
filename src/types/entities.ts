export interface Game {
  id: string
  room_code: string
  difficulty: string
  status: string
  current_round: number
  created_at: string
}

export interface Player {
  id: string
  game_id: string
  nickname: string
  turn_order: number
}

export interface Round {
  id: string
  game_id: string
  round_number: number
  player_id: string
  source_text: string
  blocked_words: string[]
  player_prompt: string
  ai_output: string
  timestamp: string
}

export interface Card {
  id: string
  concept_text: string
  difficulty_level: string
  category: string
}

export type DifficultyLevel = '8-10' | '11-14' | '15-18'
