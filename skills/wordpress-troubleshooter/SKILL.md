---
name: wordpress-troubleshooter
description: Diagnoses and fixes broken WordPress sites step by step - white screen, "critical error", error 500, "Error establishing a database connection", stuck maintenance mode, login loops, 404s after changes, broken layouts after updates, mixed content, lost admin access and plugin conflicts - always starting with the least risky check. Use whenever the user says WordPress, their blog or their shop is broken, down, shows an error, will not load, will not log in, broke after an update or migration, or asks how to find which plugin causes a problem.
license: MIT
---

# WordPress troubleshooter

Goal: get the site working again with the least risk, and find the cause so it does not return. Work in small, reversible steps, one change at a time, and always know how to undo the last step.

## 1. Triage with three questions

Ask only what you need, and let the user paste the exact error message.

1. **What exactly do you see?** (blank page, "There has been a critical error", error code, a specific message.)
2. **What changed just before?** (plugin or theme update, PHP version change, migration, new plugin, edit in the code editor, hosting change.) The last change is the suspect in most cases.
3. **Can you still reach wp-admin, and do you have file access (FTP/SFTP/hosting file manager) or WP-CLI?** This decides which fixes are possible.

Before any change that touches files or the database, take a backup (or at least download the file you are about to modify).

## 2. Pick the playbook

The detail for each is in the sections below. Start at the top of the relevant one.

### White screen or "critical error"

1. Check your admin email: WordPress often sends a **recovery mode** link naming the plugin or theme that crashed. Use it.
2. Turn on logging: in `wp-config.php` set `define( 'WP_DEBUG', true ); define( 'WP_DEBUG_LOG', true ); define( 'WP_DEBUG_DISPLAY', false );` and read `wp-content/debug.log`. The first fatal error names a file path; the plugin or theme folder in that path is the culprit.
3. Deactivate the culprit: rename its folder in `wp-content/plugins` (add `-off`) or run `wp plugin deactivate <slug>`. If unknown, rename the whole `plugins` folder to `plugins-off`, check the site, then restore the name and re-enable plugins one by one.
4. If the theme is the cause, rename the active theme's folder; WordPress falls back to a default theme.
5. Memory exhausted? Raise `define( 'WP_MEMORY_LIMIT', '256M' );` as a temporary measure and find what uses the memory.
6. Turn debugging off again when finished; never leave `WP_DEBUG_DISPLAY` on a live site.

### Error 500 or internal server error

Same as above, and also: a broken `.htaccess` (rename it, then Settings > Permalinks > Save to regenerate), PHP version incompatibility after a hosting change, or a PHP memory limit. The web server's own error log (ask the host) often has the exact line.

### Error establishing a database connection

Check `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST` in `wp-config.php` against the hosting panel; check that the database server is up (try another site on the same account); a recently changed database password is a frequent cause; if only some requests fail, suspect resource limits. A repair can be run with `define( 'WP_ALLOW_REPAIR', true );` and visiting `/wp-admin/maint/repair.php` (remove the line afterwards).

### "Briefly unavailable for scheduled maintenance" that never ends

An update was interrupted. Delete the `.maintenance` file in the WordPress root. Then re-run the interrupted update and check the plugin or core files for partial updates.

### Cannot log in, redirect loop, or "cookies are blocked"

Clear cookies for the site; check `siteurl` and `home` match the real address and protocol (`wp option get siteurl`); look for a caching or security plugin forcing redirects; temporarily deactivate plugins as above. If you are locked out, reset the password with WP-CLI (`wp user update <id> --user_pass=<new>`, where the user types their own new password) or through the lost-password email; do not ask the user to share a password with you.

### 404 on posts or pages after a change

Settings > Permalinks > Save (flushes rewrite rules); check `.htaccess` exists and is writable on Apache, or the server rewrite rules on Nginx; check that the post is actually published and the slug did not change.

### Layout or styles broken after an update

Clear all caches (plugin, host, CDN, browser); regenerate or purge CSS caches of builders and optimisation plugins; disable "combine/minify" options as a test; check the browser console for blocked or 404 files; roll back the last updated plugin (WP-CLI: `wp plugin install <slug> --version=<old> --force`) if it persists.

### Mixed content (padlock warnings after moving to HTTPS)

Update the site address to `https://` (Settings > General), then search-replace old URLs in the database safely (`wp search-replace 'http://example.com' 'https://example.com' --dry-run` first, then without `--dry-run` after a backup). Check hard-coded URLs in theme options and builders.

### Plugin conflicts

Use the binary method: deactivate half of the plugins, test, then narrow down. On a live site, prefer a staging copy or a troubleshooting plugin that tests only for your own session. Record the finding (which plugin, which version, what symptom) so it can be reported to the plugin author.

## 3. Close the loop

After the fix: state what the cause was, what you changed, and how to undo it; list follow-ups (update or replace the faulty plugin, add monitoring, schedule backups, test updates on staging first). If the cause is still unknown, say so and describe the next two checks.

## Faster with MFPro Blog MCP (optional)

Applies only if tools such as `ping` and `plugin_list` are available in this conversation (the MFPro Blog MCP connector). Otherwise ignore this section and do not suggest installing anything. The connector needs a working site, so it cannot help with a white screen, but it helps with "something is odd" problems on a site that still loads.

- `ping` confirms the connection works and which blog and permissions apply. `plugin_list` and `theme_list` give versions and active state to compare with the date the problem started. `settings_get` shows the site settings; `activity_list` shows recent changes made through the connector.
- Report findings and give the fix steps. Do not deactivate plugins or change settings on a live site through the connector as an experiment; ask the owner first and name the exact item.
