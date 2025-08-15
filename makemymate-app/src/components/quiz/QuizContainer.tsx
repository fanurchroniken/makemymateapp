'use client'

import { useState, useEffect } from 'react'
import { QuizQuestion } from '@/data/quiz-questions' // Still used for QuizQuestion interface and quizSections
import { QuestionCard } from './QuestionCard'
import { ProgressBar } from './ProgressBar'
import { QuizAnswer, QuizFormData } from '@/types/quiz'
import { Button } from '@/components/ui/Button'
import { Crown, Sparkles, Heart, Loader2 } from 'lucide-react'
import { getQuizQuestionsFromDatabase, saveQuizResponse, trackAnalytics } from '@/lib/quiz-service'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface QuizContainerProps {
  onComplete: (answers: QuizAnswer[]) => void
}

export function QuizContainer({ onComplete }: QuizContainerProps) {
  const { language, t } = useLanguage()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizFormData>({})
  const [isStarted, setIsStarted] = useState(false)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentQuestion = questions[currentQuestionIndex]
  const isFirst = currentQuestionIndex === 0
  const isLast = currentQuestionIndex === questions.length - 1

  // Calculate progress
  const answeredQuestions = Object.keys(answers).map(Number)
  const totalProgress = questions.length > 0 ? (answeredQuestions.length / questions.length) * 100 : 0
  const currentSection = currentQuestion?.section || 'character'

  const sectionProgress = {
    character: getSectionProgress('character', answeredQuestions, questions),
    appearance: getSectionProgress('appearance', answeredQuestions, questions),
    redflags: getSectionProgress('redflags', answeredQuestions, questions)
  }

  // Load questions from Supabase on component mount and when language changes
  useEffect(() => {
    loadQuestions()
  }, [language])

  const loadQuestions = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedQuestions = await getQuizQuestionsFromDatabase(language)
      setQuestions(fetchedQuestions)
      
      // Track quiz start analytics
      const sessionId = sessionStorage.getItem('quiz-session-id') || generateSessionId()
      sessionStorage.setItem('quiz-session-id', sessionId)
      await trackAnalytics('quiz_started', sessionId, language, { questionCount: fetchedQuestions.length })
    } catch (err) {
      console.error('Error loading questions:', err)
      setError(t('quiz.error'))
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = async (questionId: number, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))

    // Save answer to Supabase
    try {
      const sessionId = sessionStorage.getItem('quiz-session-id') || generateSessionId()
      sessionStorage.setItem('quiz-session-id', sessionId)
      await saveQuizResponse(sessionId, questionId, answer, language)
    } catch (err) {
      console.error('Error saving answer:', err)
      // Continue with quiz even if saving fails
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // Quiz completed
      const quizAnswers: QuizAnswer[] = Object.entries(answers).map(([questionId, answer]) => ({
        questionId: parseInt(questionId),
        answer,
        timestamp: new Date()
      }))
      
      // Track quiz completion analytics
      const sessionId = sessionStorage.getItem('quiz-session-id')
      if (sessionId) {
        trackAnalytics('quiz_completed', sessionId, language, { 
          questionCount: questions.length,
          answeredCount: quizAnswers.length 
        })
      }
      
      onComplete(quizAnswers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleStart = () => {
    setIsStarted(true)
  }

  const generateSessionId = () => {
    return `quiz-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Load saved progress from session storage
  useEffect(() => {
    const savedAnswers = sessionStorage.getItem('quiz-answers')
    const savedIndex = sessionStorage.getItem('quiz-current-index')

    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }
    if (savedIndex) {
      setCurrentQuestionIndex(parseInt(savedIndex))
    }
  }, [])

  // Save progress to session storage
  useEffect(() => {
    sessionStorage.setItem('quiz-answers', JSON.stringify(answers))
    sessionStorage.setItem('quiz-current-index', currentQuestionIndex.toString())
  }, [answers, currentQuestionIndex])

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="aesthetic-box p-8 text-center space-y-8">
          <div className="flex justify-center">
            <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
          </div>
          <h1 className="text-2xl font-cinzel text-white">
            {t('quiz.loading')}
          </h1>
          <p className="text-slate-300">
            {t('quiz.preparing')}
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="aesthetic-box p-8 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-2xl font-cinzel text-white">
              {t('quiz.error')}
            </h1>
            <p className="text-slate-300">{error}</p>
          </div>
          <Button onClick={loadQuestions} className="dark-glam-button">
            {t('quiz.tryAgain')}
          </Button>
        </div>
      </div>
    )
  }

  if (!isStarted) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="aesthetic-box p-8 text-center space-y-8">
          {/* Language Switcher */}
          <div className="flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <Crown className="w-12 h-12 text-amber-400" />
              <Sparkles className="w-12 h-12 text-purple-400" />
              <Heart className="w-12 h-12 text-red-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-cinzel text-white">
              {t('quiz.discoverTitle')}
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              {t('quiz.discoverSubtitle').replace('{count}', questions.length.toString())}
            </p>
            <p className="text-slate-300 max-w-3xl mx-auto">
              {t('quiz.discoverDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🧛‍♂️</span>
                <h3 className="text-lg font-semibold text-white">{t('section.character.title')}</h3>
              </div>
              <p className="text-sm text-slate-400">
                {t('section.character.description')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🖤</span>
                <h3 className="text-lg font-semibold text-white">{t('section.appearance.title')}</h3>
              </div>
              <p className="text-sm text-slate-400">
                {t('section.appearance.description')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🚩</span>
                <h3 className="text-lg font-semibold text-white">{t('section.redflags.title')}</h3>
              </div>
              <p className="text-sm text-slate-400">
                {t('section.redflags.description')}
              </p>
            </div>
          </div>

          <Button onClick={handleStart} className="dark-glam-button text-lg px-8 py-4">
            {t('quiz.start')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Language Switcher */}
      <div className="flex justify-end">
        <LanguageSwitcher />
      </div>

      {/* Progress Bar */}
      <ProgressBar
        currentSection={currentSection}
        sectionProgress={sectionProgress}
        totalProgress={totalProgress}
      />

      {/* Question Card */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          currentAnswer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={isFirst}
          isLast={isLast}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      )}
    </div>
  )
}

// Helper function to calculate section progress
function getSectionProgress(section: string, answeredQuestions: number[], questions: QuizQuestion[]) {
  const sectionQuestions = questions.filter(q => q.section === section)
  if (sectionQuestions.length === 0) return 0
  
  const answeredInSection = sectionQuestions.filter(q => answeredQuestions.includes(q.id))
  return (answeredInSection.length / sectionQuestions.length) * 100
}
