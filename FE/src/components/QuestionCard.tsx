'use client'

import { Question } from '@/types'

interface QuestionCardProps {
  question: Question
  selectedOption: number | null
  onSelect: (optionId: number) => void
}

export default function QuestionCard({ question, selectedOption, onSelect }: QuestionCardProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Category Badge */}
      <div className="flex justify-center mb-4">
        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
          {question.categoryLabel}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold text-gray-800 text-center mb-6 leading-relaxed">
        {question.question}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
              selectedOption === option.id
                ? 'bg-primary-500 text-white shadow-lg scale-[1.02]'
                : 'bg-white hover:bg-primary-50 text-gray-700 shadow-md hover:shadow-lg'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedOption === option.id
                    ? 'border-white bg-white'
                    : 'border-gray-300'
                }`}
              >
                {selectedOption === option.id && (
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                )}
              </div>
              <span className="font-medium">{option.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
