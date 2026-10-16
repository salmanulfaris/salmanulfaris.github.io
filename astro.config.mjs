// @ts-check
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://salmanulfaris.github.io',
  integrations: [vue(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
