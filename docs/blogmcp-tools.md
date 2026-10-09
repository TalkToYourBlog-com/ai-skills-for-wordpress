# Tools used in the optional connector mode

The skills reference these [MFPro Blog MCP](https://blogmcp.michalfutera.pro) tools. They are optional; every skill works without them. Which tools exist depends on the blog's plugins and on the permissions the owner granted (full, drafts only, read only).

| Area | Tools |
| --- | --- |
| Session | `ping` (blog and permissions) |
| Posts and pages | `post_list`, `post_get`, `post_create`, `post_update`, `page_list`, `revision_list`, `revision_restore` |
| Taxonomy | `category_list`, `tag_list` |
| Media | `media_list`, `media_update`, `media_upload` (PNG only) |
| Comments | `comment_list`, `comment_get`, `comment_update`, `comment_create` |
| SEO plugin fields | `seo_get`, `seo_update` (only with Yoast, Rank Math or All in One SEO) |
| Site | `settings_get`, `plugin_list`, `theme_list`, `user_list`, `activity_list` |
| WooCommerce | `wc_order_list`, `wc_order_get`, `wc_order_update`, `wc_order_note_list`, `wc_product_list`, `wc_product_update`, `wc_report_sales`, `wc_report_top_sellers`, `wc_report_totals` |

Principles shared by all skills: drafts first, ask before publishing or deleting, show before and after, do nothing in bulk without approval, and never handle passwords or card data.
