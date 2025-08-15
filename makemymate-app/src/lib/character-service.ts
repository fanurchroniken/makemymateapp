import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface Character {
  id: number
  share_id: string
  character_name: string
  character_description: string
  character_traits: string[]
  personality_profile: any
  appearance_description: string
  background_story: string
  image_url: string
  aesthetic_style: string
  share_count: number
  like_count: number
  view_count: number
  language_code: string
  created_at: string
}

// Sample characters for testing when no characters are found in database
const sampleCharacters: Record<string, Character[]> = {
  en: [
    {
      id: 1,
      share_id: 'sample1',
      character_name: 'Prince Lucian',
      character_description: 'A mysterious prince with piercing amber eyes and a troubled past. He\'s protective, possessive, and willing to burn the world for the one he loves.',
      character_traits: ['Mysterious', 'Protective', 'Possessive', 'Dark Magic', 'Royal Blood'],
      personality_profile: null,
      appearance_description: 'Dark hair, amber eyes, regal bearing',
      background_story: 'Born into a cursed royal family, Lucian learned to wield dark magic to protect his kingdom.',
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
      aesthetic_style: 'Gothic Romance',
      share_count: 42,
      like_count: 156,
      view_count: 892,
      language_code: 'en',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      share_id: 'sample2',
      character_name: 'Lord Sebastian',
      character_description: 'A brooding nobleman with a heart of ice and a touch that burns. He\'s been hurt before, but you might be the one to melt his frozen heart.',
      character_traits: ['Brooding', 'Noble', 'Damaged', 'Intense', 'Mysterious'],
      personality_profile: null,
      appearance_description: 'Tall, dark, and dangerously handsome with stormy gray eyes',
      background_story: 'Once a celebrated war hero, Sebastian returned home to find his family destroyed by betrayal.',
      image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
      aesthetic_style: 'Dark Romance',
      share_count: 38,
      like_count: 142,
      view_count: 756,
      language_code: 'en',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      share_id: 'sample3',
      character_name: 'Kael the Shadow',
      character_description: 'A rogue with a mysterious past and eyes that see into your soul. He\'s dangerous, unpredictable, and utterly irresistible.',
      character_traits: ['Rogue', 'Mysterious', 'Dangerous', 'Charismatic', 'Broken'],
      personality_profile: null,
      appearance_description: 'Lean and athletic with dark hair and piercing green eyes',
      background_story: 'A former assassin who found redemption in the most unlikely place - love.',
      image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
      aesthetic_style: 'Mystic Realms',
      share_count: 29,
      like_count: 98,
      view_count: 634,
      language_code: 'en',
      created_at: new Date().toISOString()
    }
  ],
  de: [
    {
      id: 4,
      share_id: 'sample4',
      character_name: 'Prinz Lucian',
      character_description: 'Ein mysteriöser Prinz mit durchdringenden bernsteinfarbenen Augen und einer schwierigen Vergangenheit. Er ist beschützend, besitzergreifend und bereit, die Welt für die zu verbrennen, die er liebt.',
      character_traits: ['Mysteriös', 'Beschützend', 'Besitzergreifend', 'Dunkle Magie', 'Königliches Blut'],
      personality_profile: null,
      appearance_description: 'Dunkles Haar, bernsteinfarbene Augen, königliche Haltung',
      background_story: 'Geboren in eine verfluchte königliche Familie, lernte Lucian, dunkle Magie zu beherrschen, um sein Königreich zu schützen.',
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
      aesthetic_style: 'Gothic Romance',
      share_count: 42,
      like_count: 156,
      view_count: 892,
      language_code: 'de',
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      share_id: 'sample5',
      character_name: 'Lord Sebastian',
      character_description: 'Ein grüblerischer Adliger mit einem Herzen aus Eis und einer Berührung, die brennt. Er wurde schon einmal verletzt, aber du könntest diejenige sein, die sein gefrorenes Herz schmilzt.',
      character_traits: ['Grüblerisch', 'Adlig', 'Verletzt', 'Intensiv', 'Mysteriös'],
      personality_profile: null,
      appearance_description: 'Groß, dunkel und gefährlich gutaussehend mit stürmischen grauen Augen',
      background_story: 'Einst ein gefeierter Kriegsheld, kehrte Sebastian nach Hause zurück, um seine Familie durch Verrat zerstört zu finden.',
      image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
      aesthetic_style: 'Dark Romance',
      share_count: 38,
      like_count: 142,
      view_count: 756,
      language_code: 'de',
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      share_id: 'sample6',
      character_name: 'Kael der Schatten',
      character_description: 'Ein Schurke mit einer mysteriösen Vergangenheit und Augen, die in deine Seele blicken. Er ist gefährlich, unberechenbar und völlig unwiderstehlich.',
      character_traits: ['Schurke', 'Mysteriös', 'Gefährlich', 'Charismatisch', 'Gebrochen'],
      personality_profile: null,
      appearance_description: 'Schlank und athletisch mit dunklem Haar und durchdringenden grünen Augen',
      background_story: 'Ein ehemaliger Attentäter, der Erlösung an dem unwahrscheinlichsten Ort fand - in der Liebe.',
      image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
      aesthetic_style: 'Mystic Realms',
      share_count: 29,
      like_count: 98,
      view_count: 634,
      language_code: 'de',
      created_at: new Date().toISOString()
    }
  ]
}

export async function getPublicCharacters(limit: number = 20, language: string = 'de'): Promise<Character[]> {
  try {
    console.log(`Fetching characters for language: ${language}`)
    
    const { data, error } = await supabase
      .from('generated_characters')
      .select(`
        id,
        share_id,
        character_name,
        character_description,
        character_traits,
        personality_profile,
        appearance_description,
        background_story,
        image_url,
        aesthetic_style,
        share_count,
        like_count,
        view_count,
        language_code,
        created_at
      `)
      .eq('is_public', true)
      .eq('language_code', language)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching characters:', error)
      // Return sample characters if database error
      return sampleCharacters[language]?.slice(0, limit) || sampleCharacters.de.slice(0, limit)
    }

    const characters = data?.map(char => ({
      ...char,
      character_traits: Array.isArray(char.character_traits) 
        ? char.character_traits 
        : typeof char.character_traits === 'string' 
          ? [char.character_traits]
          : []
    })) || []

    console.log(`Found ${characters.length} characters in database for language: ${language}`)

    // If no characters found, return sample characters
    if (characters.length === 0) {
      console.log('No characters found in database, using sample characters')
      return sampleCharacters[language]?.slice(0, limit) || sampleCharacters.de.slice(0, limit)
    }

    return characters
  } catch (error) {
    console.error('Error in getPublicCharacters:', error)
    // Return sample characters on error
    return sampleCharacters[language]?.slice(0, limit) || sampleCharacters.de.slice(0, limit)
  }
}

export async function getCharacterCount(language: string = 'de'): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('generated_characters')
      .select('*', { count: 'exact', head: true })
      .eq('is_public', true)
      .eq('language_code', language)

    if (error) {
      console.error('Error fetching character count:', error)
      return sampleCharacters[language]?.length || sampleCharacters.de.length
    }

    return count || sampleCharacters[language]?.length || sampleCharacters.de.length
  } catch (error) {
    console.error('Error in getCharacterCount:', error)
    return sampleCharacters[language]?.length || sampleCharacters.de.length
  }
}

export async function getRandomCharacter(language: string = 'de'): Promise<Character | null> {
  try {
    const { data, error } = await supabase
      .from('generated_characters')
      .select(`
        id,
        share_id,
        character_name,
        character_description,
        character_traits,
        personality_profile,
        appearance_description,
        background_story,
        image_url,
        aesthetic_style,
        share_count,
        like_count,
        view_count,
        language_code,
        created_at
      `)
      .eq('is_public', true)
      .eq('language_code', language)
      .order('created_at', { ascending: false })
      .limit(1)

    if (error || !data || data.length === 0) {
      // Return a random sample character if no database characters
      const sampleChars = sampleCharacters[language] || sampleCharacters.de
      const randomIndex = Math.floor(Math.random() * sampleChars.length)
      return sampleChars[randomIndex]
    }

    const char = data[0]
    return {
      ...char,
      character_traits: Array.isArray(char.character_traits) 
        ? char.character_traits 
        : typeof char.character_traits === 'string' 
          ? [char.character_traits]
          : []
    }
  } catch (error) {
    console.error('Error in getRandomCharacter:', error)
    // Return a random sample character on error
    const sampleChars = sampleCharacters[language] || sampleCharacters.de
    const randomIndex = Math.floor(Math.random() * sampleChars.length)
    return sampleChars[randomIndex]
  }
}
