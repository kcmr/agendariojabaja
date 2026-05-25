const DEFAULT_ARCHIVE_RETENTION_DAYS = 60;

const readRequiredEnv = (name: string): string => {
  const value = import.meta.env[name];

  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const readOptionalEnv = (name: string): string | undefined => {
  const value = import.meta.env[name];
  return typeof value === "string" && value.length > 0 ? value : undefined;
};

const readPositiveIntegerEnv = (name: string, fallback: number): number => {
  const value = readOptionalEnv(name);
  if (!value) return fallback;

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    throw new Error(`${name} must be a positive integer`);
  }

  return parsed;
};

export const getServerEnv = () => ({
  supabaseUrl: readRequiredEnv("SUPABASE_URL"),
  supabaseKey:
    readOptionalEnv("SUPABASE_SERVICE_ROLE_KEY") ??
    readOptionalEnv("SUPABASE_PUBLISHABLE_KEY") ??
    readRequiredEnv("SUPABASE_ANON_KEY"),
  eventArchiveRetentionDays: readPositiveIntegerEnv(
    "EVENT_ARCHIVE_RETENTION_DAYS",
    DEFAULT_ARCHIVE_RETENTION_DAYS
  ),
});

export const getPublicEnv = () => ({
  siteUrl: readOptionalEnv("PUBLIC_SITE_URL"),
  kitFormActionUrl: readOptionalEnv("PUBLIC_KIT_FORM_ACTION_URL"),
});
