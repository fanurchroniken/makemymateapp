'use client'

import { useState, useEffect } from 'react'
import { Heart, Sparkles, Crown, Loader2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface CharacterLoadingProps {
  onComplete: (characterData: any) => void
  quizAnswers: any[]
}

const loadingMessages = {
  en: [
    "🔍 Scanning the realms for your perfect dreamboy...",
    "✨ Manifesting your ideal fantasy character...",
    "💫 Consulting the ancient romance algorithms...",
    "🔥 Crafting a character that will make your heart race...",
    "💎 Polishing your prince to perfection...",
    "🌟 Summoning the ultimate book boyfriend...",
    "💕 Weaving together your deepest desires...",
    "👑 Creating a character worthy of your love...",
    "💋 Adding that special spark of chemistry...",
    "🎭 Designing your perfect romantic fantasy..."
  ],
  de: [
    "🔍 Durchsuche die Reiche nach deinem perfekten Traummann...",
    "✨ Manifestiere deinen idealen Fantasiecharakter...",
    "💫 Konsultiere die antiken Romanz-Algorithmen...",
    "🔥 Erschaffe einen Charakter, der dein Herz zum Rasen bringt...",
    "💎 Poliere deinen Prinzen zur Perfektion...",
    "🌟 Beschwöre den ultimativen Buch-Freund...",
    "💕 Verwebe deine tiefsten Wünsche...",
    "👑 Erschaffe einen Charakter, der deiner Liebe würdig ist...",
    "💋 Füge den besonderen Funken der Chemie hinzu...",
    "🎭 Gestalte deine perfekte romantische Fantasie..."
  ]
}

export function CharacterLoading({ onComplete, quizAnswers }: CharacterLoadingProps) {
  const { language, t } = useLanguage()
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState(true)

  const messages = loadingMessages[language as keyof typeof loadingMessages]

  // Cycle through messages every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [messages.length])

  // Simulate the Logic Apps call (we'll replace this with real API call)
  useEffect(() => {
    const generateCharacter = async () => {
      try {
        console.log('🚀 Starting character generation...')
        console.log('📊 Quiz Answers:', quizAnswers)
        console.log('🌍 Language:', language)
        
        // TODO: Replace with actual Logic Apps API call
        const response = await fetch('/api/generate-character', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quizAnswers,
            language
          })
        })

        console.log('📡 API Response Status:', response.status)
        console.log('📡 API Response OK:', response.ok)

        if (!response.ok) {
          const errorText = await response.text()
          console.error('❌ API Error Response:', errorText)
          throw new Error('Character generation failed')
        }

        const characterData = await response.json()
        console.log('✅ Character Data Received:', characterData)
        
        // Handle the response structure
        if (characterData.success && characterData.character) {
          onComplete(characterData.character)
        } else {
          // Fallback to the response directly if it's already a character object
          onComplete(characterData)
        }
      } catch (error) {
        console.error('❌ Error generating character:', error)
        // For now, use sample data as fallback
        const fallbackCharacter = {
          name: "Prince Lucian",
          title: "The Dark Enchanter",
          description: "A mysterious prince with piercing amber eyes and a troubled past. He's protective, possessive, and willing to burn the world for the one he loves.",
          traits: ["Mysterious", "Protective", "Possessive", "Dark Magic", "Royal Blood"],
          aesthetic: "Gothic Romance",
          imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
          personality: "A brooding prince who hides his vulnerability behind a cold exterior. He's fiercely loyal and protective, with a dark side that only emerges when those he loves are threatened.",
          background: "Born into a cursed royal family, Lucian learned to wield dark magic to protect his kingdom. His heart was hardened by betrayal, until he met someone who could see through his facade."
        }
        console.log('🔄 Using fallback character data')
        onComplete(fallbackCharacter)
      }
    }

    // Start generation after a short delay
    const timer = setTimeout(generateCharacter, 3000)
    return () => clearTimeout(timer)
  }, [onComplete, quizAnswers, language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="aesthetic-box p-12 text-center space-y-8">
          {/* Animated Icons */}
          <div className="flex justify-center space-x-6">
            <Heart className="w-16 h-16 text-red-400 animate-pulse" />
            <Sparkles className="w-16 h-16 text-purple-400 animate-bounce" />
            <Crown className="w-16 h-16 text-amber-400 animate-pulse" />
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-cinzel text-white">
              {language === 'de' ? 'Suche nach deinem Traummann...' : 'Looking for your dreamboy...'}
            </h1>
            
            {/* Animated Message */}
            <div className="h-16 flex items-center justify-center">
              <p className="text-xl text-amber-400 font-medium transition-all duration-500">
                {messages[currentMessageIndex]}
              </p>
            </div>
          </div>

          {/* Loading Spinner */}
          <div className="flex justify-center">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
              <div className="absolute inset-0 w-12 h-12 border-4 border-amber-400/20 rounded-full"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-amber-400 rounded-full animate-spin"></div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>

          {/* Subtitle */}
          <p className="text-slate-400 text-lg">
            {language === 'de' 
              ? 'Dies kann einen Moment dauern...' 
              : 'This may take a moment...'
            }
          </p>
        </div>
      </div>
    </div>
  )
}
