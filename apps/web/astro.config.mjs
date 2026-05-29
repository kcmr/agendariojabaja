import { defineConfig, envField } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vue from '@astrojs/vue'
import node from '@astrojs/node'
import vercel from '@astrojs/vercel'

const useNodeAdapter = process.env.ASTRO_ADAPTER === 'node'

// https://astro.build/config
export default defineConfig({
  adapter: useNodeAdapter ? node({ mode: 'standalone' }) : vercel(),
  env: {
    schema: {
      SUPABASE_URL: envField.string({
        context: 'server',
        access: 'secret',
      }),
      SUPABASE_SERVICE_ROLE_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      SUPABASE_PUBLISHABLE_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      SUPABASE_ANON_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      EVENT_ARCHIVE_RETENTION_DAYS: envField.number({
        context: 'server',
        access: 'public',
        default: 60,
      }),
      N8N_WEBHOOK_URL: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      N8N_FORM_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      PUBLIC_SITE_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_KIT_FORM_ACTION_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@repo/components'],
    },
  },
})
