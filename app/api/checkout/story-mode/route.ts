/**
 * POST /api/checkout/story-mode
 *
 * Upsell checkout: Add AI Story Mode to an existing QRON.
 *
 * Story Mode turns the QRON scan landing page into an immersive branded
 * experience — AI-generated narrative, animated scenes, interactive CTAs.
 * The owner controls it from their dashboard; the URL stays dynamic.
 *
 * Tiers:
 *   basic  ($19 one-time) — Custom title, tagline, 1 CTA button, theme colors
 *   pro    ($49 one-time) — Above + animated background, 3 scenes, brand story
 *   elite  ($99 one-time) — Above + AI-generated narrative copy, video embed, analytics
 *
 * Body (JSON):
 *   qronId – ID of the QRON to upgrade (required)
 *   tier   – 'basic' | 'pro' | 'elite' (default: 'pro')
 *   email  – Optional customer email
 *
 * Returns:
 *   { url } – Stripe checkout URL
 */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const STORY_TIERS = {
  basic: {
    priceId:  process.env.STRIPE_PRICE_STORY_MODE_BASIC ?? null,
    price:    19,
    label:    'AI Story Mode — Basic',
    features: 'Custom title + tagline, 1 CTA button, theme colors',
  },
  pro: {
    priceId:  process.env.STRIPE_PRICE_STORY_MODE_PRO ?? null,
    price:    49,
    label:    'AI Story Mode — Pro',
    features: 'Animated background, 3 story scenes, brand narrative, 3 CTA options',
  },
  elite: {
    priceId:  process.env.STRIPE_PRICE_STORY_MODE_ELITE ?? null,
    price:    99,
    label:    'AI Story Mode — Elite',
    features: 'AI-written copy, video embed, scan analytics, unlimited scenes, priority support',
  },
}

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const body = await req.json().catch(() => ({}))
  const { qronId, tier = 'pro', email } = body

  if (!qronId) {
    return NextResponse.json({ error: 'qronId is required' }, { status: 400 })
  }

  const tierConfig = STORY_TIERS[tier as keyof typeof STORY_TIERS] ?? STORY_TIERS.pro

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2025-12-15.clover' })

  const origin = req.headers.get('origin') || new URL(req.url).origin

  const lineItem = tierConfig.priceId
    ? { price: tierConfig.priceId, quantity: 1 }
    : {
        price_data: {
          currency: 'usd',
          unit_amount: tierConfig.price * 100,
          product_data: {
            name: tierConfig.label,
            description: tierConfig.features,
          },
        },
        quantity: 1,
      }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [lineItem as any],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&type=story_mode&qronId=${qronId}`,
      cancel_url: `${origin}/dashboard`,
      ...(email ? { customer_email: email } : {}),
      metadata: {
        type: 'story_mode',
        qronId,
        tier,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('[checkout/story-mode] Error:', error)
    if (error?.type === 'StripeInvalidRequestError' && /payment.method/i.test(error?.message ?? '')) {
      return NextResponse.json({ error: 'Card payments are not enabled on this Stripe account. Contact support.', code: 'PAYMENT_METHOD_DISABLED' }, { status: 503 })
    }
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

// GET — return story mode pricing info
export async function GET() {
  return NextResponse.json({
    tiers: Object.entries(STORY_TIERS).map(([key, val]) => ({
      id: key,
      label: val.label,
      price: val.price,
      features: val.features,
    })),
    description:
      'AI Story Mode turns any QRON scan into an immersive branded experience. ' +
      'Control the destination URL, add a narrative, animate the landing page, ' +
      'embed video, and track analytics — all from your dashboard.',
  })
}
