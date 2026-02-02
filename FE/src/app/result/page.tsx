'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import html2canvas from 'html2canvas'
import { decodeGameData, calculateResult, copyToClipboard } from '@/lib/utils'
import { GameResult } from '@/types'
import { categories } from '@/data/questions'
import ResultCard from '@/components/ResultCard'

function ResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const resultCardRef = useRef<HTMLDivElement>(null)

  const [result, setResult] = useState<GameResult | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [saving, setSaving] = useState(false)

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

  const handleSaveImage = async () => {
    if (!resultCardRef.current || saving) return

    setSaving(true)
    try {
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      })

      const link = document.createElement('a')
      link.download = `couple-result-${result?.personA.name}-${result?.personB.name}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Failed to save image:', error)
      alert('이미지 저장에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const handleShareImage = async () => {
    if (!resultCardRef.current || saving) return

    setSaving(true)
    try {
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      })

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setSaving(false)
          return
        }

        const file = new File([blob], 'couple-result.png', { type: 'image/png' })

        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: '커플 궁합 테스트 결과',
              text: `${result?.personA.name}님과 ${result?.personB.name}님의 궁합은 ${result?.totalScore}%!`,
            })
          } catch {
            // User cancelled or share failed, fallback to download
            handleSaveImage()
          }
        } else {
          // Fallback to download
          handleSaveImage()
        }
        setSaving(false)
      }, 'image/png')
    } catch (error) {
      console.error('Failed to share image:', error)
      setSaving(false)
      handleSaveImage()
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
            onClick={() => setShowImageModal(true)}
            className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            이미지로 저장하기
          </button>

          <button
            onClick={handleShare}
            className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all shadow-lg ${
              copied ? 'bg-green-500' : 'bg-primary-500 hover:bg-primary-600'
            }`}
          >
            {copied ? '링크가 복사되었어요!' : '링크 공유하기'}
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full py-4 px-6 rounded-xl font-bold text-gray-600 bg-white hover:bg-gray-50 transition-all shadow-lg"
          >
            다시 테스트하기
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 max-w-sm w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">결과 이미지</h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Result Card for Image */}
            <div className="flex justify-center mb-4 overflow-hidden">
              <ResultCard ref={resultCardRef} result={result} />
            </div>

            {/* Save/Share Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleShareImage}
                disabled={saving}
                className="w-full py-3 px-4 rounded-xl font-bold text-white bg-primary-500 hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    처리 중...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    이미지 공유하기
                  </>
                )}
              </button>

              <button
                onClick={handleSaveImage}
                disabled={saving}
                className="w-full py-3 px-4 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                이미지 저장하기
              </button>
            </div>
          </div>
        </div>
      )}
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
