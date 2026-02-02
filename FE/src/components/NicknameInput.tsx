'use client'

import { useState } from 'react'

interface NicknameInputProps {
  onSubmit: (nickname: string) => void
  partnerName?: string
}

export default function NicknameInput({ onSubmit, partnerName }: NicknameInputProps) {
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmed = nickname.trim()

    if (!trimmed) {
      setError('닉네임을 입력해주세요')
      return
    }

    if (trimmed.length > 10) {
      setError('닉네임은 10자 이내로 입력해주세요')
      return
    }

    onSubmit(trimmed)
  }

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="mb-8">
        <span className="text-5xl mb-4 block">💕</span>
        {partnerName ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {partnerName}님이 초대했어요!
            </h1>
            <p className="text-gray-600">
              당신의 닉네임을 입력하고 궁합을 확인해보세요
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              닉네임을 입력해주세요
            </h1>
            <p className="text-gray-600">
              상대방에게 보여질 이름이에요
            </p>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
              setError('')
            }}
            placeholder="닉네임 (최대 10자)"
            maxLength={10}
            className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary-400 focus:outline-none transition-colors text-center"
            autoFocus
          />
          {error && (
            <p className="mt-2 text-red-500 text-sm">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={!nickname.trim()}
        >
          시작하기
        </button>
      </form>
    </div>
  )
}
