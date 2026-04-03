# QRON.space - AI-Powered Artistic QR Code Platform

Artistic, on-brand QR experiences that increase scans and engagement. QRON generates AI-powered QR codes using diffusion models, with blockchain-verified provenance via AuthiChain.

**Live:** [qron.space](https://www.qron.space)

## Features

- **11 QR Modes** - Static, Stereographic, Holographic, Memory, Kinetic (video), NFT Mint, and more
- **AI Generation** - Fal.ai diffusion models with ControlNet for scannable artistic QR codes
- **Blockchain Provenance** - Ed25519-signed on AuthiChain for tamper-proof verification
- **NFT Minting** - Mint QR codes as ERC-721 tokens on Base chain via Thirdweb
- **Stripe Payments** - One-time packs (Starter/Creator/Studio) and Business subscription
- **Email Delivery** - Generated QR codes delivered via SendGrid after purchase
- **Analytics** - Cloudflare Workers for scan tracking and ecosystem stats

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS 4 |
| Auth | Supabase Auth (SSR) |
| Database | Supabase PostgreSQL + RLS |
| Payments | Stripe (Checkout, Webhooks, Billing Portal) |
| AI Generation | Fal.ai (illusion-diffusion, ControlNet) |
| Video QR | Runway API |
| NFT | Thirdweb SDK (Base / Base Sepolia) |
| Email | SendGrid |
| Edge Workers | Cloudflare Workers (analytics, API gateway, cron) |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 22+
- npm
- Supabase project
- Stripe account

### Setup

```bash
git clone https://github.com/AuthiChain2026/qron-app.git
cd qron-app
npm install
cp .env.example .env.local
```

Edit `.env.local` with your credentials (see [Environment Variables](#environment-variables)).

### Database

Apply Supabase migrations:

```bash
npx supabase db push
```

This creates tables: `profiles`, `qrons`, `qron_generations`, `qron_deliveries`, `qron_nft_mints`, `products`, `certifications`, `qron_codes`, `verification_logs`, `ownership_claims`.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-side) |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signing secret |
| `FAL_KEY` | Yes | Fal.ai API key for QR generation |
| `SENDGRID_API_KEY` | Yes | SendGrid API key for email delivery |
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | For NFT | Thirdweb client ID |
| `THIRDWEB_SECRET_KEY` | For NFT | Thirdweb server secret |
| `THIRDWEB_MINTER_KEY` | For NFT | Minter wallet private key |
| `ADMIN_SECRET` | Yes | Secret for `/api/admin/*` endpoints |

## Stripe Webhook

Register the webhook endpoint at `https://your-domain/api/webhook`:

```bash
# Automated registration (sets Vercel env vars too):
STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/register-stripe-webhook.ts

# Or via Stripe Dashboard → Developers → Webhooks
```

**Handled events:** `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

## Pricing Plans

| Plan | Price | Generations | Tier |
|------|-------|-------------|------|
| Free | $0 | 10/month | Free |
| Starter | $29 | 100 (one-time) | Pro |
| Creator | $99 | 500 (one-time) | Pro |
| Studio | $299 | 2,000 (one-time) | Pro |
| Business | $49/mo | Unlimited | Enterprise |

## API Routes

35 API routes organized by domain:

- **Generation:** `/api/generate`, `/api/qron/generate`, `/api/qron/generate-targeted`
- **Checkout:** `/api/checkout`, `/api/checkout/story-mode`, `/api/checkout/custom-qron`
- **Certification:** `/api/certifications/create`, `/api/certifications/[serial]`
- **Admin:** `/api/admin/products`, `/api/admin/certifications`, `/api/admin/health`
- **Webhook:** `/api/webhook` (Stripe fulfillment pipeline)
- **NFT:** `/api/qron/mint-nft`
- **Portals:** `/api/portals/create`, `/api/portals/check`, `/api/portals/update`
- **Leads:** `/api/leads/capture`, `/api/capture-email`, `/api/nurture/send`

## Cloudflare Workers

5 workers deployed for edge compute:

| Worker | Purpose |
|--------|---------|
| `qron-analytics` | Event tracking (pageview, qr_generate, checkout) |
| `qron-api-gateway` | API gateway with QRON token binding |
| `qron-token-monitor` | Token monitoring |
| `qron-cron-scheduler` | Daily cron job (00:00 UTC) |
| `authichain-automation` | D1 database automation |

## Project Structure

```
qron-app/
  app/              # Next.js App Router pages & API routes
  components/       # React components
  lib/              # Utilities (plans.ts, helpers)
  types/            # TypeScript type definitions
  utils/supabase/   # Supabase client/server helpers
  workers/          # Cloudflare Workers source
  supabase/         # Database migrations
  scripts/          # Automation (webhook registration, PDF gen)
  public/           # Static assets
  middleware.ts     # Supabase SSR auth middleware
```

## License

Proprietary - AuthiChain 2026
