export interface CharacterPrompt {
  personality: string
  appearance: string
  background: string
  style: string
}

export interface LogicAppsResponse {
  imageUrl: string
  characterDescription: string
  title: string
  quote: string
}

export async function generateCharacterImage(prompt: CharacterPrompt): Promise<LogicAppsResponse> {
  const logicAppsUrl = process.env.LOGIC_APPS_ENDPOINT_URL!
  
  if (!logicAppsUrl) {
    throw new Error('Logic Apps endpoint URL not configured')
  }

  // Create the prompt for the AI model
  const fullPrompt = createCharacterPrompt(prompt)
  
  try {
    const response = await fetch(logicAppsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        model: 'flux', // Replicate Flux model
        style: prompt.style || 'romantasy'
      })
    })

    if (!response.ok) {
      throw new Error(`Logic Apps request failed: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      imageUrl: data.imageUrl,
      characterDescription: data.description,
      title: data.title,
      quote: data.quote
    }
  } catch (error) {
    console.error('Error generating character image:', error)
    throw new Error('Failed to generate character image')
  }
}

function createCharacterPrompt(prompt: CharacterPrompt): string {
  return `Create a romantic fantasy character portrait with the following characteristics:

Personality: ${prompt.personality}
Appearance: ${prompt.appearance}
Background: ${prompt.background}
Style: ${prompt.style}

Generate a beautiful, detailed portrait of a male character that would appeal to romantasy readers. The image should be high quality, romantic, and suitable for social media sharing.`
}
