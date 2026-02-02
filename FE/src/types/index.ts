export interface Option {
  id: number
  text: string
}

export interface Question {
  id: number
  category: Category
  categoryLabel: string
  question: string
  options: Option[]
}

export type Category = 'values' | 'lifestyle' | 'taste' | 'communication'

export interface CategoryInfo {
  key: Category
  label: string
  emoji: string
}

export interface GameData {
  name: string
  answers: number[]
}

export interface CategoryScore {
  category: Category
  label: string
  score: number
  matched: number
  total: number
}

export interface ComparisonResult {
  questionId: number
  question: string
  category: Category
  personAAnswer: string
  personBAnswer: string
  matched: boolean
}

export interface GameResult {
  personA: GameData
  personB: GameData
  totalScore: number
  grade: Grade
  categoryScores: CategoryScore[]
  comparisons: ComparisonResult[]
}

export interface Grade {
  emoji: string
  title: string
  description: string
}
