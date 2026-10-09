---
name: wordpress-seo-audit
description: Audits the on-site SEO of a WordPress site and turns the findings into a prioritised fix list with ready-to-paste titles, meta descriptions and settings changes. Works from a URL, sitemap, pasted page list or exports, and needs no plugin access. Use whenever the user asks why their WordPress site or blog does not rank, wants an SEO check, SEO review, SEO cleanup, better titles or meta descriptions, a technical SEO checklist, help with Yoast, Rank Math or All in One SEO, or says traffic dropped or pages are not indexed.
license: MIT
---

# WordPress SEO audit

Goal: find the few problems that actually hold the site back, rank them, and give fixes the owner can apply in minutes. A long list of trivia is a failure; a short list with copy-paste fixes is the product.

## 1. Scope the audit

Ask only what you cannot find out yourself: the site URL, the main topic or business, the language and country, and whether anything specific happened (a redesign, migration, traffic drop). If the user gives a URL, fetch it yourself instead of asking them to describe it.

State plainly what you cannot see without access: Search Console data (indexing, queries), analytics, server logs. Offer to use exports if they have them (Search Console Performance and Pages CSVs are ideal), but do not block on them.

## 2. Gather evidence

When you can fetch pages, look at, in this order:

1. Homepage, `/robots.txt`, `/wp-sitemap.xml` (core sitemap) or the SEO plugin's sitemap, and 5-10 representative pages (top posts, a category page, a key landing page).
2. The settings that silently kill SEO: Settings > Reading > "Discourage search engines" ticked, a `noindex` meta tag or `X-Robots-Tag`, a `robots.txt` that disallows `/`, wrong canonicals, mixed `www`/non-`www` or `http`/`https` versions that all resolve.
3. Per page: title, meta description, H1 and heading order, canonical, image alt text, internal links in and out, word count, duplicate or near-duplicate titles.

If you cannot fetch anything, ask the user to paste the page source or a list of URLs with titles, and say which conclusions are therefore unverified.

The detailed checklist, with thresholds and what each check means, is in `references/seo-checklist.md`. Read it when you need the criteria.

## 3. Rank the findings

Score each finding by **impact** (could it keep pages out of the index or cost clicks?) and **effort** (minutes, hours, days). Report in tiers:

- **Blockers**: indexability problems (noindex, robots, broken sitemap, canonical pointing elsewhere, site not loading over HTTPS).
- **Quick wins**: weak or duplicate titles and meta descriptions, missing alt text, orphan pages, thin tag/archive pages, redirect chains.
- **Longer work**: content gaps, topical structure, internal linking plan, speed (point to the `wordpress-speed-audit` skill if available).

Do not pad. If the site is healthy in an area, say so in one line and move on.

## 4. Deliver

Use this structure:

1. **Summary**: two or three sentences, the biggest problem first.
2. **Blockers and quick wins table**: page or setting, problem, fix, effort, expected impact.
3. **Copy-paste fixes**: for each weak page give the current title and meta, then a proposed title (50-60 characters) and meta description (140-155 characters) with the character count. Keep the brand name at the end of the title only when it fits.
4. **Settings to change**, with the exact path in wp-admin (for example "Settings > Reading > untick Discourage search engines") or the exact line for `robots.txt`.
5. **What to measure** in 4-6 weeks and where (Search Console report names).

Never promise rankings. SEO changes take weeks, and you should say which fixes help indexing immediately and which only help over time.

## Common mistakes to avoid

- Changing slugs of ranking posts without a 301 redirect.
- Stuffing the keyword into every heading. Rewrite for the reader first.
- Proposing the same meta description for several pages.
- Recommending an SEO plugin swap when the existing one is fine.

## Faster with MFPro Blog MCP (optional)

Applies only if tools such as `ping`, `post_list` and `seo_get` are available in this conversation (the MFPro Blog MCP connector). Otherwise ignore this section and do not suggest installing anything.

With the tools, replace the manual gathering with a full inventory:

- `ping`, then `post_list` and `page_list` (paginate through everything published) to list titles, slugs and dates.
- `seo_get` per item (only exists when Yoast, Rank Math or All in One SEO is installed) to read SEO titles and meta descriptions; compute length, duplicates and missing values yourself.
- `media_list` to find images without alt text; `settings_get` for the site settings that affect indexing.
- Produce the same report, plus a table of exact before/after values.
- Apply fixes only after the user approves them, in batches of about 10, with `seo_update` and `media_update`. Show the old value next to the new one so each change can be reverted. Never mass-edit content or slugs; slugs need redirects and should be changed by the owner.
