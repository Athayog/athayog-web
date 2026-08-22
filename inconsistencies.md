# Known Inconsistencies & Open Items

Local tracker so nothing is silently forgotten. Items here are either
intentionally accepted for now or still waiting on real data. Update this file
whenever an item is resolved.

## Intentionally accepted (review later)

- **Aerial yoga pricing mismatch** — the main page
  (`/aerial-yoga-indiranagar`) sells sessions at ₹599, while the ad landing
  page (`/ld/aerial-yoga-classes-indiranagar`) lists ₹699 / ₹2,499 / ₹4,699.
  Confirmed OK for now by the maintainer; revisit after launch. (2025-08)

## Still open (need real content)

- **Homepage — Jayanagar branch address** — placeholder text
  `[ Add Jayanagar studio address, Bengaluru 5600xx ]` in `src/app/page.tsx`.
  Needs the exact address + pincode.
- **Weight-loss program fee** — pricing card shows `₹[fee]` and the FAQ shows
  `[ Add the 3-month program fee here. ]` in
  `src/app/weight-loss-program-indiranagar/page.tsx`. Needs the real 3-month
  fee (GST of 5% confirmed applicable).
- **Template testimonials** — `/group-classes-indiranagar` and
  `/personal-yoga-training-indiranagar` show sample reviews plus a visible
  "replace with real reviews" note; `/weight-loss-program-indiranagar` shows a
  similar dev note. Replace with real consented reviews or remove before/after
  launch.

## Resolved (history only)

- 4.9★ ratings confirmed real — "verify" flags removed from all four pages.
- Personal-training studio hours filled: Mon–Fri 5 AM–9 PM · Sat–Sun 5 AM–8 PM.
- Weight-loss GST confirmed applicable — "Confirm if GST applies" flag removed
  (now "+ 5% GST").
- Group-classes schedule confirmed fine — "Update monthly" flag removed.
