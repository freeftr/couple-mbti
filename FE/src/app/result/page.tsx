'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { decodeGameData, calculateResult, copyToClipboard } from '@/lib/utils'
import { GameResult } from '@/types'
import { categories } from '@/data/questions'

function ResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [result, setResult] = useState<GameResult | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const encodedA = searchParams.get('a')
    const encodedB = searchParams.get('b')

    if (encodedA && encodedB) {
      const personA = decodeGameData(encodedA)
      const personB = decodeGameData(encodedB)

      if (personA && personB) {
        const gameResult = calculateResult(personA, personB)
        setResult(gameResult)
      } else {
        router.push('/')
      }
    } else {
      router.push('/')
    }
  }, [searchParams, router])

  const handleShare = async () => {
    const shareLink = window.location.href
    const success = await copyToClipboard(shareLink)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  const getCategoryEmoji = (categoryKey: string) => {
    return categories.find(c => c.key === categoryKey)?.emoji || '📊'
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Result Header */}
        <div className="text-center mb-8">
          <span className="text-6xl block mb-4 animate-bounce-slow">{result.grade.emoji}</span>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {result.grade.title}
          </h1>
          <p className="text-gray-600 mb-4">{result.grade.description}</p>

          {/* Names */}
          <div className="flex items-center justify-center gap-3 text-lg">
            <span className="font-bold text-primary-600">{result.personA.name}</span>
            <span className="text-2xl">💕</span>
            <span className="font-bold text-primary-600">{result.personB.name}</span>
          </div>
        </div>

        {/* Total Score */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">총 궁합 점수</p>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${result.totalScore * 3.52} 352`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-800">{result.totalScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Scores */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="font-bold text-gray-800 mb-4">카테고리별 점수</h2>
          <div className="space-y-4">
            {result.categoryScores.map((cat) => (
              <div key={cat.category}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {getCategoryEmoji(cat.category)} {cat.label}
                  </span>
                  <span className="text-sm font-bold text-primary-600">
                    {cat.score}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500"
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {cat.matched}/{cat.total} 일치
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full py-3 px-4 rounded-xl font-medium text-gray-600 bg-white shadow-lg mb-6 flex items-center justify-center gap-2"
        >
          {showDetails ? '상세 비교 숨기기' : '질문별 상세 비교 보기'}
          <svg
            className={`w-5 h-5 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Detailed Comparison */}
        {showDetails && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <h2 className="font-bold text-gray-800 mb-4">질문별 비교</h2>
            <div className="space-y-4">
              {result.comparisons.map((comp, index) => (
                <div
                  key={comp.questionId}
                  className={`p-4 rounded-xl ${comp.matched ? 'bg-green-50' : 'bg-red-50'}`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg">{comp.matched ? '✅' : '❌'}</span>
                    <p className="text-sm font-medium text-gray-800">
                      Q{index + 1}. {comp.question}
                    </p>
                  </div>
                  <div className="ml-7 space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium text-primary-600">{result.personA.name}</span>: {comp.personAAnswer}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-primary-600">{result.personB.name}</span>: {comp.personBAnswer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleShare}
            className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all shadow-lg ${
              copied ? 'bg-green-500' : 'bg-primary-500 hover:bg-primary-600'
            }`}
          >
            {copied ? '링크가 복사되었어요!' : '결과 공유하기'}
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full py-4 px-6 rounded-xl font-bold text-gray-600 bg-white hover:bg-gray-50 transition-all shadow-lg"
          >
            다시 테스트하기
          </button>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultContent />
    </Suspense>
  )
}
