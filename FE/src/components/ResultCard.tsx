'use client'

import { forwardRef } from 'react'
import { GameResult } from '@/types'
import { categories } from '@/data/questions'

interface ResultCardProps {
  result: GameResult
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(({ result }, ref) => {
  const getCategoryEmoji = (categoryKey: string) => {
    return categories.find(c => c.key === categoryKey)?.emoji || '📊'
  }

  return (
    <div
      ref={ref}
      className="w-[360px] bg-gradient-to-b from-pink-100 to-red-100 p-6 rounded-3xl"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <p className="text-sm text-pink-600 font-medium mb-1">커플 궁합 테스트</p>
        <div className="flex items-center justify-center gap-2 text-lg font-bold text-gray-800">
          <span>{result.personA.name}</span>
          <span className="text-2xl">💕</span>
          <span>{result.personB.name}</span>
        </div>
      </div>

      {/* Grade */}
      <div className="text-center mb-4">
        <span className="text-5xl block mb-2">{result.grade.emoji}</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{result.grade.title}</h2>
        <p className="text-sm text-gray-600">{result.grade.description}</p>
      </div>

      {/* Score Circle */}
      <div className="flex justify-center mb-4">
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="#fce7f3"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="#ec4899"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${result.totalScore * 3.02} 302`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">{result.totalScore}%</span>
          </div>
        </div>
      </div>

      {/* Category Scores */}
      <div className="bg-white/60 rounded-2xl p-4 mb-4">
        <div className="grid grid-cols-2 gap-3">
          {result.categoryScores.map((cat) => (
            <div key={cat.category} className="text-center">
              <div className="text-lg mb-1">{getCategoryEmoji(cat.category)}</div>
              <div className="text-xs text-gray-600 mb-1">{cat.label}</div>
              <div className="text-lg font-bold text-pink-600">{cat.score}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-xs text-gray-500">couple-mbti.vercel.app</p>
      </div>
    </div>
  )
})

ResultCard.displayName = 'ResultCard'

export default ResultCard
