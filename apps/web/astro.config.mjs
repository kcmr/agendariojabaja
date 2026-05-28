import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vue from '@astrojs/vue'
import node from '@astrojs/node'
import vercel from '@astrojs/vercel'

const useNodeAdapter = process.env.ASTRO_ADAPTER === 'node'

// https://astro.build/config
export default defineConfig({
  adapter: useNodeAdapter ? node({ mode: 'standalone' }) : vercel(),
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@repo/components'],
    },
  },
})
