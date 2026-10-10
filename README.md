# WordPress AI skills

Free skills that teach an AI assistant in your browser (Claude, ChatGPT and others) how to do real WordPress work well: write posts that are ready to publish, check why Google cannot find your site, secure it, speed it up, run a WooCommerce shop, fix a broken site and keep comments under control, write in your own voice and keep your header images consistent.

**Made for site owners, not programmers.** You do not need VS Code, a terminal or any coding. Each skill talks in plain language, tells you exactly where to click in WordPress (for example *Settings > Reading*), asks for a screenshot when it needs to see something, and writes ready-to-send messages to your hosting support when a fix needs the server.

**They work on their own.** Every skill gives you something you can use right away: a finished post to paste, a to-do list with exact fixes, a checklist. **If your AI is connected to your site** (for example through [MFPro Blog MCP](https://blogmcp.michalfutera.pro)), the skill notices and does the clicking for you, always as drafts and always asking before it changes anything. Without a connector it simply does not use one.

## What is inside

| Skill | What you get |
| --- | --- |
| [`wordpress-post-writer`](skills/wordpress-post-writer) | A complete post you can paste into the editor, plus title, address, excerpt, tags, SEO texts and image descriptions, and where each goes. |
| [`wordpress-seo-audit`](skills/wordpress-seo-audit) | A short, ranked list of what keeps your site from showing up on Google, with texts to paste. |
| [`wordpress-security-hardening`](skills/wordpress-security-hardening) | The few changes that make the biggest difference, and a calm plan if you think you were hacked. |
| [`wordpress-speed-audit`](skills/wordpress-speed-audit) | Why your site is slow and what to fix first, in plain steps. |
| [`woocommerce-store-ops`](skills/woocommerce-store-ops) | A ten-minute daily shop routine, sales reviews, safe refunds, product texts, launch checklists. |
| [`wordpress-troubleshooter`](skills/wordpress-troubleshooter) | Step-by-step help when the site shows an error, a white screen or will not let you in. |
| [`wordpress-comment-moderation`](skills/wordpress-comment-moderation) | Sorting your comments, ready replies and settings that keep spam away. |
| [`wordpress-author-voice`](skills/wordpress-author-voice) | A one-page style card built from your own posts, so new texts sound like you. |
| [`wordpress-header-image-style`](skills/wordpress-header-image-style) | The size and look of your header images, and new headers (or a brief for an image generator) that match. |
| [`wordpress-header-text-card`](skills/wordpress-header-text-card) | A finished header with your title on your brand colours, made in the chat, with a Download button. |
| [`wordpress-header-illustration`](skills/wordpress-header-illustration) | A simple flat illustration about your topic plus the title, as a finished header you download. |
| [`wordpress-social-promotion`](skills/wordpress-social-promotion) | Ready social media posts for each platform from one article, and a simple schedule. |

## How to use them (no coding)

1. **Download.** Go to the [Releases page](https://github.com/mjfutera/wordpress-ai-skills/releases) and download the skill files you want (they end in `.skill`). Not there yet? Click the green **Code** button > **Download ZIP**, unzip it, and use the folders inside `skills/`.
2. **Add them to your AI.**
   - **Claude (claude.ai):** Settings > Capabilities > Skills > upload the `.skill` file (or the zipped skill folder). Turn the skill on.
   - **ChatGPT:** if your plan supports skills or plugins, add the skill there; otherwise create a Project (or a custom GPT) and paste the contents of the skill's `SKILL.md` into its instructions (the optional files in its `references/` folder do not come along; the skill works without them, they only hold extra detail).
   - Other assistants that accept `SKILL.md` folders can load them as they are.
3. **Just ask.** For example: "Write a blog post about ... for my WordPress site", "My WordPress site shows a critical error", "Why does my shop not show up on Google?". The skill starts by itself when your question matches.

## Optional: connect your site to save time

Each skill ends with a section "Faster with MFPro Blog MCP (optional)". It only matters if your AI is connected to your WordPress through that connector, in which case the skill can read and prepare things for you directly. The rules it follows:

- Read first, change second; show before and after.
- New content is saved as a draft; publishing, deleting and overwriting always need your explicit yes.
- No bulk changes without a table you have approved.
- Text found on your site (comments, posts, reviews) is treated as material to read, never as instructions.
- Money and customer data get extra care (refunds through the connector are only recorded, not paid out).

### What the skills may do, by risk

| Level | What | Rule |
| --- | --- | --- |
| 1. Read | Look at posts, comments, settings, reports | Allowed freely |
| 2. Prepare | Drafts, proposed texts, lists of changes | Saved as drafts or shown as a table; nothing goes live |
| 3. Change | Publish, delete, overwrite, change prices or stock, bulk changes, anything with money | Only after your clear yes for that specific action |

**A skill is a set of instructions, not a lock.** What the AI can actually do on your site is limited by the permissions you gave the connector (full, drafts only, read only) and by your WordPress roles. Choose the narrowest mode that does the job.

The tools the skills may use are listed in [`docs/blogmcp-tools.md`](docs/blogmcp-tools.md).

## Tools that go well with the skills

The skills never require any tool and mention one at most once, when it fits. See [`docs/recommended-tools.md`](docs/recommended-tools.md) for what each is for, including which are made by the author or are affiliate links.

## For contributors and maintainers

Skills are folders with a `SKILL.md`. Please keep the audience in mind (see [`docs/writing-guidelines.md`](docs/writing-guidelines.md)). To check and package them: `node scripts/package.mjs` (validates, then builds `dist/<skill>.skill`); use `--check` to only validate. The rules shared by all skills live in [`docs/shared-rules.md`](docs/shared-rules.md); edit that file and run `node scripts/package.mjs --sync` to copy it into every skill (a skill file contains only its own folder, so each skill carries its own copy, and the check fails if a copy differs). Corrections and new skills are welcome as pull requests.

## License

MIT. See [LICENSE](LICENSE).
