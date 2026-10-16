# salmanulfaris.github.io

Personal site and blog, built with [Astro](https://astro.build) + Vue + Tailwind.

## Run locally

```sh
npm install
npm run dev        # http://localhost:4321
```

## Write a post

1. Create `src/content/blog/my-post-title.md` (the file name becomes the URL: `/blog/my-post-title/`).
2. Add front matter at the top:

   ```md
   ---
   title: "My post title"
   description: "One-line summary shown in lists and link previews."
   date: 2026-10-16
   tags: [laravel, vue]
   draft: true      # remove or set to false to publish
   ---
   ```

3. Write in Markdown below it. Images go in `public/img/blog/` and are referenced as `/img/blog/name.png`.
4. Preview with `npm run dev` (drafts are visible locally but not on the live site).
5. Commit and push to the `src` branch. GitHub Actions builds and deploys automatically.

See `src/content/blog/hello-world.md` for a full example.

## Project layout

```
src/
  content/blog/        blog posts (Markdown)
  pages/               routes: /, /blog/, /blog/[slug]/, /rss.xml
  layouts/             page shell, SEO meta tags
  components/app/      portfolio sections (Vue)
  components/ui/       UI components (Vue)
public/                static files served as-is
```
