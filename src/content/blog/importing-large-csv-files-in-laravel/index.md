---
title: "Importing large CSV files in Laravel without running out of memory"
description: "Streaming, chunked inserts and queued jobs: a practical approach to importing millions of rows in Laravel."
date: 2026-10-16
tags: [laravel, php, performance]
cover: ./cover.jpg
coverAlt: "A CSV file being converted into database rows"
---

Sooner or later every Laravel app gets a feature request that sounds simple: *"Can users upload a CSV?"* It works fine with a 200-row test file. Then someone uploads 2 million rows and the request dies with `Allowed memory size exhausted`.

Here's the approach I use to make imports fast, memory-safe and resilient.

## Why the naive version fails

The usual first attempt reads the whole file, loops over it and creates one model per row:

```php
$rows = array_map('str_getcsv', file($path));

foreach ($rows as $row) {
    Customer::create([
        'name'  => $row[0],
        'email' => $row[1],
    ]);
}
```

This has three problems:

1. `file()` loads the **entire file into memory** at once.
2. `Customer::create()` runs **one query per row**, plus model events.
3. It all happens **inside the HTTP request**, so it's capped by the request timeout.

## 1. Stream the file with a lazy collection

`LazyCollection` reads one line at a time using a generator, so memory stays flat no matter how big the file is:

```php
use Illuminate\Support\LazyCollection;

$rows = LazyCollection::make(function () use ($path) {
    $handle = fopen($path, 'r');

    while (($line = fgetcsv($handle)) !== false) {
        yield $line;
    }

    fclose($handle);
});
```

## 2. Insert in chunks

Instead of one `INSERT` per row, batch them. A chunk size of around 1,000 is a good starting point for most databases:

```php
$rows
    ->skip(1) // header row
    ->chunk(1000)
    ->each(function ($chunk) {
        Customer::insert($chunk->map(fn ($row) => [
            'name'       => $row[0],
            'email'      => $row[1],
            'created_at' => now(),
            'updated_at' => now(),
        ])->all());
    });
```

Note that `insert()` skips Eloquent entirely, so model events and casts **won't run**. That's usually what you want for bulk imports, but it's worth knowing.

## 3. Move it to a queue

Finally, take the work out of the request. Store the upload, dispatch a job and return immediately:

```php
public function store(Request $request)
{
    $path = $request->file('csv')->store('imports');

    ImportCustomers::dispatch($path, $request->user());

    return back()->with('status', 'Import started. We’ll email you when it’s done.');
}
```

## Results

On a test file with 1 million rows:

| Approach                   | Time    | Peak memory |
| -------------------------- | ------- | ----------- |
| Naive `create()` per row   | timeout | 1.2 GB+     |
| Lazy collection + `create` | 41 min  | 28 MB       |
| Lazy collection + chunks   | 52 s    | 30 MB       |

> Most of the speed-up comes from chunked inserts. Most of the memory savings come from streaming. You want both.

## Wrapping up

- Stream the file with `LazyCollection` so memory stays constant.
- Batch your inserts with `chunk()` + `insert()`.
- Run the import in a queued job and notify the user when it's done.

For even bigger imports, look at `upsert()` for deduplication, or your database's native bulk loader (like MySQL's `LOAD DATA INFILE`).
