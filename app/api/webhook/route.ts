import { NextResponse } from 'next/server';
import type Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeSecretKey || !webhookSecret) {
      return NextResponse.json({ error: 'Stripe webhook is not configured' }, { status: 500 });
    }

    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Dynamic imports to avoid build-time initialization
    const Stripe = (await import('stripe')).default;
    const QRCode = (await import('qrcode')).default;
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
    });

    const body = await request.text();

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook error:', err);
      return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('✅ Payment received!');
      console.log('📧 Customer email:', session.customer_email);
      console.log('💰 Amount:', (session.amount_total || 0) / 100);
      console.log('📦 Metadata:', session.metadata);

      const { mode, url, prompt } = session.metadata || {};
      const customerEmail = session.customer_email;

      if (!mode || !url || !prompt || !customerEmail) {
        console.error('Missing metadata');
        return NextResponse.json({ received: true });
      }

      try {
        if (!process.env.FAL_KEY) {
          console.warn('FAL_KEY missing; skipping post-checkout image generation');
          return NextResponse.json({ received: true, skipped: 'missing_fal_key' });
        }

        // Generate basic QR
        const qrDataUrl = await QRCode.toDataURL(url, {
          errorCorrectionLevel: 'H',
          width: 1024,
          margin: 2,
        });

        const enhancedPrompt = `highly detailed QR code art, scannable, ${prompt}`;

        // Generate artistic QR with Fal.ai
        const falResponse = await fetch('https://fal.run/fal-ai/illusion-diffusion', {
          method: 'POST',
          headers: {
            'Authorization': `Key ${process.env.FAL_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: enhancedPrompt,
            image_url: qrDataUrl,
            qr_code_content: url,
            guidance_scale: 8.5,
            num_inference_steps: 50,
            strength: 0.75,
            controlnet_conditioning_scale: 1.5,
          }),
        });

        if (!falResponse.ok) {
          throw new Error('Fal.ai generation failed');
        }

        const falData = await falResponse.json();
        const imageUrl = falData.image?.url || falData.images?.[0]?.url;

        if (!imageUrl) {
          throw new Error('No image generated');
        }

        console.log('✅ QR generated:', imageUrl);
        console.log('📧 TODO: Email to', customerEmail);
        console.log('📧 Manual delivery: Save this URL and email it to customer');

      } catch (error) {
        console.error('❌ Generation error:', error);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
