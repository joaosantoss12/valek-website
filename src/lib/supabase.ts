import { createClient } from '@supabase/supabase-js'

// These are the PUBLIC values from Supabase → Project Settings → API.
// They are safe to ship in the frontend. NEVER put the database password
// or the service_role key here.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// `supabase` is null when env vars are missing — callers fall back to defaults
// so the site still renders during local dev without a configured backend.
export const supabase =
  url && anonKey ? createClient(url, anonKey) : null

export const isSupabaseConfigured = Boolean(url && anonKey)
