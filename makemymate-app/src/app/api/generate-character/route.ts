import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 API Route called!')
    const { quizAnswers, language } = await request.json()

    // TODO: Replace with your actual Logic Apps workflow URL
    const logicAppsUrl = process.env.LOGIC_APPS_WORKFLOW_URL || 'https://prod-215.westeurope.logic.azure.com:443/workflows/f9c591aae5904ebd9deee0ae8ff0dd3b/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=Oa3rrwfAnY2rLzkqwrl4f5DqAxJadBqwdcckREs3a3A'

    console.log('🔍 Debug: Logic Apps URL:', logicAppsUrl)
    console.log('🔍 Debug: Quiz Answers:', quizAnswers)
    console.log('🔍 Debug: Language:', language)
    console.log('🔍 Debug: All env vars:', Object.keys(process.env).filter(key => key.includes('LOGIC')))

    if (!logicAppsUrl) {
      console.log('❌ Error: Logic Apps workflow URL not configured')
      throw new Error('Logic Apps workflow URL not configured')
    }

    // Prepare the data for Logic Apps
    const requestData = {
      quizAnswers,
      language,
      timestamp: new Date().toISOString(),
      sessionId: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    // Call Logic Apps workflow
    const response = await fetch(logicAppsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    })

    if (!response.ok) {
      throw new Error(`Logic Apps request failed: ${response.status}`)
    }

    const result = await response.json()
    
    console.log('🎯 Logic Apps Response:', result)

    // Parse traits if it's a string
    let traits = result.traits
    if (typeof traits === 'string') {
      try {
        traits = JSON.parse(traits)
      } catch (_err) {
        console.log('⚠️ Could not parse traits string, using as-is')
        traits = [traits]
      }
    }

    // Store character in database for sharing
    console.log('🔍 Attempting to store character in database...')
    const supabase = createServerClient()

    let shareId = null
    try {
      console.log('🔍 Calling insert_character_with_share_id function...')
      console.log('🔍 Character data to store:', {
        name: result.name,
        description: result.description,
        traits: traits,
        personality: result.personality,
        background: result.background,
        imageUrl: result.imageUrl,
        aesthetic: result.aesthetic,
        language: language
      })

      const { data: shareIdData, error: shareError } = await supabase.rpc(
        'insert_character_with_share_id',
        {
          p_session_id: requestData.sessionId,
          p_character_name: result.name,
          p_character_description: result.description,
          p_character_traits: traits,
          p_personality_profile: result.personality,
          p_appearance_description: result.description, // Using description as appearance for now
          p_background_story: result.background,
          p_image_url: result.imageUrl,
          p_image_prompt: '', // Will be filled by Logic Apps
          p_aesthetic_style: result.aesthetic,
          p_language_code: language
        }
      )

      console.log('🔍 Database response:', { shareIdData, shareError })

      if (shareError) {
        console.error('❌ Error storing character:', shareError)
        console.error('❌ Error details:', JSON.stringify(shareError, null, 2))
      } else {
        shareId = shareIdData
        console.log('✅ Character stored with share ID:', shareId)
      }
    } catch (storeError) {
      console.error('❌ Error storing character:', storeError)
      if (storeError instanceof Error) {
        console.error('❌ Error stack:', storeError.stack)
      }
    }

    // Return the generated character data with share URL
    return NextResponse.json({
      success: true,
      character: {
        name: result.name,
        title: result.title,
        description: result.description,
        personality: result.personality,
        background: result.background,
        aesthetic: result.aesthetic,
        traits: traits,
        imageUrl: result.imageUrl,
        shareId: shareId,
        shareUrl: shareId ? `${process.env.NEXT_PUBLIC_APP_URL}/character/${shareId}` : null
      }
    })

  } catch (error) {
    console.error('Error generating character:', error)
    
    // Return fallback character data
    return NextResponse.json({
      success: false,
      character: {
        name: "Prince Lucian",
        title: "The Dark Enchanter",
        description: "A mysterious prince with piercing amber eyes and a troubled past. He's protective, possessive, and willing to burn the world for the one he loves.",
        traits: ["Mysterious", "Protective", "Possessive", "Dark Magic", "Royal Blood"],
        aesthetic: "Gothic Romance",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
        personality: "A brooding prince who hides his vulnerability behind a cold exterior. He's fiercely loyal and protective, with a dark side that only emerges when those he loves are threatened.",
        background: "Born into a cursed royal family, Lucian learned to wield dark magic to protect his kingdom. His heart was hardened by betrayal, until he met someone who could see through his facade."
      }
    })
  }
}
