import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  name: string
  organization: string
  created_at: string
}

export interface DataEntry {
  id: string
  user_id: string
  title: string
  category: string
  location: string
  latitude?: number
  longitude?: number
  description: string
  created_at: string
  time_taken?: number
}
