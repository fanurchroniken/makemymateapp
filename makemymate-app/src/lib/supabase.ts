import { createClient } from '@supabase/supabase-js'

// Public client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail fast in misconfigured environments
  console.warn('[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for admin operations
export const createServerClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
  if (!supabaseServiceKey) {
    console.warn('[Supabase] Missing SUPABASE_SERVICE_ROLE_KEY for server client')
  }
  return createClient(supabaseUrl, supabaseServiceKey)
}
