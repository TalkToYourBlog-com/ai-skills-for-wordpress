# On-site SEO checklist, with where to look

Use the checks that apply; skip the rest. Thresholds are guidance, not rules; Google shortens titles by pixel width, not by character count. Everything in the "How to check" column can be done by a non-technical person in a browser.

## Can Google show the site at all? (check first)

| Check | How to check | Healthy | Problem looks like |
| --- | --- | --- | --- |
| Search visibility | wp-admin > Settings > Reading | "Discourage search engines from indexing this site" **unticked** | ticked on a live site |
| Pages blocked by the SEO plugin | Open a post > SEO box > advanced section | "Allow search engines to show this page" is yes | set to noindex |
| One address only | type `http://`, `https://`, with and without `www` in the browser | all end up on the same address | different versions open separately |
| Padlock | open the site | closed padlock, no warnings | "Not secure" or mixed content warnings |
| Sitemap | open `theiraddress.com/wp-sitemap.xml` or the SEO plugin's sitemap | a list of pages appears | not found or empty |
| What Google has | Google search `site:theiraddress.com` | roughly your pages | nothing, or thousands of junk pages |
| Search Console | Pages report | most real pages "Indexed" | many "Excluded" with reasons such as noindex or redirect |
| Address format | Settings > Permalinks | "Post name" | numbers like `?p=123` |

## Titles and descriptions

- Title: unique per page, about 50-60 characters, the topic first, brand last.
- Description: unique, about 140-155 characters, tells the reader what they get. It influences clicks, not rankings.
- Quick check: search `site:theiraddress.com` and look for repeated or default titles.

## Content structure

- One main heading per page (usually the post title), subheadings in order.
- The first paragraph says what the page is about.
- Thin pages (a few lines) should be expanded, merged into a stronger page, or hidden from Google.
- Two pages answering the same question compete; merge or differentiate them.

## Images

- Alt text that describes the picture in one sentence (decorative images: leave empty).
- File size sensible; very large photos slow the page (see the speed skill).
- How to check: Media > Library > open a picture > "Alt Text" field.

## Links

- Each important page is linked from other pages and from the menu.
- Link text says where it goes ("our guide to pricing"), not "click here".
- Broken links: a free online link checker, or a plugin that lists them; fix or remove.

## Extra signals

- Structured data (the little extra info Google shows, like ratings): usually comes from the SEO plugin; test a page in Google's free Rich Results Test.
- Social sharing image set in the SEO plugin.

## Speed and mobile (pointers)

- Target for real visitors: main content loaded in 2.5 s or less, page responds within 0.2 s, no layout jumps.
- Test with PageSpeed Insights (free, paste the address) and look at the section about real users when it exists.

## Measuring afterwards

- Search Console > Pages: indexed versus excluded and the reasons.
- Search Console > Performance: clicks, impressions, average position per page.
- Check again in 4-6 weeks; do not judge a change after three days.
