# Technical appendix (optional)

For people who have shell access, WP-CLI or an experienced helper. A typical site owner using a browser chat should not be asked to do any of this; offer to write a message to the hosting support or to a freelancer instead. All commands are examples; run them only after a backup.

## Inventory (read-only, with WP-CLI)

```bash
wp core version
wp core verify-checksums                  # core files match the official release
wp plugin list --fields=name,status,version,update
wp plugin verify-checksums --all          # plugins hosted on wordpress.org
wp user list --role=administrator --fields=ID,user_login,user_email,user_registered
wp cron event list
```

## Updates and cleanup

```bash
wp core update
wp plugin update --all
wp plugin delete <inactive-plugin>
```

## wp-config.php (a developer or the host edits this file)

```php
define( 'DISALLOW_FILE_EDIT', true );   // no code editor in wp-admin
define( 'FORCE_SSL_ADMIN', true );      // admin and login over HTTPS only
define( 'WP_DEBUG', false );            // never show errors to visitors
```

Fresh security keys (logs everybody out) come from `https://api.wordpress.org/secret-key/1.1/salt/`.

## File permissions

Directories 755, files 644, `wp-config.php` 600 or 640; no PHP execution in `wp-content/uploads` (a host setting). Backups and `.sql` dumps do not belong in the web root.

## After an incident

```bash
find wp-content/uploads -name "*.php"     # should return nothing
wp option get siteurl && wp option get home
```

Matches from searches for `base64_decode` or `eval(` are leads, not proof; legitimate code uses them too. When in doubt replace files from clean sources instead of editing infected ones.

## Extras

- XML-RPC can be disabled if no tool needs it; that breaks some old apps and Jetpack features.
- HSTS only after HTTPS works everywhere; a Content-Security-Policy only with testing.
