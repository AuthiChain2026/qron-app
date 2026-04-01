import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const QRON_WORKER_URL   = process.env.QRON_WORKER_URL || 'https://qron-ai-api.undone-k.workers.dev'

// Stripe price IDs for custom QRON orders
const CUSTOM_PRICES: Record<string, string> = {
  basic:   'price_1TGOM9GqTruSqV8TdV7j3DuL',  // QRON Single $9
  pro:     'price_1TGOMBGqTruSqV8TBxL9yYLU',  // QRON Brand Pack 5x
  elite:   'price_1TGOMCGqTruSqV8TpQsP9KY3',  // QRON Enterprise
}

export async function POST(req: NextRequest) {
  if (!STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  const body = await req.json().catch(() => ({}))
  const { url, subject, style = 'space', tier = 'basic', email } = body as {
    url?: string; subject?: string; style?: string; tier?: string; email?: string
  }

  if (!url) {
    return NextResponse.json({ error: 'url is required' }, { status: 400 })
  }

  const priceId = CUSTOM_PRICES[tier] || CUSTOM_PRICES.basic
  const origin  = req.headers.get('origin') || 'https://qron.space'

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2025-12-15.clover' })

  const session = await stripe.checkout.sessions.create({
    mode:                 'payment',
    payment_method_types: ['card'],
    line_items:           [{ price: priceId, quantity: 1 }],
    success_url:          `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:           `${origin}/#pricing`,
    ...(email ? { customer_email: email } : {}),
    metadata: {
      product:    'custom-qron',
      target_url: url,
      subject:    subject || '',
      style,
      tier,
      prompt:     subject ? `${style} QR art featuring ${subject}` : `${style} AI QR code design`,
    },
  })

  return NextResponse.json({ url: session.url, session_id: session.id })
}
