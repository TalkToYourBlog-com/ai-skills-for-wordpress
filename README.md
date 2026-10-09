# WordPress AI skills

Free, practical skills that teach an AI assistant (Claude, ChatGPT, Cursor and any agent that reads `SKILL.md` files) how to do real WordPress work well: writing posts that are ready to publish, auditing SEO, hardening security, speeding up a slow site, running a WooCommerce shop, fixing a broken site and moderating comments.

**They work on their own.** Every skill produces something you can use without any connector: ready-to-paste block markup, checklists, copy-paste titles and descriptions, WP-CLI commands, click paths in wp-admin.

**They get faster with a connector, but never depend on one.** If your AI app is connected to your site (for example through [MFPro Blog MCP](https://blogmcp.michalfutera.pro)), each skill notices the tools and does the clerical part for you, always as drafts and always asking before it changes anything. If no tools are available, the skill simply does not use them and does not mention them.

## Skills

| Skill | What it gives you |
| --- | --- |
| [`wordpress-post-writer`](skills/wordpress-post-writer) | A complete post: outline, body as Gutenberg blocks, SEO title, meta description, slug, excerpt, tags, alt text, internal links. |
| [`wordpress-seo-audit`](skills/wordpress-seo-audit) | A ranked list of the SEO problems that matter, with copy-paste fixes. |
| [`wordpress-security-hardening`](skills/wordpress-security-hardening) | A prioritised hardening plan with commands, and a cleanup procedure if the site may be hacked. |
| [`wordpress-speed-audit`](skills/wordpress-speed-audit) | Why the site is slow and what to fix first, measured against Core Web Vitals. |
| [`woocommerce-store-ops`](skills/woocommerce-store-ops) | A daily shop routine, reports, safe refund handling, launch and maintenance checklists. |
| [`wordpress-troubleshooter`](skills/wordpress-troubleshooter) | Step-by-step diagnosis for white screens, 500 errors, login loops, 404s and plugin conflicts. |
| [`wordpress-comment-moderation`](skills/wordpress-comment-moderation) | Triage of the comment queue, drafted replies, and settings that keep spam away. |

## Install

**Claude (claude.ai and desktop apps):** run `node scripts/package.mjs` to build `dist/<skill>.skill` files (or zip a skill folder yourself) and add them in Settings > Capabilities > Skills.

**Claude Code:** copy the folders from `skills/` into `~/.claude/skills/` (all projects) or `.claude/skills/` (one project).

**Other agents:** any tool that supports the `SKILL.md` format (a folder with a `SKILL.md` that has `name` and `description` in its frontmatter) can load these folders as they are. For ChatGPT, skills go in the `skills/` folder of a plugin package.

Each skill is one self-contained folder, so you can install just the ones you want.

## How the optional connector mode works

Each skill ends with a section "Faster with MFPro Blog MCP (optional)". It only applies when tools such as `ping`, `post_list` or `plugin_list` exist in the conversation. The rules it follows:

- Read first, change second; show before and after.
- New content is saved as a draft; publishing, deleting and overwriting always need an explicit yes.
- No bulk changes without a table the owner has approved.
- Money and customer data are handled with extra care (refunds through the connector are only recorded, not paid out).

The list of tools the skills use is in [`docs/blogmcp-tools.md`](docs/blogmcp-tools.md).

## Contributing

Corrections and new skills are welcome. A good skill is specific about when to use it (the `description`), explains why each rule exists, ships with a standalone workflow first, and keeps connector instructions in a short optional section. Run `node scripts/package.mjs --check` before opening a pull request.

## License

MIT. See [LICENSE](LICENSE).
