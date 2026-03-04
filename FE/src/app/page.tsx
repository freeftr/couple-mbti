'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="max-w-md w-full text-center">
        {/* Logo/Title */}
        <div className="mb-8">
          <span className="text-6xl mb-4 block animate-bounce-slow">💕</span>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            커플 궁합 테스트
          </h1>
          <p className="text-gray-600">
            둘의 궁합을 알아볼까요?
          </p>
        </div>

        {/* How it works */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            이렇게 진행돼요
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold flex-shrink-0">
                1
              </div>
              <p className="text-left text-gray-600">
                내가 먼저 질문에 답해요
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold flex-shrink-0">
                2
              </div>
              <p className="text-left text-gray-600">
                링크를 상대방에게 공유해요
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold flex-shrink-0">
                3
              </div>
              <p className="text-left text-gray-600">
                상대방이 답하면 궁합 결과가 나와요
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/play"
          className="inline-block w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          시작하기
        </Link>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-500">
          총 20개의 질문으로 구성되어 있어요
        </p>

        <div className="mt-4 text-xs text-gray-400">
          <Link href="/privacy" className="hover:text-gray-600 underline">
            개인정보처리방침
          </Link>
        </div>
      </div>
    </div>
  )
}
