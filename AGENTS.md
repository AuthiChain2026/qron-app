# AGENTS.md - Development Guide for AI Assistants

## Project Overview

QRON.space is a Next.js 15 AI QR code generator with Stripe payments, Supabase auth/database, Fal.ai generation, and Cloudflare Workers. Deployed to Vercel at qron.space.

## Key Principles

- Keep diffs scoped to the requested feature; avoid unrelated refactors.
- Never commit secrets or real credentials; use environment variables and `.env.example`.
- Run `npm run lint` and `npm run build` before finishing any app changes.
- For UI changes, keep accessibility and mobile responsiveness intact.
- The app uses Tailwind CSS 4 with a dark theme (`#0a0a0a` background, `#c9a227` gold accent).

## Architecture

### Server vs Client Components

Next.js 15 App Router — components are server by default. Rules:
- Pages that need `metadata` exports must be server components.
- Interactive elements (modals, buttons with state) must use `"use client"` and a `mounted` guard to prevent SSR hydration mismatches.
- Pattern: server page imports a client `*-client.tsx` wrapper for interactive parts.

### Authentication

- **Middleware** (`middleware.ts`): Establishes Supabase session on every request via `supabase.auth.getUser()`.
- **Server-side**: Use `createClient()` from `utils/supabase/server.ts`.
- **Client-side**: Use `createBrowserClient()` from `utils/supabase/client.ts`.
- Admin routes (`/api/admin/*`) use `x-admin-secret` header instead of Supabase auth.
- Webhook route (`/api/webhook`) uses Stripe signature verification.

### Payments (Stripe)

- Plans defined in `lib/plans.ts` — 5 tiers: Free, Starter ($29), Creator ($99), Studio ($299), Business ($49/mo).
- One-time packs use `stripe_mode: 'payment'`; Business uses `stripe_mode: 'subscription'`.
- Webhook handler at `app/api/webhook/route.ts` handles fulfillment: credit grants, email delivery, NFT minting.
- Each plan has a `stripe_payment_link` for direct Stripe-hosted checkout.

### Database (Supabase)

- 3 migration files in `supabase/migrations/`.
- Core tables: `profiles`, `qrons`, `qron_generations`, `qron_deliveries`, `qron_nft_mints`, `products`, `certifications`.
- Row-Level Security (RLS) enabled — profiles/qrons are owner-only; deliveries/mints are service_role only.
- Key RPC: `add_generation_credits(user_uuid, amount)` for atomic credit grants.

### AI Generation

- Primary: Fal.ai illusion-diffusion model via `/api/qron/generate` and `/api/generate`.
- Guest mode: `/api/generate/guest` for free-tier demos.
- Custom/targeted: `/api/qron/generate-targeted` builds rich prompts with style parameters.

### Cloudflare Workers

- Source in `workers/` directory, deployed separately.
- Workers use KV namespace `QRON_KV` (ID: `23fbb5cfb110406f8c9ece60075626fc`).
- `authichain-automation` worker uses D1 database.

## Common Tasks

### Adding a new API route

1. Create `app/api/<route>/route.ts`.
2. For authenticated routes: import Supabase server client, call `getUser()`.
3. For admin routes: check `x-admin-secret` header.
4. Return `NextResponse.json()`.

### Adding a new QR mode

1. Update the mode selector in `app/page.tsx`.
2. Add generation logic in the relevant API route.
3. Update `lib/plans.ts` if the mode is tier-restricted.

### Modifying Stripe plans

1. Update `lib/plans.ts` with new pricing/features.
2. Create matching products/prices in Stripe Dashboard.
3. Update `stripe_price_id` and `stripe_payment_link` values.
4. Ensure webhook handler in `app/api/webhook/route.ts` handles the new plan.

## File Structure Quick Reference

- `app/` — Pages and API routes
- `app/api/webhook/route.ts` — Stripe webhook (critical)
- `components/` — Reusable React components
- `lib/plans.ts` — Pricing tiers and credit mappings
- `middleware.ts` — Supabase SSR auth
- `utils/supabase/` — Client/server Supabase helpers
- `supabase/migrations/` — Database schema
- `workers/` — Cloudflare Workers
- `scripts/` — Automation scripts
