'use client'

import { useState, useEffect } from 'react'
import { CharacterCard } from './CharacterCard'
import { Character, getPublicCharacters } from '@/lib/character-service'
import { Sparkles, Loader2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface CharacterGalleryProps {
  initialCharacters?: Character[]
  onCharacterShare?: (character: Character) => void
  maxItems?: number
  showLoadMore?: boolean
}

export function CharacterGallery({ initialCharacters = [], onCharacterShare, maxItems, showLoadMore = true }: CharacterGalleryProps) {
  const { t, language } = useLanguage()
  const [characters, setCharacters] = useState<Character[]>(initialCharacters)
  const [loading, setLoading] = useState(!initialCharacters.length)
  const [hasMore, setHasMore] = useState(showLoadMore && !maxItems)
  const [page, setPage] = useState(1)

  const loadCharacters = async (pageNum: number = 1) => {
    try {
      setLoading(true)
      const limit = maxItems ? maxItems : 20
      const newCharacters = await getPublicCharacters(limit, language)
      
      if (pageNum === 1) {
        setCharacters(newCharacters)
      } else {
        setCharacters(prev => [...prev, ...newCharacters])
      }
      
      if (maxItems) {
        setHasMore(false)
      } else {
        setHasMore(showLoadMore && newCharacters.length === limit)
      }
      setPage(pageNum)
    } catch (error) {
      console.error('Error loading characters:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!initialCharacters.length) {
      loadCharacters()
    }
  }, [initialCharacters.length, language, maxItems])

  const loadMore = () => {
    if (!loading && hasMore) {
      loadCharacters(page + 1)
    }
  }

  // Create masonry columns
  const createMasonryColumns = (items: Character[], columns: number) => {
    const cols: Character[][] = Array.from({ length: columns }, () => [])
    
    items.forEach((item, index) => {
      const colIndex = index % columns
      cols[colIndex].push(item)
    })
    
    return cols
  }

  const columns = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 4 : 
                 typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 
                 typeof window !== 'undefined' && window.innerWidth >= 640 ? 2 : 1

  const masonryColumns = createMasonryColumns(characters, columns)

  if (loading && !characters.length) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
          <p className="text-slate-400">{t('gallery.loading')}</p>
        </div>
      </div>
    )
  }

  if (!characters.length && !loading) {
    return (
      <div className="text-center py-20 space-y-4">
        <Sparkles className="w-12 h-12 text-amber-400 mx-auto" />
        <h3 className="text-xl font-cinzel text-white">{t('gallery.noCharacters')}</h3>
        <p className="text-slate-400">{t('gallery.beFirst')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {masonryColumns.map((column, colIndex) => (
          <div key={colIndex} className="space-y-6">
            {column.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onShare={onCharacterShare}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && showLoadMore && (
        <div className="text-center pt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="dark-glam-button px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t('gallery.loading')}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>{t('gallery.loadMore')}</span>
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
