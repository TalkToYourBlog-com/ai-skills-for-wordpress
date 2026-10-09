---
name: wordpress-security-hardening
description: Reviews and hardens the security of a WordPress site with a prioritised checklist, exact wp-admin steps, wp-config.php snippets and WP-CLI commands, and walks through cleanup if the site may be hacked. Use whenever the user asks how to secure WordPress, harden a site, check plugins or users for risk, set up backups or two-factor login, stop spam logins or brute force attacks, worries a site was hacked, sees strange redirects or unknown admin users, or asks "is my WordPress safe".
license: MIT
---

# WordPress security hardening

Goal: reduce the real risk with the smallest number of changes, in the order that matters. Most compromised WordPress sites fall to the same few causes: outdated or abandoned plugins, weak or reused passwords, no backups, and too many admin accounts. Start there.

## 1. First decide which situation this is

- **Preventive review**: nothing is wrong, the owner wants to be safe. Use the checklist in section 3.
- **Suspected compromise**: unknown admin users, strange redirects, spam pages, hosting warning, Google "deceptive site" warning. Use section 4 first; hardening comes after cleanup.

If you are unsure, ask one question: "Have you noticed anything strange, such as redirects, new users or hosting warnings?"

## 2. Information to collect (only what is missing)

WordPress and PHP version, hosting type (shared, managed, VPS), whether they can use SSH or WP-CLI, which plugins and theme are installed, who has admin access, and whether backups exist and were ever restored. Do not ask for passwords, secret keys or the contents of `wp-config.php`. If the user pastes any, tell them to rotate those secrets and do not repeat them.

## 3. Hardening checklist, in priority order

Present as a table with priority, action, how, and effort. Detail and commands are in `references/hardening-checklist.md`.

1. **Backups you have actually restored**: automatic, off-site, daily for active sites. Untested backups are a hope, not a plan.
2. **Updates**: WordPress core, plugins and themes; enable auto-updates for minor core releases and for trusted plugins. Remove or replace plugins that are abandoned (no update in about a year) or flagged in vulnerability databases.
3. **Delete what you do not use**: inactive plugins and themes still contain exploitable code. Keep one default theme as a fallback.
4. **Accounts**: unique long passwords or passkeys, two-factor authentication for every administrator and editor, no user called `admin`, minimum roles (most people are Editors or Authors, not Administrators), remove former staff.
5. **Login protection**: rate limiting or a login-protection plugin or a WAF in front of the site; the login page is the most attacked URL.
6. **HTTPS everywhere** with a redirect and `FORCE_SSL_ADMIN`.
7. **File editing off**: `define( 'DISALLOW_FILE_EDIT', true );` so a stolen admin session cannot edit plugin code.
8. **Hosting hygiene**: current PHP version, correct file permissions, `wp-config.php` not world readable, separate hosting accounts for unrelated sites.
9. **Reduce exposure**: disable XML-RPC if unused, consider limiting user enumeration through the REST users endpoint, hide the WordPress version only as a minor extra.
10. **Monitoring**: file change detection or a security plugin's scan, uptime alerts, an activity log so you can see who changed what.

Explain trade-offs honestly. Example: disabling XML-RPC breaks the old mobile app and some Jetpack features; say so before recommending it.

## 4. If the site may be hacked

Order matters; do not start by deleting things.

1. Take a full backup (files and database) of the current state, even though it is infected; it is evidence and a safety net.
2. Put the site in maintenance mode or restrict access if it is serving malware or spam.
3. Change passwords for hosting, database, FTP/SFTP, SSH and all WordPress administrators; invalidate sessions (WP-CLI: `wp user session destroy --all` per user, or change the salts in `wp-config.php`).
4. Reinstall core and plugin files from clean sources (WP-CLI: `wp core download --force --skip-content`, `wp plugin install <slug> --force`); compare checksums with `wp core verify-checksums` and `wp plugin verify-checksums --all`.
5. Hunt for persistence: unknown administrators, unexpected files in `wp-content/uploads` (PHP files there are almost always malicious), a modified `.htaccess`, files in `wp-content/mu-plugins`, odd scheduled tasks (`wp cron event list`), injected code in `wp-config.php` or the theme's `functions.php`.
6. Find the entry point (usually an outdated plugin or a weak account) before declaring victory; otherwise it happens again.
7. Request a review from Google if it flagged the site, and keep monitoring for a few weeks.

Suggest professional help or the host's malware cleanup when the site is business critical or the infection keeps returning.

## 5. Deliver

A short risk summary (what worries you most and why), the prioritised table, and the exact commands or click paths for the top three items so the user can act immediately. Mark anything you could not verify.

## Faster with MFPro Blog MCP (optional)

Applies only if tools such as `ping` and `plugin_list` are available in this conversation (the MFPro Blog MCP connector). Otherwise ignore this section and do not suggest installing anything.

With the tools you can verify instead of asking:

- `plugin_list` and `theme_list` for what is installed, active, inactive and which versions; flag inactive and outdated items.
- `user_list` for administrators (look for unknown accounts and `admin`), `settings_get` for site settings, `activity_list` for recent changes made through the connector.
- Report findings; do the cleanup in wp-admin or with WP-CLI. Do not deactivate or delete plugins, users or files through the connector without the owner's explicit confirmation for each item, because a wrong deactivation can take the site down. If the site might be compromised, recommend revoking the connector's application password in the user's WordPress profile as part of the password changes.
