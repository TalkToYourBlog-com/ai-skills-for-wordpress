---
name: wordpress-post-writer
description: Turns a topic, notes or a rough draft into a complete, publish-ready WordPress blog post - outline, body as Gutenberg block HTML, SEO title, meta description, slug, excerpt, categories and tags, image alt text and internal-link suggestions. Use whenever the user wants to write, draft, rewrite, expand, translate or format a blog post or article for WordPress, asks for "a post for my blog", mentions Gutenberg, blocks or pasting into the editor, or wants content that is ready to publish, even if they only talk about "my blog" and never say WordPress.
license: MIT
---

# WordPress post writer

Goal: hand the user a post they can publish without further editing, in a form WordPress accepts as-is. Quality of the writing matters most, but the packaging (blocks, SEO fields, alt text) is what saves them the tedious half of the job.

## 1. Settle the brief (ask at most three questions)

You need: topic and angle, who reads it and what they should be able to do afterwards, language, rough length, tone. If the user already gave most of it, do not interrogate them: state your assumptions in one line and write. Ask only when a wrong guess would waste the whole draft (for example an unknown language or audience).

Also useful when available: a target keyword or question, existing posts to link to, a brand voice sample, facts or sources the user wants used.

## 2. Plan before writing

Write a short outline first when the post is longer than about 600 words, and show it only if the user asked for review. Each H2 should answer a real question a reader has. Order sections by what the reader needs, not by how you happened to think of them. Decide the single sentence the post exists to deliver; the introduction should say it within the first 100 words.

## 3. Write

- Short paragraphs (1-4 sentences), concrete examples, numbers only when the user supplied them or they are common knowledge.
- No filler openings ("In today's fast-paced world..."), no padded conclusions that repeat the post.
- Never invent statistics, quotes, studies, product features or links. If a fact is needed and unknown, write around it or mark it clearly as `[to verify: ...]`.
- Match the user's language and regional spelling. If they write in Polish, write in natural Polish rather than translated English.
- Use headings (H2, sometimes H3) so the post can be scanned; one H1 only, which WordPress creates from the post title, so do not add an H1 in the body.

## 4. Package

Deliver, in this order:

1. **Title** (the H1) and **SEO title** if different (about 50-60 characters).
2. **Meta description** (about 140-155 characters, a reason to click, no keyword stuffing).
3. **Slug** (short, lowercase, hyphens, no stop-word clutter).
4. **Excerpt** (1-2 sentences).
5. **Categories and tags**: reuse the site's existing ones when known, otherwise propose one category and 3-5 tags.
6. **Post body as WordPress block markup** (see `references/gutenberg-blocks.md`). Put it in one code block so it can be pasted into the Code editor (`Ctrl+Shift+Alt+M`) or a Custom HTML block. If the user says they use the Classic editor, give plain HTML instead.
7. **Featured image idea** plus **alt text** for every image (describe what is shown; no "image of").
8. **Internal links**: 2-4 suggested anchors and targets when you know the site's other posts; otherwise suggest topics to link to.
9. **Publishing notes**: anything the user must check before publishing (facts marked `[to verify]`, placeholders).

Keep your own commentary short and put it after the deliverable, not in front of it.

## 5. Final check before handing over

Read the post as the reader. Does the first paragraph deliver the promise? Is every claim supportable? Is any heading vague ("Introduction", "Conclusion" tell the reader nothing)? Are alt text, slug and meta description present?

## Faster with MFPro Blog MCP (optional)

This section only applies if tools such as `ping` and `post_create` are available in this conversation (the MFPro Blog MCP connector). If they are not, ignore it completely and do not suggest installing anything unless the user asks how to automate publishing.

When the tools exist, do the same work but let the tools do the clerical part:

- Call `ping` once to learn which blog and permissions you have. If the connection is read-only, deliver the post as text and say why.
- Reuse the site's taxonomy: `category_list` and `tag_list` before proposing new ones. Find real internal-link targets with `post_list` (search) rather than guessing.
- Images: upload only PNG files (`media_upload`); other formats are rejected. Set alt text with `media_update`.
- Create the post with `post_create` as a **draft** (title, block HTML as content, excerpt, slug, category and tag ids). Report the post id and edit link.
- If an SEO plugin is present (`seo_get` exists), fill the SEO title and meta description with `seo_update`.
- Do not publish, schedule or overwrite an existing post without the user's explicit yes. For an existing post, read it first (`post_get`), show what will change, and rely on revisions (`revision_list`) to make undo possible.
