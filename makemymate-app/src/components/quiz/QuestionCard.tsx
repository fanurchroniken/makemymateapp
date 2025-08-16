'use client'

import { useState } from 'react'
import { QuizQuestion } from '@/data/quiz-questions'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'

interface QuestionCardProps {
  question: QuizQuestion
  currentAnswer?: string | number
  onAnswer: (questionId: number, answer: string | number) => void
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
  questionNumber: number
  totalQuestions: number
}

export function QuestionCard({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  questionNumber,
  totalQuestions
}: QuestionCardProps) {
  const { t } = useLanguage()
  const [sliderValue, setSliderValue] = useState<number>(
    typeof currentAnswer === 'number' ? currentAnswer : 5
  )

  const handleOptionSelect = (option: string) => {
    onAnswer(question.id, option)
  }

  const handleSliderChange = (value: number) => {
    setSliderValue(value)
    onAnswer(question.id, value)
  }

  const handleNext = () => {
    if (currentAnswer !== undefined) {
      onNext()
    }
  }

  const canProceed = currentAnswer !== undefined

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="aesthetic-box p-8 space-y-6">
        {/* Question Header */}
        <div className="text-center space-y-2">
          <div className="text-sm text-amber-400 font-medium">
            {t('quiz.questionProgress').replace('{current}', questionNumber.toString()).replace('{total}', totalQuestions.toString())}
          </div>
          <h2 className="text-xl md:text-2xl font-cinzel text-white leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Question Content */}
        <div className="space-y-6">
          {question.type === 'multiple-choice' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                    currentAnswer === option
                      ? 'border-amber-400 bg-slate-800/80 shadow-lg shadow-amber-500/20'
                      : 'border-slate-700 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800/60'
                  }`}
                >
                  <span className={`text-sm md:text-base ${
                    currentAnswer === option ? 'text-amber-400' : 'text-white'
                  }`}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          )}

          {question.type === 'slider' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">{question.minLabel}</span>
                <span className="text-lg font-bold text-amber-400">{sliderValue}</span>
                <span className="text-sm text-slate-400">{question.maxLabel}</span>
              </div>

                             <div className="relative">
                 <input
                   type="range"
                   min={question.minValue || 0}
                   max={question.maxValue || 10}
                   value={sliderValue}
                   onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                   className="w-full h-2 appearance-none cursor-pointer slider"
                 />
                 <div className="absolute top-0 left-0 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg pointer-events-none"
                      style={{
                        width: `${((sliderValue - (question.minValue || 0)) / ((question.maxValue || 10) - (question.minValue || 0))) * 100}%`
                      }} />
               </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6">
          <Button
            onClick={onPrevious}
            disabled={isFirst}
            variant="outline"
            className={`${
              isFirst
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:border-amber-400 hover:text-amber-400'
            }`}
          >
            {t('quiz.previous')}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className={`${
              canProceed
                ? 'dark-glam-button'
                : 'opacity-50 cursor-not-allowed bg-slate-700'
            }`}
          >
            {isLast ? t('quiz.finish') : t('quiz.next')}
          </Button>
        </div>
      </div>

             <style jsx>{`
         .slider::-webkit-slider-thumb {
           appearance: none;
           height: 20px;
           width: 20px;
           border-radius: 50%;
           background: linear-gradient(135deg, #fbbf24, #f59e0b);
           cursor: pointer;
           box-shadow: 0 2px 6px rgba(251, 191, 36, 0.3);
           margin-top: -9px;
         }

         .slider::-moz-range-thumb {
           height: 20px;
           width: 20px;
           border-radius: 50%;
           background: linear-gradient(135deg, #fbbf24, #f59e0b);
           cursor: pointer;
           border: none;
           box-shadow: 0 2px 6px rgba(251, 191, 36, 0.3);
         }

         .slider {
           background: transparent;
         }

         .slider::-webkit-slider-track {
           background: #374151;
           border-radius: 8px;
           height: 8px;
         }

         .slider::-moz-range-track {
           background: #374151;
           border-radius: 8px;
           height: 8px;
           border: none;
         }
       `}</style>
    </div>
  )
}
