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
   Posts are listed newest first by `date`. To order two posts on the same day, add a time:
   `date: 2026-10-16T18:30`.
4. Preview with `npm run dev` (drafts are visible locally but not on the live site).
5. Commit and push to the `src` branch. GitHub Actions builds and deploys automatically.

**Covers:** any size works; 1200×630 is ideal (it's the link-preview size). Images are resized and
converted to WebP at build time. The cover shows as a thumbnail in post lists, at the top of the post,
and as the preview image when the post is shared. Covers are optional: without one, the post shows
just its title and date, and link previews use the profile photo.

See `src/content/blog/importing-large-csv-files-in-laravel/` for a full example.

## API requests and code blocks

Write an API request as a fenced block with the language `api`, like a raw HTTP request:
the method and full URL on the first line, optional headers, a blank line, then an optional body.

````md
```api
POST https://{gateway-host}/api/rest/version/100/merchant/{merchantId}/session
Authorization: Basic base64(merchant.{merchantId}:{apiPassword})
Content-Type: application/json

{
    "apiOperation": "INITIATE_CHECKOUT"
}
```
````

It renders as a card with a colored method badge, the URL (base URL muted, `{params}` highlighted,
copy button), the headers and the highlighted body. A `GET` with no body is just the first line
(plus headers if you want).

Add a caption to any code block with `title="..."`, handy for responses:

````md
```json title="Response"
{ "result": "SUCCESS" }
```
````

The `api` blocks and titles come from `src/lib/remark-api-blocks.mjs`; styles are at the end of
`src/styles/global.css`.

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
