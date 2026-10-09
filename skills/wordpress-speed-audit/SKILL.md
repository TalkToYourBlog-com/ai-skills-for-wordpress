---
name: wordpress-speed-audit
description: Diagnoses why a WordPress site is slow and produces a ranked fix plan covering hosting and TTFB, caching, images, plugins, theme, fonts, scripts and the database, measured against Core Web Vitals. Use whenever the user says their WordPress site, blog or shop is slow, asks about PageSpeed or Lighthouse scores, Core Web Vitals, LCP, CLS or INP, wants caching or image optimisation advice, asks which plugin makes the site heavy, or wants a faster site before a launch or campaign.
license: MIT
---

# WordPress speed audit

Goal: find the one to three causes that account for most of the slowness and fix those first. Chasing a perfect score on every metric costs far more than it returns; a site that loads in under three seconds on a mid-range phone for real visitors is the target.

## 1. Measure before touching anything

Slowness has different causes depending on where it shows up, so identify that first.

- **Server slow** (high time to first byte, over about 600 ms uncached): hosting, PHP version, missing page cache, slow database queries, heavy plugins running on every request.
- **Page heavy** (large page weight, big images, many requests): images, fonts, third-party scripts, sliders, page builders.
- **Page janky** (layout jumps, delayed interaction): CLS and INP problems from ads, embeds, late-loading fonts and large JavaScript bundles.
- **Only the admin or checkout slow**: usually not cacheable; plugins, database size, object cache and hosting resources matter most.

Ask the user for a PageSpeed Insights report (or run one yourself if you can fetch it), the **field data** section if present (real visitors) rather than only the lab score, and which pages matter (homepage, a top post, the shop). Note that lab scores vary between runs; compare several runs.

Targets (field data, 75th percentile): LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less.

## 2. Work through the usual suspects, cheapest wins first

1. **Page cache**: is full-page caching on (host-level cache or a caching plugin)? One caching layer is enough; two fight each other.
2. **PHP version**: use a currently supported version; the upgrade alone is often a measurable gain. Test on staging first.
3. **Images**: the biggest single win on most blogs. Resize to the displayed size, compress, serve WebP or AVIF, give images width and height to avoid layout shift, do not lazy-load the main (LCP) image, preload it if needed.
4. **Plugins**: measure, do not guess. Disable one suspect at a time on staging or use a profiler such as Query Monitor to see slow queries and which plugin runs them. Replace heavy multipurpose plugins with lighter ones only when the numbers justify it.
5. **Theme and page builder**: heavy builders and sliders cost real milliseconds; check the largest scripts and styles actually used on the page.
6. **Fonts**: limit families and weights, self-host, `font-display: swap`, preload the main one.
7. **Third-party scripts**: chat widgets, tag managers, social embeds, trackers; load after interaction or remove what nobody reads.
8. **Database**: autoloaded options can bloat every request (check their total size), old revisions, expired transients, leftover tables from removed plugins. Clean with a backup first.
9. **Object cache** (Redis or Memcached) when the site is dynamic (shop, membership, heavy queries).
10. **CDN** for static assets and global audiences; it does not fix a slow origin.

Details and commands are in the sections below.

## 3. Useful checks

```bash
wp --info                                    # PHP version and environment
wp option list --autoload=on --fields=option_name --format=count   # autoloaded options count
wp transient delete --expired
wp post list --post_type=revision --format=count
wp plugin list --status=active --fields=name,version
```

Autoloaded data over roughly 1 MB is a warning sign; find the biggest entries before deleting anything, because some belong to active plugins.

## 4. Deliver

1. **What is slow and for whom**: one paragraph with the measured numbers (TTFB, LCP element, page weight).
2. **Ranked plan**: table with action, expected gain (large, medium, small), effort, risk, and how to verify.
3. **Do this first**: the top three actions with exact steps for the user's hosting or plugin set when known.
4. **Re-test instructions**: same page, same tool, three runs, field data after 28 days.

Be honest about what will not help (for example a CDN will not fix a slow database) and about risk (database cleanup, cache exclusions for cart and checkout on shops).

## Faster with MFPro Blog MCP (optional)

Applies only if tools such as `ping` and `plugin_list` are available in this conversation (the MFPro Blog MCP connector). Otherwise ignore this section and do not suggest installing anything.

With the tools you can inventory the site instead of asking:

- `plugin_list` and `theme_list` for active plugins and versions; flag known heavy categories (sliders, page builders, related-posts and statistics plugins running queries on every page).
- `media_list` to find oversized or very numerous images; `settings_get` for site settings.
- The connector cannot measure speed, change server configuration or run database cleanups. Report findings and give the steps; the owner performs them. Do not deactivate plugins through the connector as an experiment on a live site.
