'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import enMessages from '@/messages/en.json'
import deMessages from '@/messages/de.json'

type Language = 'en' | 'de'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Function to get nested object value by dot notation
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined
  }, obj)
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('de') // Default to German

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
      setLanguageState(savedLanguage)
    } else {
      // Set to German by default if no valid language is saved
      setLanguageState('de')
      localStorage.setItem('language', 'de')
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const messages = language === 'en' ? enMessages : deMessages
    
    // Try to get the translation
    const translation = getNestedValue(messages, key)
    if (translation) {
      return translation
    }
    
    // Fallback to German if translation not found (since German is default)
    if (language !== 'de') {
      const germanTranslation = getNestedValue(deMessages, key)
      if (germanTranslation) {
        return germanTranslation
      }
    }
    
    // Return the key if no translation found
    return key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
