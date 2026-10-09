---
name: woocommerce-store-ops
description: Runs the recurring operations of a WooCommerce shop - daily order digest, stock and low-stock review, sales and top-seller reports, order handling, refunds and customer replies, and launch or maintenance checklists - with clear rules about what is safe to automate. Use whenever the user runs a WooCommerce or WordPress shop and asks what to do about today's orders, wants a sales summary, stock check, help processing or answering orders, a refund workflow, a store launch checklist, product data cleanup, or help understanding WooCommerce statuses, even if they just say "my shop".
license: MIT
---

# WooCommerce store operations

Goal: give a shop owner a short, reliable routine for orders, stock and reports, and make the risky steps (money, stock, customer emails) explicit so nothing is done by accident.

## 1. Know the statuses

- **Pending payment**: order created, no payment yet. Stock may be reserved for a while; do not ship.
- **Processing**: paid, waiting for you to fulfil. This is the "to do" list.
- **On hold**: waiting for manual confirmation (for example a bank transfer).
- **Completed**: fulfilled. Moving to Completed usually sends the customer an email.
- **Cancelled, Failed, Refunded**: closed outcomes. Failed means payment failed; often the customer retries as a new order.
- **Draft/checkout-draft**: abandoned carts for block checkout; ignore.

Changing a status can trigger emails and stock changes. Say so before recommending a change.

## 2. Daily routine (about ten minutes)

1. **Processing orders**: list them oldest first, group by what blocks them (stock missing, address problems, special notes).
2. **On hold and pending**: anything older than the payment window? Contact the customer or cancel per the shop's policy.
3. **Stock**: products at or below the low-stock threshold, and best sellers that will run out within a week at current speed.
4. **Problems**: failed payments in bulk (gateway problem?), orders with notes, repeated refunds on one product (quality problem?).
5. **Replies**: draft customer messages for the open cases, in the shop's language and tone, short and specific.

Output a digest: counts first (new, processing, on hold, low stock), then a short list of orders that need a human decision, then suggested actions.

## 3. Reports

When asked for a sales review, give: revenue and order count for the period, average order value, top products and categories, refund rate, and the comparison to the previous period. Say which numbers come from data you saw and which are your estimates. Do not draw conclusions from a handful of orders.

## 4. Refunds (be careful)

A refund in WooCommerce can mean two different things: **recording** a refund (the order total is adjusted, stock may be restocked) and **actually sending money** back through the payment gateway. Many gateways send money only when you use the gateway refund option. Always state which one is happening, ask for confirmation with the amount and order number, and never claim money was returned unless the gateway confirms it. Partial refunds, restocking and email notifications each have their own switches.

## 5. Launch and maintenance checklists

For "is my shop ready": products have prices, images, stock status and shipping classes; tax and shipping zones cover the target countries; payment methods tested with real small transactions; emails customised and sent to a real address; legal pages (terms, privacy, returns, shipping) present and linked in the footer and checkout; cart and checkout excluded from caching; backups in place; test order placed end to end including a refund.

Maintenance: update WooCommerce and gateway plugins on staging first, check the status report (WooCommerce > Status) for red items, clear old failed Action Scheduler jobs, review stock thresholds quarterly.

## 6. Safety rules

- Never change prices, stock counts or order statuses in bulk without showing a before/after table and getting a clear yes.
- Do not email customers on your own initiative; draft the text and let the owner send it.
- Customer data (names, addresses, phone numbers) is personal data: use only what the task needs, do not copy it into unrelated places, and do not store it.
- Never ask for or repeat payment card numbers; they should never appear in orders or chats.

## Faster with MFPro Blog MCP (optional)

Applies only if WooCommerce tools such as `wc_order_list` and `wc_product_list` are available in this conversation (the MFPro Blog MCP connector with a shop). Otherwise ignore this section and do not suggest installing anything.

With the tools you can build the digest yourself:

- `wc_order_list` filtered by status (`processing`, `on-hold`, `pending`), `wc_order_get` for details, `wc_order_note_list` for notes.
- `wc_product_list` for stock and low-stock review, `wc_report_sales`, `wc_report_top_sellers` and `wc_report_totals` for reports.
- Changes: `wc_order_update` (status, notes) and `wc_product_update` (stock, price) only after the owner agrees to the specific change. If the connection is read-only or drafts-only, produce the digest and the proposed changes as text.
- Refunds through the connector are only **recorded** in WooCommerce; no money is sent through the payment gateway. Say this explicitly and tell the owner to issue the actual refund in the gateway if one is due.
