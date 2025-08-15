import { supabase } from './supabase'
import { QuizQuestion } from '@/data/quiz-questions'

export interface DatabaseQuestion {
  id: number
  question_text: string
  options: string[]
  section: string
  order_index: number
}

export interface SupabaseQuestion {
  id: number
  category: string
  question_type: string
  question_order: number
  question_text: string
  options: string[] | null
  min_label: string | null
  max_label: string | null
  language_code: string
}

export interface SupabaseAestheticStyle {
  id: number
  name: string
  description: string
  prompt_template: string
  is_active: boolean
  created_at: string
}

// New function to fetch questions from the quiz_questions table
export async function getQuizQuestionsFromDatabase(languageCode: string = 'de'): Promise<QuizQuestion[]> {
  try {
    console.log(`Fetching quiz questions for language: ${languageCode}`)
    
    const { data: questions, error } = await supabase
      .rpc('get_quiz_questions', { p_language_code: languageCode })

    if (error) {
      console.error('Error fetching quiz questions:', error)
      // Fallback to hardcoded questions if database fails
      return getFallbackQuestions(languageCode)
    }

    if (!questions || questions.length === 0) {
      console.warn('No questions found in database, using fallback')
      return getFallbackQuestions(languageCode)
    }

    console.log(`Found ${questions.length} questions in database`)

    // Transform database data to QuizQuestion format
    return questions.map((q: DatabaseQuestion) => ({
      id: q.id,
      section: q.section as 'character' | 'appearance' | 'redflags',
      type: 'multiple-choice' as const, // All our questions are multiple choice
      question: q.question_text,
      options: q.options,
      category: q.section // Use section as category for now
    }))
  } catch (error) {
    console.error('Error in getQuizQuestionsFromDatabase:', error)
    return getFallbackQuestions(languageCode)
  }
}

export async function fetchQuizQuestions(languageCode: string = 'en'): Promise<QuizQuestion[]> {
  try {
    // Use the new function to get questions by language
    const { data: questions, error } = await supabase
      .rpc('get_questions_by_language', { lang_code: languageCode })

    if (error) {
      console.error('Error fetching questions:', error)
      // Fallback to hardcoded questions if Supabase fails
      return getFallbackQuestions(languageCode)
    }

    if (!questions || questions.length === 0) {
      console.warn('No questions found in database, using fallback')
      return getFallbackQuestions(languageCode)
    }

    // Transform Supabase data to QuizQuestion format
    return questions.map((q: SupabaseQuestion) => ({
      id: q.id,
      section: getSectionFromCategory(q.category),
      type: q.question_type as 'multiple-choice' | 'slider',
      question: q.question_text,
      options: q.options || undefined,
      minValue: q.question_type === 'slider' ? 0 : undefined,
      maxValue: q.question_type === 'slider' ? 10 : undefined,
      minLabel: q.min_label || undefined,
      maxLabel: q.max_label || undefined,
      category: q.category
    }))
  } catch (error) {
    console.error('Error in fetchQuizQuestions:', error)
    return getFallbackQuestions(languageCode)
  }
}

export async function fetchAestheticStyles() {
  try {
    const { data: styles, error } = await supabase
      .from('aesthetic_styles')
      .select('*')
      .eq('is_active', true)

    if (error) {
      console.error('Error fetching aesthetic styles:', error)
      return []
    }

    return styles || []
  } catch (error) {
    console.error('Error in fetchAestheticStyles:', error)
    return []
  }
}

export async function saveQuizResponse(sessionId: string, questionId: number, answer: string | number, languageCode: string = 'de') {
  try {
    console.log(`Saving quiz response: sessionId=${sessionId}, questionId=${questionId}, answer=${answer}, language=${languageCode}`)
    
    const { data, error } = await supabase
      .from('character_responses')
      .insert({
        session_id: sessionId,
        question_id: questionId,
        response: answer.toString(),
        language_code: languageCode
      })
      .select()

    if (error) {
      console.error('Error saving quiz response:', error)
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      throw error
    }

    console.log('Quiz response saved successfully:', data)
    return true
  } catch (error) {
    console.error('Error in saveQuizResponse:', error)
    // Don't throw error to prevent quiz interruption
    return false
  }
}

export async function saveGeneratedCharacter(sessionId: string, characterData: any, imageUrl?: string, languageCode: string = 'en') {
  try {
    const { error } = await supabase
      .from('generated_characters')
      .insert({
        session_id: sessionId,
        character_data: characterData,
        image_url: imageUrl,
        language_code: languageCode,
        is_public: true
      })

    if (error) {
      console.error('Error saving generated character:', error)
      throw error
    }

    return true
  } catch (error) {
    console.error('Error in saveGeneratedCharacter:', error)
    throw error
  }
}

export async function trackAnalytics(eventType: string, sessionId: string, languageCode: string = 'de', metadata?: any) {
  try {
    console.log(`Tracking analytics: eventType=${eventType}, sessionId=${sessionId}, language=${languageCode}`)
    
    const { data, error } = await supabase
      .from('analytics')
      .insert({
        event_type: eventType,
        session_id: sessionId,
        language_code: languageCode,
        metadata: metadata || {}
      })
      .select()

    if (error) {
      console.error('Error tracking analytics:', error)
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      // Don't throw error for analytics - it's not critical
    } else {
      console.log('Analytics tracked successfully:', data)
    }

    return true
  } catch (error) {
    console.error('Error in trackAnalytics:', error)
    // Don't throw error for analytics - it's not critical
    return false
  }
}

export async function getCharacterBySession(sessionId: string) {
  try {
    const { data: character, error } = await supabase
      .rpc('get_character_by_session', { session_id_param: sessionId })

    if (error) {
      console.error('Error fetching character:', error)
      return null
    }

    return character?.[0] || null
  } catch (error) {
    console.error('Error in getCharacterBySession:', error)
    return null
  }
}

// Helper function to map categories to sections
function getSectionFromCategory(category: string): 'character' | 'appearance' | 'redflags' {
  const categoryMap: { [key: string]: 'character' | 'appearance' | 'redflags' } = {
    'personality': 'character',
    'emotions': 'character',
    'tropes': 'character',
    'magic': 'character',
    'aesthetic': 'appearance',
    'preferences': 'appearance',
    'attraction': 'appearance',
    'style': 'appearance',
    'atmosphere': 'appearance',
    'boundaries': 'redflags',
    'emotional': 'redflags',
    'self-awareness': 'redflags',
    'darkness': 'redflags',
    'moral': 'redflags'
  }

  return categoryMap[category] || 'character'
}

// Fallback questions in case Supabase is not available
function getFallbackQuestions(languageCode: string = 'en'): QuizQuestion[] {
  const questions = {
    en: [
      {
        id: 1,
        section: 'character' as const,
        type: 'multiple-choice' as const,
        question: 'When your love interest finally breaks their cold exterior, what do you want them to say?',
        options: [
          'I\'ve been watching you for months',
          'I can\'t fight this anymore',
          'You\'re the only one who sees me',
          'I\'ll destroy anyone who touches you',
          'I\'ve never felt this way before'
        ],
        category: 'personality'
      },
      {
        id: 2,
        section: 'character' as const,
        type: 'multiple-choice' as const,
        question: 'What\'s your ultimate romantic fantasy scenario?',
        options: [
          'They rescue you from danger and claim you',
          'You discover their dark secret and they beg you to stay',
          'They\'re forced to choose between duty and love',
          'You\'re the only one who can heal their broken soul',
          'They\'re willing to burn the world for you'
        ],
        category: 'emotions'
      },
      {
        id: 3,
        section: 'character' as const,
        type: 'slider' as const,
        question: 'How important is the "Enemies to Lovers" trope to you?',
        minValue: 0,
        maxValue: 10,
        minLabel: 'Boring',
        maxLabel: 'My life elixir',
        category: 'tropes'
      },
      {
        id: 4,
        section: 'character' as const,
        type: 'multiple-choice' as const,
        question: 'What type of magical bond would you want with your partner?',
        options: [
          'Soulmates who can feel each other\'s emotions',
          'A curse that binds you together forever',
          'A magical contract that can\'t be broken',
          'Fated mates who are drawn to each other',
          'A bond that grows stronger with passion'
        ],
        category: 'magic'
      },
      {
        id: 5,
        section: 'appearance' as const,
        type: 'multiple-choice' as const,
        question: 'What physical feature makes you absolutely weak?',
        options: [
          'Piercing eyes that see through your soul',
          'Scars that tell stories of battles fought',
          'Hands that could both protect and destroy',
          'A voice that commands attention',
          'The way they move with predatory grace'
        ],
        category: 'aesthetic'
      },
      {
        id: 6,
        section: 'appearance' as const,
        type: 'slider' as const,
        question: 'How much does physical attraction matter in your ideal relationship?',
        minValue: 0,
        maxValue: 10,
        minLabel: 'Not at all',
        maxLabel: 'Everything',
        category: 'preferences'
      },
      {
        id: 7,
        section: 'appearance' as const,
        type: 'multiple-choice' as const,
        question: 'What\'s your biggest turn-on in a potential partner?',
        options: [
          'They\'re dangerous but gentle with you',
          'They have a mysterious, troubled past',
          'They\'re powerful but vulnerable around you',
          'They\'re willing to fight for what they want',
          'They have a dark side only you can tame'
        ],
        category: 'attraction'
      },
      {
        id: 8,
        section: 'appearance' as const,
        type: 'multiple-choice' as const,
        question: 'How should your ideal partner dress?',
        options: [
          'Like a dark prince from a forbidden realm',
          'Like a warrior who\'s seen too much',
          'Like someone who doesn\'t belong in this world',
          'Like they could kill you with their bare hands',
          'Like they\'re hiding something dangerous'
        ],
        category: 'style'
      },
      {
        id: 9,
        section: 'redflags' as const,
        type: 'multiple-choice' as const,
        question: 'Which "red flag" would you actually find attractive?',
        options: [
          'They have a mysterious past they won\'t discuss',
          'They\'re possessive and protective to the extreme',
          'They have a dark side they try to hide',
          'They\'re willing to break rules for you',
          'They have enemies who want them dead'
        ],
        category: 'boundaries'
      },
      {
        id: 10,
        section: 'redflags' as const,
        type: 'multiple-choice' as const,
        question: 'How do you want your partner to handle their emotional walls?',
        options: [
          'You want to be the one to break them down',
          'You find their emotional distance sexy',
          'You want them to be vulnerable only with you',
          'You\'re drawn to their tortured soul',
          'You want to heal their broken heart'
        ],
        category: 'emotional'
      },
      {
        id: 11,
        section: 'redflags' as const,
        type: 'multiple-choice' as const,
        question: 'What\'s your biggest weakness when it comes to love?',
        options: [
          'You fall for the ones who need saving',
          'You\'re drawn to dangerous, mysterious types',
          'You ignore warning signs when you\'re attracted',
          'You want to be the only one who understands them',
          'You\'re willing to risk everything for passion'
        ],
        category: 'self-awareness'
      },
      {
        id: 12,
        section: 'redflags' as const,
        type: 'multiple-choice' as const,
        question: 'What would you do if your love interest had to make a dark pact to save you?',
        options: [
          'You\'d make your own pact to protect them',
          'You\'d try to find another way together',
          'You\'d accept their sacrifice and love them anyway',
          'You\'d fight to break the pact yourself',
          'You\'d embrace the darkness with them'
        ],
        category: 'moral'
      }
    ],
    de: [
      {
        id: 1,
        section: 'character' as const,
        type: 'multiple-choice' as const,
        question: 'Wenn dein Schwarm endlich seine kalte Fassade durchbricht, was soll er sagen?',
        options: [
          'Ich beobachte dich seit Monaten',
          'Ich kann nicht mehr dagegen ankämpfen',
          'Du bist die Einzige, die mich sieht',
          'Ich werde jeden zerstören, der dich anfasst',
          'So habe ich mich noch nie gefühlt'
        ],
        category: 'personality'
      },
      {
        id: 2,
        section: 'character' as const,
        type: 'multiple-choice' as const,
        question: 'Was ist dein ultimatives romantisches Fantasieszenario?',
        options: [
          'Sie retten dich aus der Gefahr und beanspruchen dich',
          'Du entdeckst ihr dunkles Geheimnis und sie flehen dich an zu bleiben',
          'Sie müssen zwischen Pflicht und Liebe wählen',
          'Du bist die Einzige, die ihre gebrochene Seele heilen kann',
          'Sie sind bereit, die Welt für dich zu verbrennen'
        ],
        category: 'emotions'
      },
      {
        id: 3,
        section: 'character' as const,
        type: 'slider' as const,
        question: 'Wie wichtig ist dir das "Feinde zu Liebhabern" Trope?',
        minValue: 0,
        maxValue: 10,
        minLabel: 'Langweilig',
        maxLabel: 'Mein Lebenselixier',
        category: 'tropes'
      },
      {
        id: 4,
        section: 'character' as const,
        type: 'multiple-choice' as const,
        question: 'Welche Art magische Bindung möchtest du mit deinem Partner?',
        options: [
          'Seelenverwandte, die die Gefühle des anderen spüren',
          'Ein Fluch, der euch für immer bindet',
          'Ein magischer Vertrag, der nicht gebrochen werden kann',
          'Schicksalsgefährten, die sich zueinander hingezogen fühlen',
          'Eine Bindung, die mit Leidenschaft stärker wird'
        ],
        category: 'magic'
      },
      {
        id: 5,
        section: 'appearance' as const,
        type: 'multiple-choice' as const,
        question: 'Welches körperliche Merkmal macht dich absolut schwach?',
        options: [
          'Durchdringende Augen, die deine Seele durchschauen',
          'Narben, die Geschichten von Kämpfen erzählen',
          'Hände, die sowohl schützen als auch zerstören können',
          'Eine Stimme, die Aufmerksamkeit befiehlt',
          'Die Art, wie sie sich mit räuberischer Anmut bewegen'
        ],
        category: 'aesthetic'
      },
      {
        id: 6,
        section: 'appearance' as const,
        type: 'slider' as const,
        question: 'Wie wichtig ist körperliche Anziehung in deiner idealen Beziehung?',
        minValue: 0,
        maxValue: 10,
        minLabel: 'Überhaupt nicht',
        maxLabel: 'Alles',
        category: 'preferences'
      },
      {
        id: 7,
        section: 'appearance' as const,
        type: 'multiple-choice' as const,
        question: 'Was ist dein größter Turn-on bei einem potenziellen Partner?',
        options: [
          'Sie sind gefährlich, aber sanft zu dir',
          'Sie haben eine mysteriöse, problematische Vergangenheit',
          'Sie sind mächtig, aber verletzlich um dich herum',
          'Sie sind bereit, für das zu kämpfen, was sie wollen',
          'Sie haben eine dunkle Seite, die nur du zähmen kannst'
        ],
        category: 'attraction'
      },
      {
        id: 8,
        section: 'appearance' as const,
        type: 'multiple-choice' as const,
        question: 'Wie sollte dein idealer Partner sich kleiden?',
        options: [
          'Wie ein dunkler Prinz aus einem verbotenen Reich',
          'Wie ein Krieger, der zu viel gesehen hat',
          'Wie jemand, der nicht in diese Welt gehört',
          'Wie jemand, der dich mit bloßen Händen töten könnte',
          'Wie jemand, der etwas Gefährliches verbirgt'
        ],
        category: 'style'
      },
      {
        id: 9,
        section: 'redflags' as const,
        type: 'multiple-choice' as const,
        question: 'Welche "rote Flagge" würdest du tatsächlich attraktiv finden?',
        options: [
          'Sie haben eine mysteriöse Vergangenheit, über die sie nicht sprechen',
          'Sie sind besitzergreifend und schützend bis zum Extrem',
          'Sie haben eine dunkle Seite, die sie zu verbergen versuchen',
          'Sie sind bereit, Regeln für dich zu brechen',
          'Sie haben Feinde, die sie tot sehen wollen'
        ],
        category: 'boundaries'
      },
      {
        id: 10,
        section: 'redflags' as const,
        type: 'multiple-choice' as const,
        question: 'Wie soll dein Partner mit ihren emotionalen Mauern umgehen?',
        options: [
          'Du willst diejenige sein, die sie einreißt',
          'Du findest ihre emotionale Distanz sexy',
          'Du willst, dass sie nur mit dir verletzlich sind',
          'Du fühlst dich zu ihrer gequälten Seele hingezogen',
          'Du willst ihr gebrochenes Herz heilen'
        ],
        category: 'emotional'
      },
      {
        id: 11,
        section: 'redflags' as const,
        type: 'multiple-choice' as const,
        question: 'Was ist deine größte Schwäche, wenn es um Liebe geht?',
        options: [
          'Du verliebst dich in die, die gerettet werden müssen',
          'Du fühlst dich zu gefährlichen, mysteriösen Typen hingezogen',
          'Du ignorierst Warnsignale, wenn du angezogen bist',
          'Du willst die Einzige sein, die sie versteht',
          'Du bist bereit, alles für Leidenschaft zu riskieren'
        ],
        category: 'self-awareness'
      },
      {
        id: 12,
        section: 'redflags' as const,
        type: 'multiple-choice' as const,
        question: 'Was würdest du tun, wenn dein Schwarm einen dunklen Pakt eingehen müsste, um dich zu retten?',
        options: [
          'Du würdest deinen eigenen Pakt eingehen, um sie zu schützen',
          'Du würdest versuchen, einen anderen Weg zusammen zu finden',
          'Du würdest ihr Opfer akzeptieren und sie trotzdem lieben',
          'Du würdest kämpfen, um den Pakt selbst zu brechen',
          'Du würdest die Dunkelheit mit ihnen umarmen'
        ],
        category: 'moral'
      }
    ]
  }

  return questions[languageCode as keyof typeof questions] || questions.en
}
