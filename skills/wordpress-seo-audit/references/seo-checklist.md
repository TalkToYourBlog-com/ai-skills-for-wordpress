# On-site SEO checklist for WordPress

Use the checks that apply; skip the rest. Thresholds are guidance, not rules; search engines truncate by pixel width, not by character count.

## Indexability (check first)

| Check | Where | Healthy | Problem looks like |
| --- | --- | --- | --- |
| Search visibility | Settings > Reading | "Discourage search engines" **unticked** | ticked on a live site (adds `noindex`) |
| robots.txt | `/robots.txt` | allows crawling of content; points to the sitemap | `Disallow: /` on the live site |
| Sitemap | `/wp-sitemap.xml` or SEO plugin sitemap | lists published posts, pages, categories; returns 200 | 404, empty, or lists noindex pages |
| Meta robots | page source / HTTP headers | no `noindex` on pages that should rank | `noindex` left over from staging |
| Canonical | `<link rel="canonical">` | points to the page itself (or the preferred duplicate) | points to the homepage, another domain or a staging URL |
| Single version | open `http`, `https`, `www`, non-`www` | all redirect (301) to one version | several versions return 200 |
| HTTPS | any page | valid certificate, no mixed content | warnings about insecure resources |
| Pagination, archives | tag, date, author archives | thin archives set to noindex or removed | thousands of thin tag pages indexed |
| Permalinks | Settings > Permalinks | readable (`/post-name/`) | `?p=123` URLs |

## Titles and descriptions

- Title: unique per page, about 50-60 characters, main topic first, brand last.
- Meta description: unique, about 140-155 characters, says what the reader gets; it influences clicks, not rankings.
- Duplicate or default titles ("Home - Site name", "Untitled", "Page 2") are the most common quick win.

## Content structure

- One H1 per page (usually the post title); H2 and H3 in order, no skipping for styling.
- First 100 words say what the page is about.
- Thin pages (a few lines) either get expanded, merged or set to noindex.
- Two pages targeting the same question compete; merge or differentiate.

## Images

- Descriptive file names and alt text that describe what is shown (decorative images: empty alt).
- Sensible dimensions; modern formats (WebP/AVIF) where supported; lazy loading is on by default in WordPress core.

## Links

- Every important page is reachable within three clicks and has internal links pointing to it. Find orphans by comparing the sitemap with pages that receive internal links.
- Anchor text describes the target; avoid "click here".
- Fix broken internal links and long redirect chains (more than one hop).

## Structured data and social

- Article and Organization schema usually come from the SEO plugin; verify with Google's Rich Results Test rather than assuming.
- Open Graph image and title set for share previews.

## Speed and mobile (pointers)

- Core Web Vitals: LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less (field data in Search Console beats lab data).
- The site must be fully usable on a phone.

## Measuring after the fixes

- Search Console > Pages (indexing) for indexed versus excluded counts and reasons.
- Search Console > Performance for clicks, impressions, CTR and queries per page.
- Re-check in 4-6 weeks; do not judge a change after three days.
