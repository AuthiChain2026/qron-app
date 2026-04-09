# QRON.space Demo Mapping

This table maps each target **industry** to the demo surface that exercises
its QRON identity + AuthiChain authentication flow. Use this as the canonical
reference when routing inbound intake requests (see [`intake.md`](./intake.md))
or when writing investor / marketing material that references live demos.

## Canonical industry → demo path

| Industry     | Demo Path                |
|--------------|--------------------------|
| Pharma       | /app/demos/pharma        |
| Cannabis     | /app/demos/cannabis      |
| Luxury       | /app/demos/luxury        |
| Collectibles | /app/demos/collectibles  |
| Supply Chain | /app/demos/supplychain   |

## Current implementation status

QRON.space ships a single unified interactive demo experience at
`app/demo/page.tsx` that exercises multiple industry targets (brand, luxury,
celebrity, sport, culture) through one UI. Industry-specific demos can
either be added as new folders under `app/demos/*` or promoted out of the
unified demo when volume justifies a dedicated surface.

| Industry     | Target path              | Current surface                      | Status     |
|--------------|--------------------------|---------------------------------------|------------|
| Pharma       | /app/demos/pharma        | unified demo (`app/demo/page.tsx`)    | ⏳ Planned |
| Luxury       | /app/demos/luxury        | unified demo (`app/demo/page.tsx`)    | ✅ Live (via target filter) |
| Cannabis     | /app/demos/cannabis      | unified demo (`app/demo/page.tsx`)    | ⏳ Planned |
| Collectibles | /app/demos/collectibles  | unified demo (`app/demo/page.tsx`)    | ⏳ Planned |
| Supply Chain | /app/demos/supplychain   | _not yet implemented_                 | ⏳ Planned |

## How to add a new demo

1. Either add a new target to `lib/demo-targets.ts` (to extend the unified
   demo) or create a dedicated folder at `app/demos/<industry>/page.tsx`.
2. Prepend the required marketing header block (see
   [`README.md`](./README.md) → *How to write a new demo with a marketing
   header*).
3. Update the **Canonical industry → demo path** table above.
4. Link the new demo from the main marketing surfaces (landing page, demo
   index, footer).
