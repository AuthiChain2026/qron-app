import { NextResponse } from 'next/server';
import type Stripe from 'stripe';

export const runtime = 'nodejs';

// ─── SendGrid email delivery ──────────────────────────────────────────────────

async function sendQrEmail(to: string, imageUrl: string, qrUrl: string, prompt: string) {
  const sgMail = (await import('@sendgrid/mail')).default;
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn('[email] SENDGRID_API_KEY not set — skipping delivery');
    return;
  }
  sgMail.setApiKey(apiKey);
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'hello@qron.space';

  await sgMail.send({
    to,
    from: fromEmail,
    subject: 'Your QRON QR Code is Ready 🎨',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h1 style="color:#1e40af;">Your QRON QR Code is Ready!</h1>
        <p>Thank you for your purchase. Here is your custom artistic QR code:</p>
        <div style="text-align:center;margin:24px 0;">
          <img src="${imageUrl}" alt="Your QRON QR Code"
               style="max-width:400px;width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.12);" />
        </div>
        <p><strong>QR links to:</strong> <a href="${qrUrl}">${qrUrl}</a></p>
        <p><strong>Style:</strong> ${prompt}</p>
        <div style="margin:24px 0;">
          <a href="${imageUrl}"
             style="background:#1e40af;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
            Download Your QR Code
          </a>
        </div>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
        <p style="color:#64748b;font-size:13px;">
          Powered by <a href="https://qron.space">QRON</a> ·
          Authenticated by <a href="https://authichain.com">AuthiChain</a>
        </p>
      </div>
    `,
    text: `Your QRON QR Code is ready!\n\nDownload it here: ${imageUrl}\n\nQR links to: ${qrUrl}\nStyle: ${prompt}`,
  });
  console.log('[email] QR delivered to', to);
}

// ─── Delivery record ──────────────────────────────────────────────────────────

async function recordDelivery(sessionId: string, email: string, imageUrl: string, qrUrl: string, prompt: string) {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    await supabase.from('qron_deliveries').upsert(
      { stripe_session_id: sessionId, customer_email: email, image_url: imageUrl, qr_url: qrUrl, prompt, delivered_at: new Date().toISOString() },
      { onConflict: 'stripe_session_id' }
    );
  } catch (err) {
    console.error('[db] Delivery record error (non-fatal):', err);
  }
}

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
      const customerEmail = session.customer_email || session.customer_details?.email;

      if (!mode || !url || !prompt || !customerEmail) {
        console.error('[webhook] Missing metadata or email — cannot fulfill', { mode, url, prompt: !!prompt, email: !!customerEmail });
        return NextResponse.json({ received: true, warning: 'incomplete_metadata' });
      }

      if (!process.env.FAL_KEY) {
        console.warn('[webhook] FAL_KEY missing; skipping AI generation');
        return NextResponse.json({ received: true, skipped: 'missing_fal_key' });
      }

      try {
        // 1. Generate base QR code
        const qrDataUrl = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H', width: 1024, margin: 2 });

        // 2. Generate artistic QR via Fal.ai illusion-diffusion
        const falResponse = await fetch('https://fal.run/fal-ai/illusion-diffusion', {
          method: 'POST',
          headers: { 'Authorization': `Key ${process.env.FAL_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `highly detailed QR code art, scannable, ${prompt}`,
            image_url: qrDataUrl,
            qr_code_content: url,
            guidance_scale: 8.5,
            num_inference_steps: 50,
            strength: 0.75,
            controlnet_conditioning_scale: 1.5,
          }),
        });

        if (!falResponse.ok) {
          throw new Error(`Fal.ai error ${falResponse.status}: ${await falResponse.text()}`);
        }

        const falData = await falResponse.json();
        const imageUrl: string | undefined = falData.image?.url || falData.images?.[0]?.url;
        if (!imageUrl) throw new Error('Fal.ai returned no image URL');

        console.log('[webhook] QR generated:', imageUrl);

        // 3. Deliver via email + persist record
        await Promise.all([
          sendQrEmail(customerEmail, imageUrl, url, prompt),
          recordDelivery(session.id, customerEmail, imageUrl, url, prompt),
        ]);

      } catch (error) {
        console.error('[webhook] Fulfillment error:', error);
        // Return 200 so Stripe doesn't retry; failure is logged for manual resolution
        return NextResponse.json({ received: true, error: 'fulfillment_failed' });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
