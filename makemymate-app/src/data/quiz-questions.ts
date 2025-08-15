export interface QuizQuestion {
  id: number
  section: 'character' | 'appearance' | 'redflags'
  type: 'multiple-choice' | 'slider'
  question: string
  options?: string[]
  minValue?: number
  maxValue?: number
  minLabel?: string
  maxLabel?: string
  category: string
}

export const quizQuestions: QuizQuestion[] = [
  // =============================================================================
  // SECTION 1: CHARACTER & TROPES
  // =============================================================================
  {
    id: 1,
    section: 'character',
    type: 'multiple-choice',
    question: 'How do you react when someone challenges you instead of admiring you?',
    options: [
      'I love it – friction is passion',
      'I get annoyed – I want control',
      'I withdraw – too much drama',
      'I play along – until I win'
    ],
    category: 'personality'
  },
  {
    id: 2,
    section: 'character',
    type: 'multiple-choice',
    question: 'What is your emotional sweet spot in stories?',
    options: [
      'Longing & Pain',
      'Power games & Control',
      'Trust & Betrayal',
      'Devotion & Downfall'
    ],
    category: 'emotions'
  },
  {
    id: 3,
    section: 'character',
    type: 'slider',
    question: 'How important is the "Enemies to Lovers" trope to you?',
    minValue: 0,
    maxValue: 10,
    minLabel: 'Boring',
    maxLabel: 'My life elixir',
    category: 'tropes'
  },
  {
    id: 4,
    section: 'character',
    type: 'multiple-choice',
    question: 'What does a magical bond mean to you?',
    options: [
      'Romantic – pure soul connection',
      'Frightening – loss of control',
      'Erotic – power & dependency',
      'Tragic – fate without escape'
    ],
    category: 'magic'
  },
  {
    id: 5,
    section: 'character',
    type: 'multiple-choice',
    question: 'Which of these tropes appeals to you most?',
    options: [
      '"I hate you but I crave you"',
      '"I\'ll burn the world for you"',
      '"We\'re cursed to love each other"',
      '"You\'re the only one who sees me"'
    ],
    category: 'tropes'
  },

  // =============================================================================
  // SECTION 2: APPEARANCE & VIBE
  // =============================================================================
  {
    id: 6,
    section: 'appearance',
    type: 'multiple-choice',
    question: 'Which look magically attracts you?',
    options: [
      'Dark velvet, pale skin, blood-red lips',
      'Leather jacket, scars, rough gaze',
      'Elegant suit, cold eyes',
      'Messy hair, sad smile'
    ],
    category: 'aesthetic'
  },
  {
    id: 7,
    section: 'appearance',
    type: 'slider',
    question: 'How much does aesthetics influence your partner choice?',
    minValue: 0,
    maxValue: 10,
    minLabel: 'Not at all',
    maxLabel: 'Totally decisive',
    category: 'preferences'
  },
  {
    id: 8,
    section: 'appearance',
    type: 'multiple-choice',
    question: 'What is your aesthetic kryptonite?',
    options: [
      'Scars with history',
      'Voice like dark honey',
      'Eyes that know too much',
      'Hands that hold you tight and never let go'
    ],
    category: 'attraction'
  },
  {
    id: 9,
    section: 'appearance',
    type: 'multiple-choice',
    question: 'How should your love interest dress?',
    options: [
      'Like a cursed aristocrat',
      'Like a rebellious street poet',
      'Like a shadow from a noir film',
      'Like someone who\'s never quite there'
    ],
    category: 'style'
  },
  {
    id: 10,
    section: 'appearance',
    type: 'multiple-choice',
    question: 'What is the perfect atmosphere for an encounter?',
    options: [
      'Thunderstorm & flickering light',
      'Smoky bar & melancholic music',
      'Abandoned library & whispering voices',
      'Full moon & a silent forest'
    ],
    category: 'atmosphere'
  },

  // =============================================================================
  // SECTION 3: RED FLAGS & MORAL DILEMMAS
  // =============================================================================
  {
    id: 11,
    section: 'redflags',
    type: 'multiple-choice',
    question: 'Which red flag would you most likely ignore?',
    options: [
      'Secrets about the past',
      'Controlling behavior disguised as protection',
      'Extreme jealousy',
      'Manipulative love declarations'
    ],
    category: 'boundaries'
  },
  {
    id: 12,
    section: 'redflags',
    type: 'multiple-choice',
    question: 'How do you react to emotional unavailability?',
    options: [
      'I want to break it',
      'I find it sexy',
      'I withdraw',
      'I lose myself in it'
    ],
    category: 'emotional'
  },
  {
    id: 13,
    section: 'redflags',
    type: 'multiple-choice',
    question: 'What is your biggest weakness in relationships?',
    options: [
      'I fall in love with broken souls',
      'I ignore warning signs',
      'I want too much too quickly',
      'I lose myself in fantasy'
    ],
    category: 'self-awareness'
  },
  {
    id: 14,
    section: 'redflags',
    type: 'slider',
    question: 'How much darkness is too much?',
    minValue: 0,
    maxValue: 10,
    minLabel: 'I want light',
    maxLabel: 'Give me the deepest night',
    category: 'darkness'
  },
  {
    id: 15,
    section: 'redflags',
    type: 'multiple-choice',
    question: 'What would you do if your love interest made a dark pact?',
    options: [
      'I stay – love is stronger',
      'I fight – I want to save them',
      'I leave – I want to protect myself',
      'I make my own pact'
    ],
    category: 'moral'
  }
]

export const quizSections = {
  character: {
    title: 'Character & Tropes',
    description: 'Discover your romantic preferences and relationship dynamics',
    icon: '🧛‍♂️'
  },
  appearance: {
    title: 'Appearance & Vibe',
    description: 'Explore your aesthetic preferences and visual attraction',
    icon: '🖤'
  },
  redflags: {
    title: 'Red Flags & Moral Dilemmas',
    description: 'Navigate boundaries, emotional complexity, and dark themes',
    icon: '🚩'
  }
}

export const getQuestionsBySection = (section: string) => {
  return quizQuestions.filter(q => q.section === section)
}

export const getTotalQuestions = () => quizQuestions.length

export const getSectionProgress = (section: string, answeredQuestions: number[]) => {
  const sectionQuestions = getQuestionsBySection(section)
  const answeredInSection = sectionQuestions.filter(q => answeredQuestions.includes(q.id))
  return (answeredInSection.length / sectionQuestions.length) * 100
}
