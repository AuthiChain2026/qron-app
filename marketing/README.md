# QRON.space Marketing System

This directory is the **single source of truth** for how QRON.space — the
sister product of AuthiChain — presents its demos, intake, and investor
story inside the repo. Everything here keeps engineering, marketing, sales,
and investor-facing material aligned with the live code that powers the
QRON identity layer.

## Purpose

The marketing layer exists to make the QRON.space repo **self‑documenting,
investor‑ready, and demo‑aligned**:

- Every demo surface on the site carries a marketing header that states
  *the problem*, *the AuthiChain / QRON solution*, and *the business value*.
- Every workflow carries `why` / `value` metadata so any reader — human or
  agent — understands what the automation is for and what it unlocks
  commercially.
- A simple intake form captures inbound marketing, demo, and partnership
  requests and routes them to the right team.
- A demo-mapping table gives stakeholders a one-glance view of which
  industries have demos and where the code lives.

## How demos map to industries

QRON.space demos live under `app/demo/` and exercise the AuthiChain
authentication flow through a branded QRON identity. Each demo shares the
same verification loop:

1. **Target** — prospect selects an industry / target (brand, celebrity,
   luxury, sport, culture).
2. **Generate** — QRON builds a custom identity tied to the target.
3. **Verify** — the user scans the generated QRON and AuthiChain confirms
   authenticity in ~2.1s.
4. **Convert** — user continues into checkout for a custom QRON order.

The canonical demo → industry list is maintained in
[`demo-mapping.md`](./demo-mapping.md).

## How to use the intake form

All inbound marketing, partnership, investor, and custom-demo requests flow
through a single Airtable intake form. See [`intake.md`](./intake.md) for the
form link and internal triage instructions.

Use the intake form when:

- A prospect asks for a custom industry or brand demo.
- An investor requests a briefing or data room access.
- A partner wants to be featured in marketing material.
- Sales needs a tailored QRON asset generated.

## How to write a new demo with a marketing header

1. Add a new demo under `app/demo/` (or `app/demos/<industry>/`) following
   the existing pattern.
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
4. Link the new demo from the main marketing surfaces (landing page, demo
   index, footer).

## File index

| File | Purpose |
|------|---------|
| [`README.md`](./README.md) | This file — marketing system overview |
| [`intake.md`](./intake.md) | Inbound intake form + internal triage rules |
| [`demo-mapping.md`](./demo-mapping.md) | Industry → demo path mapping table |
