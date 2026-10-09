# Hardening checklist with commands

Use WP-CLI only if the user has shell access. Show commands as examples and tell the user to run them on a staging copy or after a backup when they change things.

## Inventory (read-only)

```bash
wp core version
wp core verify-checksums                  # core files match the official release
wp plugin list --fields=name,status,version,update
wp plugin verify-checksums --all          # only for plugins hosted on wordpress.org
wp theme list
wp user list --role=administrator --fields=ID,user_login,user_email,user_registered
wp cron event list
wp config get table_prefix
```

## Updates

```bash
wp core update
wp plugin update --all
wp theme update --all
wp plugin auto-updates enable <plugin>        # per plugin
wp plugin delete <inactive-plugin>
```

Back up before bulk updates, update on staging for business-critical sites, and read the changelog of major plugin versions.

## wp-config.php (back up the file first)

```php
define( 'DISALLOW_FILE_EDIT', true );   // no code editor in wp-admin
define( 'FORCE_SSL_ADMIN', true );      // admin and login over HTTPS only
define( 'WP_DEBUG', false );            // never display errors on a live site
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
```

Generate fresh salts at `https://api.wordpress.org/secret-key/1.1/salt/` and replace the eight `AUTH_KEY` ... `NONCE_SALT` lines; this logs everyone out, which is the point after an incident.

## File permissions (typical shared or VPS hosting)

- Directories 755, files 644, `wp-config.php` 600 or 640.
- No PHP execution in `wp-content/uploads` (web server rule; ask the host if unsure).
- Keep `wp-config.php` out of version control; do not upload backups or `.sql` dumps into the web root.

## Accounts

- Two-factor authentication or passkeys for every user who can publish.
- Replace the default `admin` user: create a new administrator with a different login, reassign content, delete the old one (`wp user delete admin --reassign=<new-id>`).
- Principle of least privilege: Administrator only for the person who manages the site. Review with `wp user list --fields=ID,user_login,roles`.
- Application passwords (Users > Profile) are credentials too: review and revoke unused ones.

## Login and bots

- Limit login attempts or put a WAF or CDN with bot protection in front of the site.
- Optionally move or protect `wp-login.php`; do not rely on obscurity alone.
- Disable XML-RPC if no tool needs it (a small mu-plugin: `add_filter( 'xmlrpc_enabled', '__return_false' );`).
- The REST endpoint `/wp-json/wp/v2/users` reveals public author names; that is normal for sites that show authors, so treat it as low priority unless usernames equal login names (then change the display name).

## Backups

- Daily database, weekly or daily files for active sites, stored off the server (another provider or object storage).
- Restore the backup to a test location at least once and write down the steps. Timing the restore tells the owner what an outage costs.

## After an incident: quick triage commands

```bash
wp user list --role=administrator
find wp-content/uploads -name "*.php"               # should return nothing
find . -newermt "7 days ago" -name "*.php" -not -path "./wp-content/cache/*"
grep -R --include=*.php -l "base64_decode\|eval(" wp-content   # a lead, not proof: legitimate code uses these too
wp option get siteurl && wp option get home
```

Treat matches as leads to inspect, not as a verdict. When in doubt, replace files from clean sources instead of editing infected ones.

## Headers and extras (nice to have)

- HSTS after confirming HTTPS works everywhere.
- Content-Security-Policy only with testing; it easily breaks sites.
- A security-header check (for example securityheaders.com) for a quick overview.
