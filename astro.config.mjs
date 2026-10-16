// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import remarkApiBlocks from './src/lib/remark-api-blocks.mjs'

export default defineConfig({
  site: 'https://salmanulfaris.github.io',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkApiBlocks],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
