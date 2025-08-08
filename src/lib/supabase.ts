import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          first_name: string
          last_name: string
          phone: string | null
          created_at: string
          updated_at: string
          email_verified: boolean
          last_login: string | null
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          first_name: string
          last_name: string
          phone?: string | null
          created_at?: string
          updated_at?: string
          email_verified?: boolean
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          created_at?: string
          updated_at?: string
          email_verified?: boolean
          last_login?: string | null
        }
      }
    }
  }
}