'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { decodeGameData, copyToClipboard, shareUrl } from '@/lib/utils'
import { shareKakao, initKakao } from '@/lib/kakao'
import { GameData } from '@/types'

function ShareContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [gameData, setGameData] = useState<GameData | null>(null)
  const [shareLink, setShareLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [kakaoReady, setKakaoReady] = useState(false)

  useEffect(() => {
    const encoded = searchParams.get('d')
    if (encoded) {
      const decoded = decodeGameData(encoded)
      if (decoded) {
        setGameData(decoded)
        const link = `${window.location.origin}/play?d=${encoded}`
        setShareLink(link)
      } else {
        router.push('/')
      }
    } else {
      router.push('/')
    }
  }, [searchParams, router])

  useEffect(() => {
    // Initialize Kakao SDK when component mounts
    const checkKakao = () => {
      if (typeof window !== 'undefined' && window.Kakao) {
        const initialized = initKakao()
        setKakaoReady(initialized)
      }
    }

    // Check immediately and also after a delay (for script loading)
    checkKakao()
    const timer = setTimeout(checkKakao, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareLink)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = async () => {
    const shared = await shareUrl(
      '커플 궁합 테스트',
      `${gameData?.name}님이 궁합 테스트에 초대했어요! 함께 궁합을 확인해보세요 💕`,
      shareLink
    )
    if (!shared) {
      handleCopyLink()
    }
  }

  const handleKakaoShare = () => {
    if (!kakaoReady) {
      // Fallback: copy link if Kakao is not ready
      alert('카카오톡 공유를 사용하려면 NEXT_PUBLIC_KAKAO_JS_KEY 환경변수를 설정해주세요.\n링크가 클립보드에 복사됩니다.')
      handleCopyLink()
      return
    }

    const success = shareKakao({
      title: '커플 궁합 테스트 💕',
      description: `${gameData?.name}님이 궁합 테스트에 초대했어요! 함께 궁합을 확인해보세요.`,
      url: shareLink,
      buttonText: '테스트 참여하기',
    })

    if (!success) {
      handleCopyLink()
    }
  }

  if (!gameData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <span className="text-6xl block animate-bounce-slow">🎉</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {gameData.name}님, 답변 완료!
        </h1>
        <p className="text-gray-600 mb-8">
          이제 상대방에게 링크를 공유해주세요
        </p>

        {/* Share Link Box */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
          <p className="text-sm text-gray-500 mb-2">공유 링크</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 truncate"
            />
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              }`}
            >
              {copied ? '복사됨!' : '복사'}
            </button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleKakaoShare}
            className="w-full py-4 px-6 rounded-xl font-bold text-gray-800 bg-yellow-400 hover:bg-yellow-500 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.76 1.84 5.18 4.6 6.54-.2.74-.73 2.68-.84 3.1-.13.52.19.51.4.37.17-.11 2.62-1.78 3.68-2.5.7.1 1.42.15 2.16.15 5.52 0 10-3.48 10-7.8S17.52 3 12 3z"/>
            </svg>
            카카오톡으로 공유
          </button>

          <button
            onClick={handleShare}
            className="w-full py-4 px-6 rounded-xl font-bold text-white bg-primary-500 hover:bg-primary-600 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            다른 방법으로 공유
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-white/50 rounded-xl">
          <p className="text-sm text-gray-600">
            💡 상대방이 링크를 열고 질문에 답하면<br />
            둘의 궁합 결과를 함께 확인할 수 있어요!
          </p>
        </div>

        {/* Back to Home */}
        <button
          onClick={() => router.push('/')}
          className="mt-6 text-gray-500 hover:text-gray-700 text-sm underline"
        >
          처음으로 돌아가기
        </button>
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

export default function SharePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShareContent />
    </Suspense>
  )
}
