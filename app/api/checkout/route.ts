import { NextResponse } from 'next/server';
import { PLANS } from '@/lib/plans';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    let body: { mode?: string; email?: string; targetUrl?: string; prompt?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const { mode, email, targetUrl, prompt } = body;

    if (!mode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Dynamic import to avoid build-time initialization
    const Stripe = (await import('stripe')).default;
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
    });
    
    const plan = PLANS.find(p => p.id === mode);

    if (!plan) {
        return NextResponse.json(
            { error: 'Invalid plan' },
            { status: 400 }
        );
    }

    if (plan.id === 'free') {
      return NextResponse.json(
        { error: 'Free plan does not require checkout' },
        { status: 400 }
      );
    }

    const priceInCents = plan.price * 100;
    const origin = request.headers.get('origin') || new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `QRON ${plan.name}`,
              description: `AI-generated QR code pack`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
      metadata: {
        planId: plan.id,
        mode: plan.id,
        url: targetUrl ?? '',
        prompt: prompt ?? '',
      },
      customer_email: email,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
