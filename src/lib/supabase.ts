import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// If credentials are missing, we use a plausible-looking placeholder URL to prevent the 'supabaseUrl is required' error
// This allows the app to boot and show the high-fidelity UI even without a live database.
const finalUrl = (!supabaseUrl || supabaseUrl === 'undefined') ? 'https://project-id-placeholder.supabase.co' : supabaseUrl
const finalKey = (!supabaseAnonKey || supabaseAnonKey === 'undefined') ? 'placeholder-key' : supabaseAnonKey

export const supabase = createClient(finalUrl, finalKey)

export const getSessionUser = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) return { 
      id: session.user.id, 
      email: session.user.email, 
      isDemo: false 
    }

    const demoProfile = localStorage.getItem("urjaloop_profile")
    if (demoProfile) {
      const parsed = JSON.parse(demoProfile)
      return { 
        id: "00000000-0000-0000-0000-000000000000", // Constant demo UUID
        email: "demo@urjaloop.com",
        full_name: parsed.full_name,
        isDemo: true 
      }
    }
    return null
  } catch (e) {
    return null
  }
}
