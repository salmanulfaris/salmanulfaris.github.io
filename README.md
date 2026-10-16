# salmanulfaris.github.io

Personal site and blog, built with [Astro](https://astro.build) and Tailwind.

## Run locally

```sh
npm install
npm run dev        # http://localhost:4321
```

## Write a post

1. Create a folder for the post in `src/content/blog/`. The folder name becomes the URL:

   ```
   src/content/blog/my-post-title/
     index.md       the post
     cover.jpg      optional cover / thumbnail
   ```

   → `/blog/my-post-title/`

2. Add front matter at the top of `index.md`:

   ```md
   ---
   title: "My post title"
   description: "One-line summary shown in link previews."
   date: 2026-10-16
   tags: [laravel, vue]
   cover: ./cover.jpg                  # optional
   coverAlt: "What the image shows"    # optional
   draft: true                         # remove or set to false to publish
   ---
   ```

3. Write in Markdown below it. Other images can sit in the same folder: `![Alt text](./diagram.png)`.
4. Preview with `npm run dev` (drafts are visible locally but not on the live site).
5. Commit and push to the `src` branch. GitHub Actions builds and deploys automatically.

**Covers:** any size works; 1200×630 is ideal (it's the link-preview size). Images are resized and
converted to WebP at build time. The cover shows as a thumbnail in post lists, at the top of the post,
and as the preview image when the post is shared. Posts without a cover show a blank placeholder.

See `src/content/blog/importing-large-csv-files-in-laravel/` for a full example.

## Project layout

```
src/
  content/blog/        blog posts (Markdown)
  pages/               routes: /, /blog/, /blog/[slug]/, /rss.xml
  layouts/             page shell, SEO meta tags
  components/          header, footer, post list
  styles/global.css    colors, font, light/dark theme
public/                static files served as-is
```
