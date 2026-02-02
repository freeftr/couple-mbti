'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { questions } from '@/data/questions'
import { GameData } from '@/types'
import { decodeGameData, encodeGameData } from '@/lib/utils'
import NicknameInput from '@/components/NicknameInput'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'

type GamePhase = 'nickname' | 'questions' | 'complete'

function PlayContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [phase, setPhase] = useState<GamePhase>('nickname')
  const [nickname, setNickname] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [partnerData, setPartnerData] = useState<GameData | null>(null)

  // Check for partner data in URL (B joining via shared link)
  useEffect(() => {
    const encoded = searchParams.get('d')
    if (encoded) {
      const decoded = decodeGameData(encoded)
      if (decoded) {
        setPartnerData(decoded)
      }
    }
  }, [searchParams])

  const handleNicknameSubmit = (name: string) => {
    setNickname(name)
    setPhase('questions')
  }

  const handleOptionSelect = (optionId: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionId
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // All questions answered
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleComplete = () => {
    const myData: GameData = { name: nickname, answers }

    if (partnerData) {
      // B completed - go to result page
      const encodedA = encodeGameData(partnerData)
      const encodedB = encodeGameData(myData)
      router.push(`/result?a=${encodedA}&b=${encodedB}`)
    } else {
      // A completed - go to share page
      const encoded = encodeGameData(myData)
      router.push(`/share?d=${encoded}`)
    }
  }

  const currentAnswer = answers[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      {phase === 'nickname' && (
        <div className="flex-1 flex items-center justify-center">
          <NicknameInput
            onSubmit={handleNicknameSubmit}
            partnerName={partnerData?.name}
          />
        </div>
      )}

      {phase === 'questions' && (
        <>
          {/* Header with Progress */}
          <div className="mb-6">
            <ProgressBar current={currentQuestion + 1} total={questions.length} />
          </div>

          {/* Question Card */}
          <div className="flex-1 flex items-center">
            <QuestionCard
              question={questions[currentQuestion]}
              selectedOption={currentAnswer}
              onSelect={handleOptionSelect}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex gap-3 max-w-md mx-auto w-full">
            {currentQuestion > 0 && (
              <button
                onClick={handlePrevious}
                className="flex-1 py-4 px-6 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                이전
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={currentAnswer === undefined}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-white transition-all ${
                currentAnswer !== undefined
                  ? 'bg-primary-500 hover:bg-primary-600 shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {isLastQuestion ? '완료' : '다음'}
            </button>
          </div>
        </>
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

export default function PlayPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PlayContent />
    </Suspense>
  )
}
