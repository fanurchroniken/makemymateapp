'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Crown, Share2 } from 'lucide-react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

export function TopNav() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [isSharing, setIsSharing] = useState(false)

  const getShareInfo = () => {
    const baseUrl = window.location.origin
    const currentUrl = `${baseUrl}${pathname}`
    
    switch (pathname) {
      case '/':
        return {
          title: t('share.home.title'),
          text: t('share.home.text'),
          url: currentUrl
        }
      case '/bookboyfriend':
        return {
          title: t('share.bookboyfriend.title'),
          text: t('share.bookboyfriend.text'),
          url: currentUrl
        }
      case '/bookmate-waitlist':
        return {
          title: t('share.bookmate.title'),
          text: t('share.bookmate.text'),
          url: currentUrl
        }
      case '/boyfriends':
        return {
          title: t('share.gallery.title'),
          text: t('share.gallery.text'),
          url: currentUrl
        }
      default:
        return {
          title: t('share.title'),
          text: t('share.text'),
          url: currentUrl
        }
    }
  }

  const handleShare = async () => {
    setIsSharing(true)
    try {
      const shareInfo = getShareInfo()
      const shareText = `${shareInfo.text}\n\n${shareInfo.url}\n\n#MakeMyMate #FantasyCharacter #Romance`
      
      if (navigator.share) {
        await navigator.share({
          title: shareInfo.title,
          text: shareText,
          url: shareInfo.url
        })
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        // Modern clipboard API
        await navigator.clipboard.writeText(shareText)
        alert(t('share.clipboardMessage'))
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = shareText
        document.body.appendChild(textArea)
        textArea.select()
        try {
          document.execCommand('copy')
          alert(t('share.clipboardMessage'))
        } catch (err) {
          console.error('Fallback copy failed:', err)
          alert('Share text: ' + shareText)
        }
        document.body.removeChild(textArea)
      }
    } catch (e) {
      console.error('Share error:', e)
      // Fallback: show the text to copy manually
      const shareInfo = getShareInfo()
      const shareText = `${shareInfo.text}\n\n${shareInfo.url}\n\n#MakeMyMate #FantasyCharacter #Romance`
      alert('Copy this text to share:\n\n' + shareText)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo-symbol.png" alt="Make My Mate" className="w-8 h-8 royal-glow" />
            <h1 className="text-2xl md:text-3xl font-cinzel tracking-wide gradient-text text-glow">{t('footer.brandName')}</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-white hover:text-amber-400 transition-colors">{t('navigation.home')}</Link>
              <Link href="/bookboyfriend" className="text-white hover:text-amber-400 transition-colors">{t('navigation.bookboyfriends')}</Link>
              <Link href="/boyfriends" className="text-white hover:text-amber-400 transition-colors">{t('navigation.gallery')}</Link>
              <Link href="/impressum" className="text-white hover:text-amber-400 transition-colors">{t('navigation.impressum')}</Link>
              <Link href="/datenschutz" className="text-white hover:text-amber-400 transition-colors">{t('navigation.datenschutz')}</Link>
            </nav>
            <button onClick={handleShare} disabled={isSharing} className="p-2 text-white hover:text-amber-400 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNav



