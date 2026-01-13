import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client initialization.
 * Uses CRA env vars: REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY.
 *
 * IMPORTANT: If env vars are missing/empty, we return null and the app will fall back to an in-memory store.
 */
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

/**
 * Convenience helper for environment readiness.
 */
export const isSupabaseConfigured = Boolean(supabase);
