import type { Metadata } from 'next'

interface PageMetadata {
  title: string
  description: string
  keywords: string
  openGraph: {
    title: string
    description: string
    url: string
  }
  twitter: {
    title: string
    description: string
  }
}

export function getPageMetadata(pathname: string, language: 'en' | 'de' = 'en'): PageMetadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://makemymate.com'
  const currentUrl = `${baseUrl}${pathname}`
  
  const metadata: Record<string, PageMetadata> = {
    '/': {
      title: language === 'de' 
        ? 'Make My Mate - Dein Tor zu magischer Romantik' 
        : 'Make My Mate - Your Gateway to Magical Romance',
      description: language === 'de'
        ? 'Entdecke magische Romantik und Fantasy-Liebe. Dein Tor zu verzaubernden Tools für deine romantischen Fantasien.'
        : 'Discover magical romance and fantasy love. Your gateway to enchanting tools for your romantic fantasies.',
      keywords: language === 'de'
        ? 'fantasy romantik, magische liebe, romantische fantasien, make my mate'
        : 'fantasy romance, magical love, romantic fantasies, make my mate',
      openGraph: {
        title: language === 'de' 
          ? 'Make My Mate - Dein Tor zu magischer Romantik' 
          : 'Make My Mate - Your Gateway to Magical Romance',
        description: language === 'de'
          ? 'Entdecke magische Romantik und Fantasy-Liebe bei Make My Mate'
          : 'Discover magical romance and fantasy love at Make My Mate',
        url: currentUrl
      },
      twitter: {
        title: language === 'de' 
          ? 'Make My Mate - Dein Tor zu magischer Romantik' 
          : 'Make My Mate - Your Gateway to Magical Romance',
        description: language === 'de'
          ? 'Entdecke magische Romantik und Fantasy-Liebe'
          : 'Discover magical romance and fantasy love'
      }
    },
    '/bookboyfriend': {
      title: language === 'de' 
        ? 'Make My Mate - Beschwöre deinen perfekten Buchfreund' 
        : 'Make My Mate - Summon Your Perfect Bookboyfriend',
      description: language === 'de'
        ? 'Erstelle deinen perfekten Fantasy-Liebhaber mit unserem KI-gestützten Charaktergenerator. Beantworte intime Fragen und sieh zu, wie dein Traumpartner zum Leben erwacht.'
        : 'Create your perfect fantasy lover with our AI-powered character generator. Answer intimate questions and watch your dream partner come to life.',
      keywords: language === 'de'
        ? 'buchfreund generator, fantasy charakter, ki generator, romantischer quiz'
        : 'bookboyfriend generator, fantasy character, ai generator, romantic quiz',
      openGraph: {
        title: language === 'de' 
          ? 'Make My Mate - Beschwöre deinen perfekten Buchfreund' 
          : 'Make My Mate - Summon Your Perfect Bookboyfriend',
        description: language === 'de'
          ? 'Erstelle deinen perfekten Fantasy-Liebhaber mit KI'
          : 'Create your perfect fantasy lover with AI',
        url: currentUrl
      },
      twitter: {
        title: language === 'de' 
          ? 'Make My Mate - Beschwöre deinen perfekten Buchfreund' 
          : 'Make My Mate - Summon Your Perfect Bookboyfriend',
        description: language === 'de'
          ? 'Erstelle deinen perfekten Fantasy-Liebhaber'
          : 'Create your perfect fantasy lover'
      }
    },
    '/bookmate-waitlist': {
      title: language === 'de' 
        ? 'Make My Mate - Tritt der Bookmate Warteliste bei' 
        : 'Make My Mate - Join the Bookmate Waitlist',
      description: language === 'de'
        ? 'Sei unter den Ersten, die deinen perfekten Lesebegleiter entdecken. Bookmate wird revolutionieren, wie du Liebesromane entdeckst.'
        : 'Be among the first to discover your perfect reading companion. Bookmate will revolutionize how you discover romance novels.',
      keywords: language === 'de'
        ? 'bookmate, lesebegleiter, liebesromane, warteliste, buchempfehlungen'
        : 'bookmate, reading companion, romance novels, waitlist, book recommendations',
      openGraph: {
        title: language === 'de' 
          ? 'Make My Mate - Tritt der Bookmate Warteliste bei' 
          : 'Make My Mate - Join the Bookmate Waitlist',
        description: language === 'de'
          ? 'Sei unter den Ersten, die deinen perfekten Lesebegleiter entdecken'
          : 'Be among the first to discover your perfect reading companion',
        url: currentUrl
      },
      twitter: {
        title: language === 'de' 
          ? 'Make My Mate - Tritt der Bookmate Warteliste bei' 
          : 'Make My Mate - Join the Bookmate Waitlist',
        description: language === 'de'
          ? 'Entdecke deinen perfekten Lesebegleiter'
          : 'Discover your perfect reading companion'
      }
    },
    '/boyfriends': {
      title: language === 'de' 
        ? 'Make My Mate - Entdecke die Buchfreunde Galerie' 
        : 'Make My Mate - Explore Bookboyfriends Gallery',
      description: language === 'de'
        ? 'Entdecke erstaunliche Fantasy-Charaktere, die von der Community erstellt wurden. Durchsuche und finde deinen perfekten Buchfreund.'
        : 'Discover amazing fantasy characters created by the community. Browse and find your perfect bookboyfriend.',
      keywords: language === 'de'
        ? 'buchfreunde galerie, fantasy charaktere, community, charakter durchsuchen'
        : 'bookboyfriends gallery, fantasy characters, community, character browse',
      openGraph: {
        title: language === 'de' 
          ? 'Make My Mate - Entdecke die Buchfreunde Galerie' 
          : 'Make My Mate - Explore Bookboyfriends Gallery',
        description: language === 'de'
          ? 'Entdecke erstaunliche Fantasy-Charaktere von der Community'
          : 'Discover amazing fantasy characters from the community',
        url: currentUrl
      },
      twitter: {
        title: language === 'de' 
          ? 'Make My Mate - Entdecke die Buchfreunde Galerie' 
          : 'Make My Mate - Explore Bookboyfriends Gallery',
        description: language === 'de'
          ? 'Entdecke Fantasy-Charaktere von der Community'
          : 'Discover fantasy characters from the community'
      }
    }
  }
  
  return metadata[pathname] || metadata['/']
}

export function generateMetadata(pathname: string, language: 'en' | 'de' = 'en'): Metadata {
  const pageMetadata = getPageMetadata(pathname, language)
  
  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    keywords: pageMetadata.keywords,
    authors: [{ name: 'Make My Mate Team' }],
    openGraph: {
      title: pageMetadata.openGraph.title,
      description: pageMetadata.openGraph.description,
      url: pageMetadata.openGraph.url,
      type: 'website',
      locale: language === 'de' ? 'de_DE' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMetadata.twitter.title,
      description: pageMetadata.twitter.description,
    },
  }
}
