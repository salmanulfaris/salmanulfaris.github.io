---
title: "Hello, world"
description: "Starting a blog: what I'll write about and how this site works."
date: 2026-10-16
tags: [meta]
draft: true
---

This is a sample post. Copy this file, rename it, and start writing.
The file name becomes the URL, so `hello-world.md` is served at `/blog/hello-world/`.

## Front matter

The block at the top of the file between the `---` lines sets the post's details:

| Field         | Required | What it does                                   |
| ------------- | -------- | ---------------------------------------------- |
| `title`       | yes      | Post title                                     |
| `description` | yes      | One-line summary, used in lists and link previews |
| `date`        | yes      | Publish date, `YYYY-MM-DD`                     |
| `tags`        | no       | A list like `[laravel, vue]`                   |
| `updated`     | no       | Date of the last significant edit              |
| `draft`       | no       | `true` hides the post from the live site       |

## Code

Code blocks are highlighted automatically:

```php
Route::get('/hello', fn () => 'Hello, world');
```

```python
import pandas as pd

df = pd.read_csv("data.csv")
print(df.describe())
```

## Images

Put images in `public/img/blog/` and reference them like this:

```md
![Alt text](/img/blog/my-image.png)
```

> When you're ready, set `draft: false` (or delete the line) and push.
