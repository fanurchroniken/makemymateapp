import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a unique session ID
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Format date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Generate hashtags for social media
export function generateHashtags(characterData: any): string[] {
  const baseHashtags = ['#MakeMyMate', '#Romantasy', '#BookBoyfriend']
  const styleHashtags = characterData.style ? [`#${characterData.style}`] : []
  const personalityHashtags = characterData.personality ? [`#${characterData.personality.replace(/\s+/g, '')}`] : []
  
  return [...baseHashtags, ...styleHashtags, ...personalityHashtags]
}

// Create social media share URL
export function createShareUrl(platform: 'twitter' | 'facebook' | 'pinterest', data: any): string {
  const url = encodeURIComponent(data.url)
  const text = encodeURIComponent(data.title)
  
  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${data.hashtags.join(',')}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`
    case 'pinterest':
      return `https://pinterest.com/pin/create/button/?url=${url}&description=${text}&media=${encodeURIComponent(data.imageUrl)}`
    default:
      return ''
  }
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Generate a random quote for character
export function generateQuote(personality: string): string {
  const quotes = [
    "In a world of darkness, you are my light.",
    "Every touch is electric, every glance is fire.",
    "You are the story I never knew I needed.",
    "In your eyes, I see my destiny written in stars.",
    "You are the magic I've been searching for all my life.",
    "Every moment with you feels like a dream come true.",
    "You are the hero of my heart's story.",
    "In your arms, I find my home."
  ]
  
  return quotes[Math.floor(Math.random() * quotes.length)]
}

// Generate a character title
export function generateTitle(personality: string, background: string): string {
  const titles = [
    "The Enigmatic Protector",
    "The Mysterious Guardian",
    "The Passionate Warrior",
    "The Noble Defender",
    "The Charming Rogue",
    "The Loyal Companion",
    "The Fierce Protector",
    "The Gentle Giant"
  ]
  
  return titles[Math.floor(Math.random() * titles.length)]
}
