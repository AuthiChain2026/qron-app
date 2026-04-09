# QRON.space Marketing System

This directory is the **single source of truth** for how QRON.space — the
sister product of AuthiChain — presents its product, demos, intake, and
investor story inside the repository. Everything here is designed to keep
engineering, marketing, sales, and investor-facing material aligned with the
live code that powers the QRON identity layer.

## Purpose

The marketing layer exists to make the QRON.space repo **self‑documenting,
investor‑ready, and demo‑aligned**:

- Every industry demo on the site has a matching marketing header that states
  *the problem*, *the AuthiChain / QRON solution*, and *the business value*.
- Every workflow and manifest carries `why` / `value` metadata so that any
  reader — human or agent — can understand what each automation is for and
  what it unlocks commercially.
- A simple intake form captures inbound marketing / demo / partnership
  requests and routes them to the right team.
- A demo-mapping table gives stakeholders a one-glance view of which
  industries have live demos and where the code lives.

## How demos map to industries

Each industry demo under `app/demos/<industry>/page.tsx` targets a single
industry with its own data, visuals, and QRON storyline. The full mapping
lives in [`demo-mapping.md`](./demo-mapping.md).

Every industry demo follows the same arc:

1. **Issue** — the brand or manufacturer mints a QRON tied to the product
   and anchored to AuthiChain.
2. **Move** — the product moves through its supply chain; each hand-off is
   signed on-chain.
3. **Verify** — end customers, retailers, or regulators scan the QRON and
   AuthiChain returns authenticity in ~2.1 seconds.
4. **Convert** — every demo page CTAs into the unified QRON order flow at
   `/demo`, turning inspiration into a custom QRON purchase.

The unified QRON order demo at `app/demo/page.tsx` is the conversion funnel
for every industry page — it surfaces the brand / celebrity / sport /
culture / luxury targets defined in `lib/demo-targets.ts` and drives Stripe
checkout for custom QRONs.

## How to use the intake form

All inbound marketing, partnership, investor, and custom-demo requests flow
through a single Airtable intake form. See [`intake.md`](./intake.md) for the
form link and internal triage instructions.

Use the intake form when:

- A prospect asks for a custom industry or brand demo.
- An investor requests a briefing or data room access.
- A partner wants to be featured in marketing material.
- Sales needs a tailored QRON asset or storymode generated.

## How to write a new demo with a marketing header

1. Create a new folder under `app/demos/<industry>/` and add a `page.tsx`
   following the existing demos (`pharma`, `cannabis`, `luxury`,
   `collectibles`, `supplychain`) as a template.
2. **Prepend a marketing header block** to the very top of the `page.tsx`
   file, above `'use client'`:

   ```tsx
   /**
    * Demo: <Industry Name> Authentication
    * Problem: <1–2 sentence problem statement>
    * Solution: AuthiChain verifies authenticity in 2.1 seconds using QRON identities.
    * Business Value: <Industry-specific value>
    */
   ```

3. Add a matching row in [`demo-mapping.md`](./demo-mapping.md).
4. Add a matching entry with `why` and `value` fields to
   `outputs/qron-demo-manifest.json`.
5. Link the new demo from `app/demos/page.tsx` (the demos index) so it shows
   up in the industry gallery.

## File index

| File | Purpose |
|------|---------|
| [`README.md`](./README.md) | This file — marketing system overview |
| [`intake.md`](./intake.md) | Inbound intake form + internal triage rules |
| [`demo-mapping.md`](./demo-mapping.md) | Industry → demo path mapping table |
