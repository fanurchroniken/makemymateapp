import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, role, consent } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !role || !consent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('bookmate_waitlist')
      .select('id')
      .eq('email', email)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected for new emails
      console.error('Error checking existing user:', checkError)
      return NextResponse.json(
        { error: 'Database error while checking email' },
        { status: 500 }
      )
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Insert new waitlist entry
    const { data, error } = await supabase
      .from('bookmate_waitlist')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        role: role,
        consent: consent,
        created_at: new Date().toISOString()
      })
      .select()

    if (error) {
      console.error('Supabase error:', error)
      
      // If table doesn't exist, provide helpful error
      if (error.code === '42P01') {
        return NextResponse.json(
          { error: 'Service temporarily unavailable. Please try again later.' },
          { status: 500 }
        )
      }
      
      // Handle constraint violations (duplicate email)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Thank you for your interest! You\'re already on our waitlist.' },
          { status: 409 }
        )
      }
      
      // Handle check constraint violations
      if (error.code === '23514') {
        return NextResponse.json(
          { error: 'Please select a valid role (Reader or Author).' },
          { status: 400 }
        )
      }
      
      // Generic error for other database issues
      return NextResponse.json(
        { error: 'Something went wrong. Please try again in a moment.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined waitlist',
        data 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Get waitlist statistics
    const { data: readers, error: readersError } = await supabase
      .from('bookmate_waitlist')
      .select('id')
      .eq('role', 'reader')

    const { data: authors, error: authorsError } = await supabase
      .from('bookmate_waitlist')
      .select('id')
      .eq('role', 'author')

    const { count: total, error: totalError } = await supabase
      .from('bookmate_waitlist')
      .select('*', { count: 'exact', head: true })

    // If table doesn't exist, return zeros
    if (readersError?.code === '42P01' || authorsError?.code === '42P01' || totalError?.code === '42P01') {
      console.log('Bookmate waitlist table does not exist yet')
      return NextResponse.json({
        stats: {
          readers: 0,
          authors: 0,
          total: 0
        }
      })
    }

    // Handle other errors
    if (readersError || authorsError || totalError) {
      console.error('Error fetching waitlist stats:', { readersError, authorsError, totalError })
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      stats: {
        readers: readers?.length || 0,
        authors: authors?.length || 0,
        total: total || 0
      }
    })

  } catch (error) {
    console.error('Waitlist stats API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
