 'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Character, getPublicCharacters } from '@/lib/character-service'
import { CharacterCard } from '@/components/CharacterCard'
import { useLanguage } from '@/contexts/LanguageContext'
import { Search } from 'lucide-react'
import TopNav from '@/components/layout/TopNav'
import Link from 'next/link'

export default function BoyfriendsPage() {
  const { t, language } = useLanguage()
  const [items, setItems] = useState<Character[]>([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const seenIdsRef = useRef<Set<string>>(new Set())

  const loadMore = async (pageNum: number) => {
    if (loading || !hasMore) return
    setLoading(true)
    const next = await getPublicCharacters(20, language)
    // Deduplicate by share_id (or fallback to id)
    const filtered = next.filter((c) => {
      const key = String(c.share_id || c.id)
      if (seenIdsRef.current.has(key)) return false
      seenIdsRef.current.add(key)
      return true
    })
    setItems(prev => [...prev, ...filtered])
    setHasMore(filtered.length === 20)
    setLoading(false)
    setPage(pageNum)
  }

  useEffect(() => {
    // initial load
    setItems([])
    setHasMore(true)
    setPage(1)
    seenIdsRef.current = new Set()
    loadMore(1)
  }, [language])

  const normalizedQuery = query.trim().toLowerCase()
  const visibleItems = useMemo(() => {
    if (!normalizedQuery) return items
    return items.filter((c) => {
      const inTraits = (c.character_traits || []).some(t => String(t).toLowerCase().includes(normalizedQuery))
      const inStyle = (c.aesthetic_style || '').toLowerCase().includes(normalizedQuery)
      const inName = (c.character_name || '').toLowerCase().includes(normalizedQuery)
      const inDesc = (c.character_description || '').toLowerCase().includes(normalizedQuery)
      return inTraits || inStyle || inName || inDesc
    })
  }, [items, normalizedQuery])


  useEffect(() => {
    if (!sentinelRef.current) return
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore(page + 1)
      }
    }, { rootMargin: '200px' })
    io.observe(sentinelRef.current)
    return () => io.disconnect()
  }, [page, sentinelRef.current, language, hasMore])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <TopNav />

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-cinzel gradient-text">{t('gallery.title')}</h1>
          <div className="w-full md:w-96">
            <label className="sr-only" htmlFor="boyfriend-search">{t('gallery.searchLabel')}</label>
            <div className="relative">
              <input
                id="boyfriend-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('gallery.searchPlaceholder')}
                className="w-full rounded-full bg-slate-900/60 border border-slate-700 px-10 py-3 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleItems.map((c, idx) => (
            <CharacterCard key={(c.share_id || `${c.id}-${idx}`)} character={c} />
          ))}
        </div>

        <div ref={sentinelRef} className="h-10" />

        {loading && (
                      <div className="text-center text-slate-400 py-6">{t('common.loading')}</div>
        )}
      </div>
    </div>
  )
}


