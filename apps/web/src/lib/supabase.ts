import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../database.types";
import { getServerEnv } from "./env";

export const createServerSupabaseClient = () => {
  const { supabaseUrl, supabaseKey } = getServerEnv();

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
