'use client'

import { useState } from 'react'
import { QuizContainer } from '@/components/quiz/QuizContainer'
import { CharacterLoading } from '@/components/CharacterLoading'
import { QuizAnswer } from '@/types/quiz'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Crown, Share2, Heart, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

// Sample character data for now
// TODO: This will be replaced with AI-generated content based on quiz answers
// AI will generate: name, title, description, personality, background, aesthetic
// Traits will be calculated from answer mappings in the database
const sampleCharacter = {
  name: "Prince Lucian", // AI-generated character name
  title: "The Dark Enchanter", // AI-generated character title/epithet
  description: "A mysterious prince with piercing amber eyes and a troubled past. He's protective, possessive, and willing to burn the world for the one he loves.", // AI-generated main description
  traits: ["Mysterious", "Protective", "Possessive", "Dark Magic", "Royal Blood"], // Calculated from quiz answers
  aesthetic: "Gothic Romance", // AI-generated aesthetic style
  imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face", // AI-generated image
  personality: "A brooding prince who hides his vulnerability behind a cold exterior. He's fiercely loyal and protective, with a dark side that only emerges when those he loves are threatened.", // AI-generated personality
  background: "Born into a cursed royal family, Lucian learned to wield dark magic to protect his kingdom. His heart was hardened by betrayal, until he met someone who could see through his facade." // AI-generated background story
}

export default function QuizPage() {
  const { t } = useLanguage()
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([])
  const [generatedCharacter, setGeneratedCharacter] = useState<any>(null)
  const [isSharing, setIsSharing] = useState(false)

  const handleQuizComplete = (answers: QuizAnswer[]) => {
    setQuizAnswers(answers)
    setIsGenerating(true)
    // Clear session storage
    sessionStorage.removeItem('quiz-answers')
    sessionStorage.removeItem('quiz-current-index')
  }

  const handleCharacterGenerated = (characterData: any) => {
    setGeneratedCharacter(characterData)
    setIsGenerating(false)
    setQuizCompleted(true)
  }

  const handleRestart = () => {
    setQuizCompleted(false)
    setIsGenerating(false)
    setQuizAnswers([])
    setGeneratedCharacter(null)
    sessionStorage.removeItem('quiz-answers')
    sessionStorage.removeItem('quiz-current-index')
    sessionStorage.removeItem('quiz-session-id')
    // Force a reload to re-initialize QuizContainer state
    window.location.reload()
  }

  const handleShare = async () => {
    setIsSharing(true)
    try {
      const character = generatedCharacter || sampleCharacter
      console.log('🔍 Character data for sharing:', character)
      console.log('🔍 Share URL:', character.shareUrl)
      console.log('🔍 Share ID:', character.shareId)
      
      // Use the actual share URL if available, otherwise fallback to home
      const shareUrl = character.shareUrl || `${window.location.origin}/character/${character.shareId}` || window.location.origin
      console.log('🔍 Final share URL:', shareUrl)
      
      if (navigator.share) {
        await navigator.share({
          title: `${t('share.title')} - ${character.name}`,
          text: `${t('share.text')} ${character.name}, ${character.title}!`,
          url: shareUrl
        })
      } else {
        // Fallback: copy to clipboard
        const shareText = `${t('share.text')} ${character.name}, ${character.title}!\n\n${shareUrl}\n\n#MakeMyMate #FantasyCharacter #Romance`
        await navigator.clipboard.writeText(shareText)
        alert(t('share.clipboardMessage'))
      }
    } catch (error) {
      console.error('Error sharing:', error)
    } finally {
      setIsSharing(false)
    }
  }



  if (isGenerating) {
    return <CharacterLoading onComplete={handleCharacterGenerated} quizAnswers={quizAnswers} />
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                 <div className="container mx-auto px-4 py-8">
           <div className="w-full max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link href="/">
                <Button variant="outline" className="hover:border-amber-400 hover:text-amber-400">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('character.backToHome')}
                </Button>
              </Link>
            </div>

                         {/* Character Card */}
             <div className="aesthetic-box p-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Character Image */}
                 <div className="flex flex-col h-full">
                   <div className="relative flex-1">
                     <img 
                       src={generatedCharacter?.imageUrl || sampleCharacter.imageUrl} 
                       alt={generatedCharacter?.name || sampleCharacter.name}
                       className="w-full h-full object-cover rounded-lg border border-slate-700 shadow-lg"
                     />
                     <div className="absolute top-4 right-4">
                       <div className="bg-slate-900/80 backdrop-blur-sm rounded-full p-2">
                         <Heart className="w-6 h-6 text-red-400" />
                       </div>
                     </div>
                   </div>
                   

                 </div>

                                 {/* Character Details */}
                 <div className="flex flex-col h-full space-y-6">
                  {/* Character Header */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Crown className="w-8 h-8 text-amber-400" />
                                             <h1 className="text-3xl md:text-4xl font-cinzel text-white">
                         {generatedCharacter?.name || sampleCharacter.name}
                       </h1>
                     </div>
                     <p className="text-xl text-amber-400 font-medium">
                       {generatedCharacter?.title || sampleCharacter.title}
                     </p>
                     <div className="flex items-center space-x-2">
                       <Star className="w-4 h-4 text-amber-400" />
                       <span className="text-slate-300">{generatedCharacter?.aesthetic || sampleCharacter.aesthetic}</span>
                     </div>
                  </div>

                  {/* Character Description */}
                  <div className="space-y-4">
                                         <p className="text-slate-300 leading-relaxed">
                       {generatedCharacter?.description || sampleCharacter.description}
                     </p>
                    
                                         {/* Personality */}
                     <div className="space-y-2">
                       <h3 className="text-lg font-semibold text-white">{t('character.personality')}</h3>
                       <p className="text-slate-300 text-sm leading-relaxed">
                         {generatedCharacter?.personality || sampleCharacter.personality}
                       </p>
                     </div>

                     {/* Background */}
                     <div className="space-y-2">
                       <h3 className="text-lg font-semibold text-white">{t('character.background')}</h3>
                       <p className="text-slate-300 text-sm leading-relaxed">
                         {generatedCharacter?.background || sampleCharacter.background}
                       </p>
                     </div>
                  </div>

                                     {/* Character Traits */}
                   <div className="space-y-3">
                     <h3 className="text-lg font-semibold text-white">{t('character.traits')}</h3>
                     <div className="flex flex-wrap gap-2">
                       {(generatedCharacter?.traits || sampleCharacter.traits).map((trait: string, index: number) => (
                         <span 
                           key={index}
                           className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-amber-400"
                         >
                           {trait}
                         </span>
                       ))}
                     </div>
                   </div>

                   

                                     {/* Action Buttons */}
                   <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-auto">
                     <Button 
                       onClick={handleShare} 
                       disabled={isSharing}
                       className="dark-glam-button text-sm whitespace-nowrap flex-1"
                     >
                       <Share2 className="w-4 h-4 mr-2" />
                       {isSharing ? t('character.sharing') : t('character.share')}
                     </Button>
                     <Button onClick={handleRestart} className="dark-glam-button text-sm whitespace-nowrap flex-1">
                       <Sparkles className="w-4 h-4 mr-2" />
                       {t('character.createNew')}
                     </Button>
                     <Link href="/" className="flex-1">
                       <Button variant="outline" className="hover:border-amber-400 hover:text-amber-400 text-sm whitespace-nowrap w-full">
                         {t('character.backToHome')}
                       </Button>
                     </Link>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="hover:border-amber-400 hover:text-amber-400 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('character.backToHome')}
            </Button>
          </Link>
        </div>

        {/* Quiz Container */}
        <QuizContainer onComplete={handleQuizComplete} />
      </div>
    </div>
  )
}
