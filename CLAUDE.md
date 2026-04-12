# CLAUDE.md - Claude Code Project Context

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Project: QRON.space

AI-powered artistic QR code generator. Next.js 15 + Supabase + Stripe + Fal.ai + Cloudflare Workers.

**Live:** https://www.qron.space

## Critical Files

- `lib/plans.ts` — Pricing tiers (Free/Starter/Creator/Studio/Business), Stripe price IDs
- `app/api/webhook/route.ts` — Stripe webhook handler (fulfillment pipeline)
- `middleware.ts` — Supabase SSR auth middleware
- `utils/supabase/server.ts` — Server-side Supabase client
- `utils/supabase/client.ts` — Browser-side Supabase client
- `.env.example` — All required environment variables

## Conventions

- **Dark theme**: background `#0a0a0a`, gold accent `#c9a227`
- **Server components** by default; use `"use client"` only for interactive elements
- **Mounted guard** pattern for client components to prevent SSR hydration issues
- **Admin routes** (`/api/admin/*`) authenticate via `x-admin-secret` header
- **Webhook route** (`/api/webhook`) authenticates via Stripe signature

## Database

Supabase PostgreSQL with RLS. Migrations in `supabase/migrations/`.
- Use service role key for webhook/admin operations
- Use anon key + RLS for user-facing operations
- `add_generation_credits(user_uuid, amount)` — atomic credit grant RPC

## Workers

Cloudflare Workers in `workers/` — deployed independently, not part of Next.js build.

## Do Not

- Expose service role keys or Stripe secrets in client code
- Use `getSession()` (deprecated) — use `getUser()` instead
- Skip the mounted guard on client components with modals/portals
- Modify Stripe price IDs without matching Dashboard changes

## Content Registry (Notion)

Before creating new files, check the Notion Content Registry to avoid duplication:
https://www.notion.so/3959bfd5dd9e4b9cb741ef7c2ea7cd78

If a similar asset exists, update it instead of creating a new one. If creating new, register it in the Content Registry immediately with Source, Type, Status, Project, and Priority.
