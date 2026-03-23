/**
 * POST /api/checkout/custom-qron
 *
 * Creates a Stripe checkout session for a one-time "Custom Targeted QRON" order.
 * After payment, the webhook at /api/webhook auto-generates the QRON using
 * fal-ai/illusion-diffusion and emails it to the customer.
 *
 * Body (JSON):
 *   url              – Destination URL to encode in the QR (required)
 *   subject          – Person, brand, or description to target (required)
 *   style            – Art style key or free-form text (default: 'portrait')
 *   referenceImageUrl– Optional logo/photo URL for img2img guidance
 *   email            – Customer email (optional — Stripe will collect at checkout)
 *   tier             – 'standard' | 'premium' | 'elite' (default: 'standard')
 *
 * Returns:
 *   { url } – Stripe hosted checkout URL
 */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Pricing tiers for custom QRON orders
// These Stripe price IDs must be created in your Stripe dashboard.
// Standard: $49  — 50 inference steps, standard quality
// Premium:  $99  — 75 steps, premium quality, priority queue
// Elite:    $249 — 75 steps, premium quality, NFT mint included, print-ready file
const CUSTOM_QRON_PRICES: Record<string, { priceId: string | null; label: string; price: number; steps: number }> = {
  standard: {
    priceId: process.env.STRIPE_PRICE_CUSTOM_QRON_STANDARD ?? null,
    label: 'Custom Targeted QRON — Standard',
    price: 49,
    steps: 50,
  },
  premium: {
    priceId: process.env.STRIPE_PRICE_CUSTOM_QRON_PREMIUM ?? null,
    label: 'Custom Targeted QRON — Premium',
    price: 99,
    steps: 75,
  },
  elite: {
    priceId: process.env.STRIPE_PRICE_CUSTOM_QRON_ELITE ?? null,
    label: 'Custom Targeted QRON — Elite (NFT Minted)',
    price: 249,
    steps: 75,
  },
}

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const body = await req.json().catch(() => ({}))
  const { url, subject, style = 'portrait', referenceImageUrl, email, tier = 'standard' } = body

  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return NextResponse.json({ error: 'A valid URL is required' }, { status: 400 })
  }
  if (!subject || typeof subject !== 'string' || !subject.trim()) {
    return NextResponse.json({ error: 'Subject is required' }, { status: 400 })
  }

  const tierConfig = CUSTOM_QRON_PRICES[tier] ?? CUSTOM_QRON_PRICES.standard

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2025-12-15.clover' })

  const origin = req.headers.get('origin') || new URL(req.url).origin

  // Build Stripe line item — use price ID if configured, else price_data
  const lineItem = tierConfig.priceId
    ? { price: tierConfig.priceId, quantity: 1 }
    : {
        price_data: {
          currency: 'usd',
          unit_amount: tierConfig.price * 100,
          product_data: {
            name: tierConfig.label,
            description: `AI-generated targeted QRON for: ${subject.trim().slice(0, 100)}`,
            images: ['https://qron.space/media/gallery-static-portal-1080.svg'],
          },
        },
        quantity: 1,
      }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [lineItem as any],
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&type=custom_qron`,
    cancel_url: `${origin}/demo`,
    ...(email ? { customer_email: email } : {}),
    // Metadata consumed by the webhook to auto-generate the QRON
    metadata: {
      type: 'custom_qron',
      url,
      subject: subject.trim().slice(0, 500),
      style,
      tier,
      steps: String(tierConfig.steps),
      mintNft: tier === 'elite' ? 'true' : 'false',
      ...(referenceImageUrl ? { referenceImageUrl } : {}),
    },
  })

  return NextResponse.json({ url: session.url })
}
