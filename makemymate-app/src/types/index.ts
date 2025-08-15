// Quiz and Character Types
export interface Question {
  id: string
  category: 'personality' | 'appearance' | 'background' | 'style'
  questionText: string
  options?: string[]
  orderIndex: number
  isActive: boolean
}

export interface QuizAnswer {
  questionId: string
  answer: string
}

export interface QuizResponse {
  id: string
  sessionId: string
  answers: QuizAnswer[]
  generatedImageUrl?: string
  characterData?: CharacterData
  createdAt: Date
}

export interface CharacterData {
  personality: string
  appearance: string
  background: string
  style: string
  title: string
  quote: string
  imageUrl: string
}

// UI Component Types
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

// Form Types
export interface QuizFormData {
  answers: Record<string, string>
}

// Social Media Types
export interface ShareData {
  title: string
  description: string
  imageUrl: string
  url: string
  hashtags: string[]
}

// Admin Types
export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'super_admin'
  createdAt: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Environment Types
export interface EnvironmentConfig {
  supabaseUrl: string
  supabaseAnonKey: string
  logicAppsEndpointUrl: string
  appUrl: string
  nodeEnv: 'development' | 'production' | 'test'
}
