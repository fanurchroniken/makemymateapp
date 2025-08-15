export interface QuizAnswer {
  questionId: number
  answer: string | number
  timestamp: Date
}

export interface QuizSession {
  id: string
  answers: QuizAnswer[]
  currentQuestion: number
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface QuizProgress {
  totalQuestions: number
  answeredQuestions: number
  currentSection: string
  sectionProgress: {
    character: number
    appearance: number
    redflags: number
  }
  completionPercentage: number
}

export interface QuizResult {
  sessionId: string
  answers: QuizAnswer[]
  characterProfile: {
    personality: string[]
    aesthetic: string[]
    boundaries: string[]
    dominantTraits: string[]
  }
  generatedAt: Date
}

export interface QuizFormData {
  [questionId: number]: string | number
}

export interface QuizValidationError {
  questionId: number
  message: string
}
