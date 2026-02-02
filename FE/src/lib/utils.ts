import { GameData, GameResult, Grade, CategoryScore, ComparisonResult, Category } from '@/types'
import { questions, categories } from '@/data/questions'

/**
 * Encode game data to base64 URL parameter
 */
export function encodeGameData(data: GameData): string {
  const json = JSON.stringify(data)
  return btoa(encodeURIComponent(json))
}

/**
 * Decode base64 URL parameter to game data
 */
export function decodeGameData(encoded: string): GameData | null {
  try {
    const json = decodeURIComponent(atob(encoded))
    return JSON.parse(json)
  } catch {
    return null
  }
}

/**
 * Calculate compatibility result between two players
 */
export function calculateResult(personA: GameData, personB: GameData): GameResult {
  const comparisons: ComparisonResult[] = questions.map((q, index) => {
    const aAnswer = personA.answers[index]
    const bAnswer = personB.answers[index]

    return {
      questionId: q.id,
      question: q.question,
      category: q.category,
      personAAnswer: q.options.find(o => o.id === aAnswer)?.text || '',
      personBAnswer: q.options.find(o => o.id === bAnswer)?.text || '',
      matched: aAnswer === bAnswer,
    }
  })

  // Calculate category scores
  const categoryScores: CategoryScore[] = categories.map(cat => {
    const categoryQuestions = comparisons.filter(c => c.category === cat.key)
    const matched = categoryQuestions.filter(c => c.matched).length
    const total = categoryQuestions.length

    return {
      category: cat.key,
      label: cat.label,
      score: total > 0 ? Math.round((matched / total) * 100) : 0,
      matched,
      total,
    }
  })

  // Calculate total score
  const totalMatched = comparisons.filter(c => c.matched).length
  const totalScore = Math.round((totalMatched / comparisons.length) * 100)

  // Determine grade
  const grade = getGrade(totalScore)

  return {
    personA,
    personB,
    totalScore,
    grade,
    categoryScores,
    comparisons,
  }
}

/**
 * Get grade based on score
 */
export function getGrade(score: number): Grade {
  if (score >= 90) {
    return {
      emoji: '🔥',
      title: '소울메이트',
      description: '완벽한 궁합! 서로를 위해 태어난 두 사람이에요.',
    }
  } else if (score >= 70) {
    return {
      emoji: '💕',
      title: '찰떡궁합',
      description: '정말 잘 맞는 커플이에요! 서로를 이해하는 마음이 느껴져요.',
    }
  } else if (score >= 50) {
    return {
      emoji: '😊',
      title: '노력하면 잘 맞아요',
      description: '조금만 더 노력하면 더 좋은 관계가 될 수 있어요!',
    }
  } else if (score >= 30) {
    return {
      emoji: '🤔',
      title: '다름이 매력',
      description: '서로 다른 점이 많지만, 그게 매력이 될 수도 있어요.',
    }
  } else {
    return {
      emoji: '💥',
      title: '정반대 커플',
      description: '정반대라서 오히려 끌리는 걸지도? 서로의 다름을 존중해봐요.',
    }
  }
}

/**
 * Get category by key
 */
export function getCategoryInfo(key: Category) {
  return categories.find(c => c.key === key)
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Share using Web Share API
 */
export async function shareUrl(title: string, text: string, url: string): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
      return true
    } catch {
      return false
    }
  }
  return false
}
