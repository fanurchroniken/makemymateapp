'use client'

import { useState, useEffect } from 'react'
import { Crown, Sparkles, Heart, Eye, ArrowRight, Star, Users, Moon, Zap, Flame, Sword, Shield } from 'lucide-react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import TopNav from '@/components/layout/TopNav'
import { CharacterGallery } from '@/components/CharacterGallery'
import { Character, getCharacterCount, getRandomCharacter } from '@/lib/character-service'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

export default function BookboyfriendPage() {
  const { t, language } = useLanguage()
  const [characterCount, setCharacterCount] = useState(0)
  const [randomCharacter, setRandomCharacter] = useState<Character | null>(null)
  useEffect(() => {
    const loadData = async () => {
      try {
        const [count, random] = await Promise.all([
          getCharacterCount(language),
          getRandomCharacter(language)
        ])
        setCharacterCount(count)
        setRandomCharacter(random)
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }
    loadData()
  }, [language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-amber-900/10" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-amber-400 rounded-full animate-ping delay-1000" />
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping delay-2000" />
          <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-amber-400 rounded-full animate-ping delay-3000" />
        </div>
      </div>

      {/* Sticky Header */}
      <TopNav />

      {/* Hero Section - Redesigned with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/70 to-slate-950/95" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-amber-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-amber-400/20 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-amber-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-2000" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Decorative Top Element */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
              <div className="flex items-center space-x-2">
                <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
                <Sword className="w-5 h-5 text-purple-400 animate-pulse delay-300" />
                <Shield className="w-5 h-5 text-rose-400 animate-pulse delay-600" />
              </div>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </div>

          {/* Main Headline with Romantic Font */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-romantic gradient-text leading-none tracking-wide mb-8">
              <span className="block transform hover:scale-105 transition-transform duration-500">
                {t('hero.title')}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 leading-relaxed max-w-4xl mx-auto font-light mb-16">
              <span className="bg-gradient-to-r from-amber-400 via-purple-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                {t('hero.subtitle')}
              </span>
            </p>
          </div>

          {/* CTA Button with Better Spacing */}
          <div className="flex justify-center">
            <Link href="/quiz">
              <button className="group relative overflow-hidden bg-gradient-to-r from-amber-500 via-purple-600 via-rose-500 to-amber-500 text-white px-14 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-amber-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-purple-500 via-rose-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center space-x-3">
                  <Sparkles className="w-6 h-6 group-hover:animate-spin transition-transform" />
                  <span>{t('hero.cta')}</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </Link>
          </div>

          {/* Decorative Bottom Element */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-400" />
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-purple-400 animate-pulse" />
                <Star className="w-5 h-5 text-amber-400 animate-pulse delay-300" />
                <Heart className="w-5 h-5 text-rose-400 animate-pulse delay-600" />
              </div>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-400" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <section className="py-8 border-y border-slate-700/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Users className="w-5 h-5 text-amber-400" />
            <span className="text-lg text-white">
              <span className="font-bold text-amber-400">{characterCount.toLocaleString()}</span> {t('credibility.counter')}
            </span>
          </div>
        </div>
      </section>

      {/* Character Gallery */}
      <section id="gallery" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-cinzel gradient-text mb-4">
              {t('gallery.title')}
            </h2>
            <p className="text-lg text-slate-300">
              {t('gallery.subtitle')}
            </p>
          </div>

          <CharacterGallery maxItems={4} showLoadMore={false} />

          <div className="text-center mt-8">
            <Link href="/boyfriends" className="inline-block">
              <button className="dark-glam-button px-8 py-3">
                {t('gallery.exploreCta')}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Three-Step Explainer */}
      <section className="py-16 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-cinzel gradient-text text-center mb-12">
              {t('steps.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-cinzel text-white">{t('steps.step1.title')}</h3>
                <p className="text-slate-300">{t('steps.step1.description')}</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-cinzel text-white">{t('steps.step2.title')}</h3>
                <p className="text-slate-300">{t('steps.step2.description')}</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-cinzel text-white">{t('steps.step3.title')}</h3>
                <p className="text-slate-300">{t('steps.step3.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Scene */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-4 h-4 bg-amber-400 rounded-full" />
          <div className="absolute top-20 right-20 w-2 h-2 bg-amber-400 rounded-full" />
          <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-amber-400 rounded-full" />
          <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-amber-400 rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-400 rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-cinzel gradient-text">
              {t('closing.title')}
            </h2>
            <Link href="/quiz">
              <button className="dark-glam-button text-xl px-12 py-6 group">
                <span className="flex items-center space-x-3">
                  <Crown className="w-6 h-6 group-hover:animate-pulse" />
                  <span>{t('closing.cta')}</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="w-6 h-6 gradient-text royal-glow" />
              <span className="text-white font-cinzel">{t('footer.brandName')}</span>
            </div>
            <div className="flex space-x-6" />
          </div>
        </div>
      </footer>
    </div>
  )
}
