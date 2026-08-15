# Payments (Razorpay)

Payments are for **group class memberships** (drop-in and monthly plans). The
flow is: Firestore `plans/` collection is the **authoritative price source** →
server creates a Razorpay order → client opens the Razorpay checkout → server
verifies the payment signature → the `payments/` record is marked completed.

## Source files

| File                                              | Role                                                                                    |
| ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `src/lib/razorpay.ts`                             | Firestore helpers: `getPlan`, `getActivePlans`, `createPaymentDoc`, `getPaymentsByUser` |
| `src/app/api/plans/route.ts`                      | `GET` active plans (public, used by pricing sections)                                   |
| `src/app/api/payments/create-order/route.ts`      | Creates Razorpay order + pending payment doc                                            |
| `src/app/api/payments/verify/route.ts`            | Verifies checkout HMAC signature, marks completed                                       |
| `src/app/api/payments/webhook/route.ts`           | Server-side confirmation via Razorpay webhook                                           |
| `src/app/api/payments/route.ts`                   | `GET` payment history for the signed-in user                                            |
| `src/components/payments/PaymentModal.tsx`        | Client checkout modal (auth gate → order → popup → verify)                              |
| `src/app/payment-success/page.tsx`                | Post-payment confirmation page                                                          |
| `scripts/seed-plans.ts`, `scripts/check-plans.ts` | CLI seed/verify of plans                                                                |

## Data model: `payments/{autoId}`

```ts
{
	userId: string; // Firebase uid
	planId: string; // e.g. "group-12-month"
	planName: string;
	subtotal: number; // ₹ before GST
	gstPercent: number;
	gstAmount: number;
	amount: number; // total ₹ (subtotal + GST)
	amountPaise: number; // amount * 100 (Razorpay convention)
	razorpayOrderId: string | null;
	razorpayPaymentId: string | null;
	status: "pending" | "completed" | "failed";
	verifiedAt: Date | null;
	createdAt: Date;
}
```

## End-to-end payment flow

1. User clicks a pricing button (`PaymentModal` children) on
   `/group-classes-indiranagar` (also linked from other pages).
2. **Auth gate (client)**: if not signed in, `PaymentModal` stores
   `redirectPath` (`/group-classes-indiranagar#pricing`) and redirects to
   `/login`. After login the user returns to the same page.
3. `POST /api/payments/create-order`:
    - Verifies the `__session` cookie (Admin SDK).
    - Reads `planId` from the body, fetches the **plan from Firestore** and
      refuses inactive/unknown plans. **Never trusts client-sent amounts.**
    - Creates the Razorpay order:
      `amount = plan.total * 100` (₹ → paise), currency INR, receipt, notes with
      `planId` + `userId`.
    - Writes a `payments/` doc with `status: "pending"` via `createPaymentDoc`.
    - Returns `{ razorpayOrderId, amount, currency, keyId, docId }`.
4. `PaymentModal` loads `https://checkout.razorpay.com/v1/checkout.js` (once),
   opens the Razorpay popup with the order id.
5. Razorpay calls the `handler` with `{ razorpay_payment_id,
razorpay_order_id, razorpay_signature }`.
6. `POST /api/payments/verify`:
    - Recomputes `HMAC-SHA256(razorpay_order_id + "|" + razorpay_payment_id)`
      with `RAZORPAY_KEY_SECRET` and compares to the signature.
    - **Idempotency**: if a payment doc already has this `razorpayPaymentId`,
      returns success without double-processing.
    - Looks up the pending doc by `razorpayOrderId`, sets
      `status: "completed"`, `razorpayPaymentId`, `verifiedAt`.
7. Client redirects to `/payment-success?plan=<planId>`.

### Webhook (server-side confirmation)

`POST /api/payments/webhook` verifies `X-Razorpay-Signature` with
`RAZORPAY_WEBHOOK_SECRET`, ignores everything except `payment.captured`, and
marks the matching **pending** order completed (idempotent).

> ⚠️ **Current status: webhook is NOT yet activated** (see GAPS.md). Until it
> is, completion relies on the client-side `verify` endpoint (which does verify
> the Razorpay HMAC, so it is still secure). Activating the webhook adds a
> server-to-server confirmation and covers cases where the user closes the
> popup after payment.
>
> To activate: Razorpay Dashboard → Settings → Webhooks → URL
> `https://athayogliving.com/api/payments/webhook`, event `payment.captured`,
> and set the shared secret as `RAZORPAY_WEBHOOK_SECRET` in Vercel env.

## Plans lifecycle

Plans live in Firestore `plans/{planId}`:

```ts
{
	(id, name, subtotal, gstPercent, total, duration, category, active, sortOrder);
}
```

- **Seed (CLI)**: `npm run plans:seed` (`scripts/seed-plans.ts`) — skips if
  plans already exist.
- **Check**: `npm run plans:check` (`scripts/check-plans.ts`) — fails the
  process if no active plans exist (used as a pre-deploy sanity check).
- **Public read**: `GET /api/plans` returns active plans (used by some pricing
  sections; most pages hardcode prices in JSX, see below).

> ⚠️ **Known inconsistency**: most page pricing cards hardcode prices in the
> page JSX (e.g. `₹599`, `₹14,999` in explore cards). The authoritative amount
> used for the actual charge is always the Firestore plan. When you change
> prices, update BOTH the Firestore plan (re-seed/edit) and the hardcoded UI
> numbers, or they will drift.

## Troubleshooting

| Symptom                                                      | Cause / fix                                                                              |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `"Payment system is not configured"` (500 from create-order) | No active plans in Firestore → `npm run plans:seed`                                      |
| `"Invalid or inactive plan"`                                 | `planId` doesn't match a Firestore doc or `active: false`                                |
| `"Payment verification failed"`                              | Signature mismatch — wrong `RAZORPAY_KEY_SECRET` (prod vs test keys) or tampered payload |
| Webhook returns 400 `Invalid signature`                      | `RAZORPAY_WEBHOOK_SECRET` mismatch between dashboard and env                             |
| Test mode                                                    | Use `rzp_test_*` keys; key id is public via `NEXT_PUBLIC_RAZORPAY_KEY_ID`                |

## How to update payments

- **Add a plan**: add it to `PLANS` in `scripts/seed-plans.ts`, add its display
  name to `PLAN_NAMES` in `src/app/payment-success/page.tsx`, and add the
  pricing card + `PaymentModal` usage in the page(s).
- **Change a price/GST**: update the plan doc in Firestore (or re-seed) and the
  hardcoded UI numbers. `total` is computed as
  `round(subtotal + subtotal * gstPercent / 100)`.
- **Disable a plan without deleting**: set `active: false` — it disappears from
  `GET /api/plans` and is rejected by create-order.
- **Switch to production keys**: set `NEXT_PUBLIC_RAZORPAY_KEY_ID` and
  `RAZORPAY_KEY_SECRET` to live keys in Vercel; verify the webhook secret too.
- **Firestore indexes**: `firestore.indexes.json` defines `plans(active,
sortOrder)` and `payments(userId, createdAt DESC)`. Deploy with
  `npx firebase deploy --only firestore:indexes` after changing them.
