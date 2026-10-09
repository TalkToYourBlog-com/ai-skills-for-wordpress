---
name: wordpress-comment-moderation
description: Triages WordPress comments - sorts pending comments into approve, spam and needs-a-reply, spots link spam and abuse, drafts short replies in the site's voice, and sets up sensible discussion settings so the pile does not grow back. Use whenever the user has comments waiting in WordPress, is drowning in spam comments or pingbacks, wants to reply to readers, asks how to moderate or disable comments, how to configure Akismet or Settings > Discussion, or wants a policy for comments on their blog.
license: MIT
---

# WordPress comment moderation

Goal: clear the moderation queue quickly without wrongly deleting real readers, answer the comments worth answering, and reduce future work.

## 1. Classify each comment

Give every comment one label and a one-line reason:

- **Approve**: on topic, from a real person, even if critical. Critical but civil comments should stay; deleting them damages trust.
- **Reply**: approve and respond (a question, a correction, a compliment worth acknowledging).
- **Spam**: unrelated promotion, link lists, generic praise ("great post, very informative") with a link or a suspicious name, comments in an unrelated language with links, keyword stuffed names, pingbacks from scraper sites.
- **Trash**: abusive, hateful or doxxing content. Spam goes to Spam (so the spam filter learns), abuse to Trash.
- **Unsure**: ask the owner. Cost of keeping a borderline comment held is low; cost of publishing spam or deleting a real reader is higher.

Signals to weigh together, not alone: links in the body (especially more than one), the commenter's website field, a name that is a keyword or a business, an email domain that looks disposable, copied text, very generic wording, posting the same text on several posts, timing (many comments within minutes).

Show the result as a table (comment id or short quote, author, label, reason) so the owner can scan it in a minute.

## 2. Draft replies

- Short, warm, specific: answer the question or thank for the point, one to three sentences, no marketing language.
- Match the site's language and tone; when you are unsure, keep it neutral and polite.
- Do not promise things the owner has not decided (refunds, features, dates).
- Never reply to abusive comments emotionally; recommend ignoring or trashing them.
- Mark any reply that needs a fact only the owner knows with `[owner to confirm: ...]`.

## 3. Reduce the future queue (settings advice)

In Settings > Discussion consider: hold a comment if it contains two or more links, require the author name and email, close comments on posts older than a set number of days, enable "comment author must have a previously approved comment", and limit or disable pingbacks and trackbacks (the "Allow link notifications from other blogs" option). An anti-spam service such as Akismet removes most automated spam before it reaches the queue. If comments add no value to the site, offer to disable them for new posts rather than fighting spam forever, and explain what that changes for readers.

Privacy note: comments contain personal data (name, email, IP address). The site's privacy policy should say so, and the "Save my name, email and website in cookies" checkbox is optional by default for a reason.

## 4. Deliver

Counts per label, the table, drafted replies, and one or two settings recommendations. Be explicit about which actions you propose and which the owner has to perform in wp-admin (Comments screen: Approve, Reply, Spam, Trash).

## Faster with MFPro Blog MCP (optional)

Applies only if tools such as `ping` and `comment_list` are available in this conversation (the MFPro Blog MCP connector). Otherwise ignore this section and do not suggest installing anything.

With the tools you can work directly on the queue:

- `comment_list` with status `hold` (pending) to read comments, `comment_get` for context, `post_get` to see the post a comment belongs to.
- Present the classification table first and wait for the owner's agreement. Then apply with `comment_update` (status `approved` or `spam`) and post approved replies with `comment_create`.
- Do not delete comments permanently (`comment_delete` is destructive); move abusive ones to Trash only after the owner agrees. If the connection is read-only or drafts-only, produce the table and replies as text.
