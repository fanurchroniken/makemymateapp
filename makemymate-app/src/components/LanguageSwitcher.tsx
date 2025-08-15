'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/Button'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en')
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      className="flex items-center space-x-2 hover:border-amber-400 hover:text-amber-400 transition-colors"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">{language.toUpperCase()}</span>
    </Button>
  )
}
