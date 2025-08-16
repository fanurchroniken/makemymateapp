'use client'

import { useState, useEffect } from 'react'
import { Crown, Sparkles, Share2, Heart, Eye, ArrowRight, Star, Users, Moon, Zap, Flame, Sword, Shield, BookOpen, Wand2, Sparkle, ArrowUpRight } from 'lucide-react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import TopNav from '@/components/layout/TopNav'
import { Character, getRandomCharacter } from '@/lib/character-service'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

export default function Home() {
  const { t, language } = useLanguage()

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

      {/* Hero Section - Hub Portal */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2100&q=80')`
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
          {/* Brand Logo */}
          <div className="flex justify-center mb-8">
            <img src="/logo-symbol.png" alt="Make My Mate" className="w-24 h-24 drop-shadow-[0_0_20px_rgba(236,72,153,0.35)]" />
          </div>
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
                {t('hub.title')}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 leading-relaxed max-w-4xl mx-auto font-light mb-16">
              <span className="bg-gradient-to-r from-amber-400 via-purple-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                {t('hub.subtitle')}
              </span>
            </p>
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

      

      {/* Tools Hub Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
                  <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cinzel gradient-text mb-6">
            {t('hub.chooseAdventure')}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('hub.adventureSubtitle')}
          </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Bookboyfriend Generator */}
            <div className="group relative">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 to-slate-900/50 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-8">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-cinzel text-white group-hover:text-purple-300 transition-colors">
                      {t('tools.bookboyfriend.title')}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {t('tools.bookboyfriend.description')}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
                        {t('tools.bookboyfriend.features.ai')}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
                        {t('tools.bookboyfriend.features.personality')}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
                        {t('tools.bookboyfriend.features.shareable')}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 text-center">
                    <Link href="/bookboyfriend" className="inline-block">
                      <button className="group/btn relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center space-x-2">
                          <Wand2 className="w-5 h-5 group-hover/btn:animate-pulse" />
                          <span>{t('tools.bookboyfriend.cta')}</span>
                          <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Matching Quiz - Coming Soon */}
            <div className="group relative">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900/50 to-slate-900/50 border border-amber-500/30 hover:border-amber-400/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-8">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-cinzel text-white group-hover:text-amber-300 transition-colors">
                      {t('tools.bookmate.title')}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {t('tools.bookmate.description')}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-sm rounded-full border border-amber-500/30">
                        {t('tools.bookmate.features.coming')}
                      </span>
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-sm rounded-full border border-amber-500/30">
                        {t('tools.bookmate.features.matching')}
                      </span>
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-sm rounded-full border border-amber-500/30">
                        {t('tools.bookmate.features.lists')}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 text-center">
                    <Link href="/bookmate-waitlist" className="inline-block">
                      <button className="group/btn relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center space-x-2">
                          <Sparkle className="w-5 h-5 group-hover/btn:animate-pulse" />
                          <span>{t('tools.bookmate.cta')}</span>
                          <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Future Tool Placeholder */}
            <div className="group relative">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-900/50 to-slate-900/50 border border-rose-500/30 hover:border-rose-400/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-8">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-cinzel text-white group-hover:text-rose-300 transition-colors">
                      {t('tools.future.title')}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {t('tools.future.description')}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <span className="px-3 py-1 bg-rose-500/20 text-rose-300 text-sm rounded-full border border-rose-500/30">
                        {t('tools.future.features.development')}
                      </span>
                      <span className="px-3 py-1 bg-rose-500/20 text-rose-300 text-sm rounded-full border border-rose-500/30">
                        {t('tools.future.features.new')}
                      </span>
                      <span className="px-3 py-1 bg-rose-500/20 text-rose-300 text-sm rounded-full border border-rose-500/30">
                        {t('tools.future.features.tuned')}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 text-center">
                    <button className="group/btn relative overflow-hidden bg-gradient-to-r from-rose-500/50 to-rose-600/50 text-rose-300 px-8 py-4 rounded-full font-bold shadow-lg cursor-not-allowed opacity-60">
                      <span className="relative flex items-center space-x-2">
                        <Sparkles className="w-5 h-5" />
                        <span>{t('tools.future.cta')}</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo-symbol.png" alt="Make My Mate" className="w-6 h-6" />
              <span className="text-white font-cinzel">{t('footer.brandName')}</span>
            </div>
            <div className="flex space-x-6" />
          </div>
        </div>
      </footer>
    </div>
  )
}
