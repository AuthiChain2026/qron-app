import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import * as fal from '@fal-ai/client'
import { PLAN_CREDITS, PLAN_TIER, type PlanId } from '@/lib/plans'

export const runtime = 'nodejs'

// ─── Supabase helper ──────────────────────────────────────────────────────────

async function getServiceClient() {
  const { createClient } = await import('@supabase/supabase-js')
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// ─── Grant credits + upgrade tier ────────────────────────────────────────────

async function fulfillPlan(userId: string | null | undefined, planId: string | null | undefined) {
  if (!userId || !planId) return
  const id = planId as PlanId
  const credits = PLAN_CREDITS[id]
  const tier    = PLAN_TIER[id]
  if (!credits && !tier) return

  try {
    const supabase = await getServiceClient()
    await supabase
      .from('profiles')
      .update({
        tier,
        generations_limit:
          credits >= 999999
            ? 999999
            : supabase.rpc
              ? undefined   // will use rpc below for incremental
              : credits,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)

    // Add credits incrementally (so existing balance isn't wiped)
    if (credits > 0 && credits < 999999) {
      await supabase.rpc('add_generation_credits', { user_uuid: userId, amount: credits })
    } else if (credits >= 999999) {
      await supabase
        .from('profiles')
        .update({ generations_limit: 999999, tier })
        .eq('user_id', userId)
    }

    console.log(`[webhook] Fulfilled plan="${id}" for user=${userId} credits=${credits} tier=${tier}`)
  } catch (err) {
    console.error('[webhook] fulfillPlan error (non-fatal):', err)
  }
}

// ─── Downgrade on subscription cancel ────────────────────────────────────────

async function downgradeUser(stripeCustomerId: string) {
  try {
    const supabase = await getServiceClient()
    await supabase
      .from('profiles')
      .update({ tier: 'free', generations_limit: 10, updated_at: new Date().toISOString() })
      .eq('stripe_customer_id', stripeCustomerId)
    console.log('[webhook] Downgraded customer', stripeCustomerId)
  } catch (err) {
    console.error('[webhook] downgradeUser error (non-fatal):', err)
  }
}

// ─── Save Stripe customer ID to profile ──────────────────────────────────────

async function saveCustomerId(userId: string | null | undefined, customerId: string | null) {
  if (!userId || !customerId) return
  try {
    const supabase = await getServiceClient()
    await supabase
      .from('profiles')
      .update({ stripe_customer_id: customerId, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
  } catch (err) {
    console.error('[webhook] saveCustomerId error (non-fatal):', err)
  }
}

// ─── Record delivery ─────────────────────────────────────────────────────────

async function recordDelivery(
  sessionId: string, email: string,
  imageUrl: string, qrUrl: string, prompt: string
) {
  try {
    const supabase = await getServiceClient()
    await supabase.from('qron_deliveries').upsert(
      { stripe_session_id: sessionId, customer_email: email, image_url: imageUrl, qr_url: qrUrl, prompt, delivered_at: new Date().toISOString() },
      { onConflict: 'stripe_session_id' }
    )
  } catch (err) {
    console.error('[webhook] recordDelivery error (non-fatal):', err)
  }
}

// ─── Email QR to customer ─────────────────────────────────────────────────────

async function sendQrEmail(to: string, imageUrl: string, qrUrl: string, prompt: string) {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) { console.warn('[email] SENDGRID_API_KEY not set — skipping'); return }
  const sgMail = (await import('@sendgrid/mail')).default
  sgMail.setApiKey(apiKey)
  await sgMail.send({
    to,
    from: process.env.SENDGRID_FROM_EMAIL || 'hello@qron.space',
    subject: 'Your QRON QR Code is Ready 🎨',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ededed;padding:32px;border-radius:12px;">
        <h1 style="color:#c9a227;margin-bottom:8px;">Your QRON is Ready</h1>
        <p style="color:#9e9e9e;">Here's your AI-generated QR code:</p>
        <div style="text-align:center;margin:24px 0;">
          <img src="${imageUrl}" alt="Your QRON" style="max-width:360px;width:100%;border-radius:12px;border:1px solid rgba(201,162,39,0.3);" />
        </div>
        <p><strong style="color:#c9a227;">Links to:</strong> <a href="${qrUrl}" style="color:#c9a227;">${qrUrl}</a></p>
        <p><strong style="color:#c9a227;">Style:</strong> <span style="color:#9e9e9e;">${prompt}</span></p>
        <div style="margin:24px 0;">
          <a href="${imageUrl}" style="background:linear-gradient(135deg,#c9a227,#a07c10);color:#000;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;">
            Download QR Code
          </a>
        </div>
        <hr style="border:none;border-top:1px solid rgba(201,162,39,0.2);margin:24px 0;" />
        <p style="color:#3a3a3a;font-size:12px;">
          Powered by <a href="https://qron.space" style="color:#c9a227;text-decoration:none;">QRON</a> ·
          Authenticated by <a href="https://authichain.com" style="color:#c9a227;text-decoration:none;">AuthiChain</a>
        </p>
      </div>`,
    text: `Your QRON QR Code is ready!\n\nDownload: ${imageUrl}\nLinks to: ${qrUrl}\nStyle: ${prompt}`,
  })
  console.log('[email] QR delivered to', to)
}

// ─── QR generation for one-time pack purchases ───────────────────────────────

async function generateAndDeliverQr(session: Stripe.Checkout.Session) {
  const { url, prompt } = session.metadata || {}
  const customerEmail = session.customer_email || session.customer_details?.email

  if (!url || !prompt || !customerEmail) {
    console.warn('[webhook] Skipping QR gen — missing url/prompt/email in metadata')
    return
  }
  if (!process.env.FAL_KEY) {
    console.warn('[webhook] FAL_KEY not set — skipping QR generation')
    return
  }

  fal.config({ credentials: process.env.FAL_KEY })

  const QRCode = (await import('qrcode')).default
  const qrDataUrl = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H', width: 1024, margin: 2 })

  const falResult = await fal.subscribe('fal-ai/illusion-diffusion', {
    input: {
      prompt: `highly detailed QR code art, scannable, ${prompt}`,
      image_url: qrDataUrl,
      qr_code_content: url,
      guidance_scale: 8.5,
      num_inference_steps: 50,
      strength: 0.75,
      controlnet_conditioning_scale: 1.5,
    },
  })

  const falData = falResult.data as Record<string, any>
  const imageUrl: string | undefined = falData?.image?.url || falData?.images?.[0]?.url
  if (!imageUrl) throw new Error('Fal.ai returned no image URL')

  await Promise.all([
    sendQrEmail(customerEmail, imageUrl, url, prompt),
    recordDelivery(session.id, customerEmail, imageUrl, url, prompt),
  ])
}

// ─── Webhook handler ─────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret   = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'No stripe-signature header' }, { status: 400 })
  }

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret)
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log(`[webhook] ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const { planId, userId } = session.metadata || {}
        const customerId = typeof session.customer === 'string' ? session.customer : null

        // Persist Stripe customer ID
        await saveCustomerId(userId, customerId)

        // Grant credits / upgrade tier
        await fulfillPlan(userId, planId)

        // For one-time pack purchases, generate and email the QR
        if (session.mode === 'payment') {
          await generateAndDeliverQr(session)
        }
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        // Re-fulfill if subscription reactivated
        if (sub.status === 'active') {
          const userId = sub.metadata?.userId
          const planId = sub.metadata?.planId
          await fulfillPlan(userId, planId)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = typeof sub.customer === 'string' ? sub.customer : null
        if (customerId) await downgradeUser(customerId)
        break
      }

      default:
        // Unhandled event types — ignore silently
        break
    }
  } catch (err) {
    console.error(`[webhook] Handler error for ${event.type}:`, err)
    // Return 200 so Stripe doesn't retry; errors are logged
  }

  return NextResponse.json({ received: true })
}
