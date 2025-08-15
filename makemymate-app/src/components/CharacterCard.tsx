'use client'

import { useState } from 'react'
import { Heart, Share2, Eye, Crown, Sparkles } from 'lucide-react'
import { Character } from '@/lib/character-service'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface CharacterCardProps {
  character: Character
  onShare?: (character: Character) => void
}

export function CharacterCard({ character, onShare }: CharacterCardProps) {
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (onShare) {
      onShare(character)
      return
    }

    const shareUrl = `${window.location.origin}/character/${character.share_id}`
    const shareText = `${t('share.text')}\n\nMeet ${character.character_name} - My Perfect Fantasy Character!\n\nTake the quiz to find yours: ${shareUrl}\n\n#MakeMyMate #FantasyCharacter #Romance`

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Meet ${character.character_name} - My Perfect Fantasy Character`,
          text: shareText,
          url: shareUrl
        })
      } else {
        await navigator.clipboard.writeText(shareText)
        alert(t('share.clipboardMessage'))
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  return (
    <Link href={`/character/${character.share_id}`}>
      <div 
        className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-400/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[9/16] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80 z-10" />
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
            </div>
          )}
          
          <img
            src={character.image_url || '/api/placeholder/400/600'}
            alt={character.character_name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-4 left-4 right-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-amber-400 font-medium">
                    {character.aesthetic_style}
                  </span>
                </div>
                <button
                  onClick={handleShare}
                  className="p-2 bg-slate-800/80 backdrop-blur-sm rounded-full hover:bg-amber-400/20 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Character Name & Title */}
          <div className="space-y-1">
            <h3 className="text-lg font-cinzel text-white font-semibold line-clamp-1">
              {character.character_name}
            </h3>
            <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
              {character.character_description}
            </p>
          </div>

          {/* Traits */}
          <div className="flex flex-wrap gap-1">
            {character.character_traits?.slice(0, 3).map((trait, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-800/60 border border-slate-700/50 rounded-full text-xs text-amber-400"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{character.view_count || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{character.like_count || 0}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Share2 className="w-3 h-3" />
              <span>{character.share_count || 0}</span>
            </div>
          </div>
        </div>

        {/* Sparkle Effect on Hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
            <div className="absolute bottom-8 left-3 w-1 h-1 bg-amber-400 rounded-full animate-ping delay-100" />
            <div className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping delay-200" />
          </div>
        )}
      </div>
    </Link>
  )
}
