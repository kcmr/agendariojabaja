import {
  N8N_FORM_SECRET,
  N8N_WEBHOOK_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_URL,
  TURNSTILE_SECRET_KEY,
} from "astro:env/server";
import {
  PUBLIC_KIT_FORM_ACTION_URL,
  PUBLIC_SITE_URL,
  PUBLIC_TURNSTILE_SITE_KEY,
} from "astro:env/client";

const readRequiredValue = (name: string, value: string | undefined): string => {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const getServerEnv = () => ({
  supabaseUrl: SUPABASE_URL,
  supabaseKey:
    SUPABASE_SERVICE_ROLE_KEY ??
    SUPABASE_PUBLISHABLE_KEY ??
    readRequiredValue("SUPABASE_ANON_KEY", SUPABASE_ANON_KEY),
});

export const getPublicEnv = () => ({
  siteUrl: PUBLIC_SITE_URL,
  kitFormActionUrl: readRequiredValue(
    "PUBLIC_KIT_FORM_ACTION_URL",
    PUBLIC_KIT_FORM_ACTION_URL
  ),
  turnstileSiteKey: PUBLIC_TURNSTILE_SITE_KEY,
});

export const getEventSubmissionEnv = () => ({
  n8nWebhookUrl: readRequiredValue("N8N_WEBHOOK_URL", N8N_WEBHOOK_URL),
  n8nFormSecret: readRequiredValue("N8N_FORM_SECRET", N8N_FORM_SECRET),
  turnstileSecretKey: readRequiredValue(
    "TURNSTILE_SECRET_KEY",
    TURNSTILE_SECRET_KEY
  ),
});
