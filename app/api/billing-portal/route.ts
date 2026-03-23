import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export const runtime = 'nodejs'

/**
 * POST /api/billing-portal
 *
 * Creates a Stripe Billing Portal session for the authenticated user and
 * returns its URL. The client should redirect the browser to that URL so
 * the customer can manage their subscription, update payment methods, or
 * cancel without leaving the Stripe-hosted interface.
 *
 * Requirements:
 *  - STRIPE_SECRET_KEY env var
 *  - The user must have a `stripe_customer_id` stored in their `profiles` row
 *    (set by the webhook when a checkout.session.completed event fires).
 */
export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 })
  }

  // Authenticate user
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch Stripe customer ID from profiles
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('stripe_customer_id, tier')
    .eq('user_id', user.id)
    .single()

  if (profileError || !profile) {
    return NextResponse.json(
      { error: 'Profile not found', upgradeUrl: '/#pricing' },
      { status: 404 }
    )
  }

  if (!profile.stripe_customer_id) {
    return NextResponse.json(
      {
        error: 'No billing account found. Subscribe to a paid plan first.',
        upgradeUrl: '/#pricing',
      },
      { status: 404 }
    )
  }

  try {
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2025-12-15.clover' })

    const origin =
      request.headers.get('origin') ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'https://qron.space'

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${origin}/`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[billing-portal] Stripe error:', error)
    return NextResponse.json({ error: 'Failed to create billing portal session' }, { status: 500 })
  }
}
