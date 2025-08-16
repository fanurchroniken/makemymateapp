import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Make My Mate - Create Your Perfect Fantasy Character',
  description: 'Discover your ideal romantic fantasy character through our interactive quiz. Create, customize, and share your perfect mate.',
  keywords: 'fantasy character, romantic quiz, character creation, book boyfriend, romance',
  authors: [{ name: 'Make My Mate Team' }],
  icons: {
    icon: '/logo-symbol.png',
    shortcut: '/logo-symbol.png',
    apple: '/logo-symbol.png',
  },
  openGraph: {
    title: 'Make My Mate - Create Your Perfect Fantasy Character',
    description: 'Discover your ideal romantic fantasy character through our interactive quiz.',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/logo-symbol.png' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Make My Mate - Create Your Perfect Fantasy Character',
    description: 'Discover your ideal romantic fantasy character through our interactive quiz.',
    images: ['/logo-symbol.png']
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
