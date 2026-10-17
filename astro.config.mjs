// @ts-check
import fs from 'node:fs'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import remarkApiBlocks from './src/lib/remark-api-blocks.mjs'

const SITE = 'https://salmanulfaris.github.io'

// Last-modified date for each post URL (`updated`, else `date` from the front matter),
// so search engines know when a post changed. Other pages use the newest post date.
const blogDir = './src/content/blog'
/** @type {Record<string, string>} */
const lastmod = {}
for (const slug of fs.readdirSync(blogDir)) {
  const file = `${blogDir}/${slug}/index.md`
  if (!fs.existsSync(file)) continue
  const front = fs.readFileSync(file, 'utf8').split('---')[1] ?? ''
  if (/^draft:\s*true/m.test(front)) continue
  const date = front.match(/^updated:\s*["']?([^"'\s#]+)/m)?.[1] ?? front.match(/^date:\s*["']?([^"'\s#]+)/m)?.[1]
  if (date) lastmod[`${SITE}/blog/${slug}/`] = new Date(date).toISOString()
}
const newest = Object.values(lastmod).sort().at(-1)

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      serialize(item) {
        const date = lastmod[item.url] ?? newest
        return date ? { ...item, lastmod: date } : item
      },
    }),
  ],
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
