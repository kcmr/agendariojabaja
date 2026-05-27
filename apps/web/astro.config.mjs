import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vue from '@astrojs/vue'
import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@repo/components'],
    },
  },
})
