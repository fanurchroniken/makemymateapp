'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Crown, Share2, Heart, Sparkles, Star, Eye, Users, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { createClient } from '@supabase/supabase-js'
import TopNav from '@/components/layout/TopNav'

interface Character {
  id: number
  session_id: string
  share_id: string
  character_name: string
  character_description: string
  character_traits: string[]
  personality_profile: any
  appearance_description: string
  background_story: string
  image_url: string
  image_prompt: string
  aesthetic_style: string
  is_public: boolean
  share_count: number
  like_count: number
  view_count: number
  language_code: string
  created_at: string
}

export default function CharacterPage() {
  const params = useParams()
  const { t } = useLanguage()
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)

  const shareId = params.shareId as string

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        setLoading(true)
        setError(null)

        // Initialize Supabase client
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Get character data
        const { data: characterData, error: characterError } = await supabase.rpc(
          'get_character_by_share_id',
          { p_share_id: shareId }
        )

        if (characterError) {
          throw new Error('Character not found')
        }

        if (!characterData || characterData.length === 0) {
          throw new Error('Character not found')
        }

        const char = characterData[0]
        setCharacter({
          id: char.id,
          session_id: char.session_id,
          share_id: char.share_id,
          character_name: char.character_name,
          character_description: char.character_description,
          character_traits: Array.isArray(char.character_traits) ? char.character_traits : [char.character_traits],
          personality_profile: char.personality_profile,
          appearance_description: char.appearance_description,
          background_story: char.background_story,
          image_url: char.image_url,
          image_prompt: char.image_prompt,
          aesthetic_style: char.aesthetic_style,
          is_public: char.is_public,
          share_count: char.share_count || 0,
          like_count: char.like_count || 0,
          view_count: char.view_count || 0,
          language_code: char.language_code,
          created_at: char.created_at
        })

        // Track view
        await supabase.rpc('increment_character_view', { p_share_id: shareId })

        // Check if user has liked this character (using localStorage)
        const likedCharacters = JSON.parse(localStorage.getItem('liked_characters') || '[]')
        setHasLiked(likedCharacters.includes(shareId))

      } catch (err) {
        console.error('Error loading character:', err)
        setError(err instanceof Error ? err.message : 'Failed to load character')
      } finally {
        setLoading(false)
      }
    }

    if (shareId) {
      loadCharacter()
    }
  }, [shareId])

  const handleShare = async () => {
    if (!character) return

    setIsSharing(true)
    try {
      const shareUrl = `${window.location.origin}/character/${character.share_id}`
      
      if (navigator.share) {
        await navigator.share({
          title: `${t('share.title')} - ${character.character_name}`,
          text: `${t('share.text')} ${character.character_name}!`,
          url: shareUrl
        })
      } else {
        // Fallback: copy to clipboard
        const shareText = `${t('share.text')} ${character.character_name}!\n\n${shareUrl}\n\n#MakeMyMate #FantasyCharacter #Romance`
        await navigator.clipboard.writeText(shareText)
        alert(t('share.clipboardMessage'))
      }

      // Increment share count
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      await supabase.rpc('increment_character_share', { p_share_id: character.share_id })
      
      // Update local state
      setCharacter(prev => prev ? { ...prev, share_count: prev.share_count + 1 } : null)

    } catch (error) {
      console.error('Error sharing:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const handleLike = async () => {
    if (!character || hasLiked) return

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      
      await supabase.rpc('increment_character_like', { p_share_id: character.share_id })
      
      // Update local state
      setCharacter(prev => prev ? { ...prev, like_count: prev.like_count + 1 } : null)
      setHasLiked(true)
      
      // Store in localStorage
      const likedCharacters = JSON.parse(localStorage.getItem('liked_characters') || '[]')
      likedCharacters.push(character.share_id)
      localStorage.setItem('liked_characters', JSON.stringify(likedCharacters))

    } catch (error) {
      console.error('Error liking character:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <TopNav />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
            <p className="text-slate-300">{t('common.loading')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <TopNav />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-cinzel text-white">{t('common.error')}</h1>
            <p className="text-slate-300">{t('character.notFound')}</p>
            <Link href="/">
              <Button className="dark-glam-button">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('character.backToHome')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <TopNav />
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Stats */}
          <div className="mb-8 flex justify-end items-center">
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{character.view_count} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">{character.share_count} shares</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{character.like_count} likes</span>
              </div>
            </div>
          </div>

          {/* Character Card */}
          <div className="aesthetic-box p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Character Image */}
              <div className="flex flex-col h-full">
                <div className="relative flex-1">
                  <img 
                    src={character.image_url} 
                    alt={character.character_name}
                    className="w-full h-full object-cover rounded-lg border border-slate-700 shadow-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={handleLike}
                      disabled={hasLiked}
                      className={`bg-slate-900/80 backdrop-blur-sm rounded-full p-2 transition-all duration-200 ${
                        hasLiked 
                          ? 'text-red-500 hover:text-red-400' 
                          : 'text-red-400 hover:text-red-300 hover:scale-110'
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${hasLiked ? 'fill-current' : ''}`} />
                    </button>
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
                      {character.character_name}
                    </h1>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-300">{character.aesthetic_style}</span>
                  </div>
                </div>

                {/* Character Description */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">{t('character.overview')}</h3>
                  <p className="text-slate-300 leading-relaxed">
                    {character.character_description}
                  </p>
                  
                  {/* Personality */}
                  {character.personality_profile && (
                    <>
                      <div className="border-t border-slate-700/60 my-4" />
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">{t('character.personality')}</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {typeof character.personality_profile === 'string' 
                            ? character.personality_profile 
                            : JSON.stringify(character.personality_profile)
                          }
                        </p>
                      </div>
                    </>
                  )}

                  {/* Appearance */}
                  {character.appearance_description && (
                    <>
                      <div className="border-t border-slate-700/60 my-4" />
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">{t('character.appearance')}</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {character.appearance_description}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Background */}
                  {character.background_story && (
                    <>
                      <div className="border-t border-slate-700/60 my-4" />
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">{t('character.background')}</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {character.background_story}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Character Traits */}
                {character.character_traits && character.character_traits.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white">{t('character.traits')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {character.character_traits.map((trait, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-amber-400"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

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
                  <Button 
                    onClick={handleLike}
                    disabled={hasLiked}
                    className={`text-sm whitespace-nowrap flex-1 ${
                      hasLiked 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'dark-glam-button'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {hasLiked ? t('common.liked') : t('common.like')}
                  </Button>
                  <Link href="/quiz" className="flex-1">
                    <Button className="dark-glam-button text-sm whitespace-nowrap w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      {t('character.createNew')}
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
