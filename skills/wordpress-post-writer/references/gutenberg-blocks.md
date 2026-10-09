# Gutenberg block markup cheat sheet (advanced)

Use this only when the user specifically needs block code (a special layout, or content sent through a connector). Most site owners should simply copy the formatted post text from the chat and paste it into the editor; WordPress turns headings and lists into blocks by itself. Never ask a non-technical user to paste code unless they asked for it.

WordPress stores block content as HTML wrapped in comment delimiters. If the delimiters are missing, the editor shows the content as a single "Classic" block; if an attribute or class is wrong, the editor shows "This block contains unexpected or invalid content". Stick to the patterns below, which are the core block formats.

Paste the result into the Code editor (`Ctrl+Shift+Alt+M` in the post editor) or send it as post content through the REST API.

## Paragraph

```html
<!-- wp:paragraph -->
<p>Text of the paragraph with <strong>bold</strong>, <em>italic</em> and <a href="https://example.com">a link</a>.</p>
<!-- /wp:paragraph -->
```

## Headings

```html
<!-- wp:heading -->
<h2 class="wp-block-heading">Section title</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Subsection title</h3>
<!-- /wp:heading -->
```

`level` defaults to 2 and is omitted for H2. Do not use H1 in the body.

## Lists

```html
<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>First point</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Second point</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->
```

For a numbered list use `<!-- wp:list {"ordered":true} -->` and `<ol class="wp-block-list">...</ol>`.

## Quote

```html
<!-- wp:quote -->
<blockquote class="wp-block-quote"><!-- wp:paragraph -->
<p>Quoted text.</p>
<!-- /wp:paragraph --><cite>Source name</cite></blockquote>
<!-- /wp:quote -->
```

## Image (already in the media library)

```html
<!-- wp:image {"id":123,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://example.com/wp-content/uploads/2026/10/photo.png" alt="Describe what the picture shows" class="wp-image-123"/><figcaption class="wp-element-caption">Optional caption</figcaption></figure>
<!-- /wp:image -->
```

Use the real attachment id and URL. If they are unknown, leave a clearly marked placeholder such as `[IMAGE: description]` instead of inventing an id.

## Table

```html
<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Option</th><th>Price</th></tr></thead><tbody><tr><td>Basic</td><td>9</td></tr><tr><td>Pro</td><td>19</td></tr></tbody></table></figure>
<!-- /wp:table -->
```

## Code

```html
<!-- wp:code -->
<pre class="wp-block-code"><code>wp plugin list --update=available</code></pre>
<!-- /wp:code -->
```

## Button

```html
<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="https://example.com">Call to action</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
```

## Separator and spacer

```html
<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity"/>
<!-- /wp:separator -->
```

## Classic editor or unknown editor

If the user uses the Classic editor or a page builder, give plain HTML (`<h2>`, `<p>`, `<ul>`, `<img alt>`) without comment delimiters; the Classic editor handles it and block comments would show as clutter in some builders.

## Escaping and safety

- Escape `&` as `&amp;` and `<` as `&lt;` in text. Straight quotes inside attribute values must be escaped or avoided.
- Do not paste `<script>` or inline event handlers; they are stripped for most roles and are a security smell.
- Keep external links honest: add `rel="nofollow sponsored"` only to genuinely sponsored or affiliate links.
