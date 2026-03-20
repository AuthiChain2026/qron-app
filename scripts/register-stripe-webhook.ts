#!/usr/bin/env tsx
/**
 * Register the QRON Stripe webhook endpoint and print the signing secret.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/register-stripe-webhook.ts
 *
 * After running, copy STRIPE_WEBHOOK_SECRET into:
 *   - Vercel → qron-app → Settings → Environment Variables
 *   - .env.local (for local dev with `stripe listen --forward-to localhost:3000/api/webhook`)
 */

const WEBHOOK_URL = process.env.QRON_URL
  ? `${process.env.QRON_URL}/api/webhook`
  : 'https://qron.space/api/webhook'

const ENABLED_EVENTS = [
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]

async function main() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    console.error('ERROR: STRIPE_SECRET_KEY env var is required')
    process.exit(1)
  }

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' })

  // Check if a webhook for this URL already exists
  const existing = await stripe.webhookEndpoints.list({ limit: 100 })
  const found = existing.data.find(w => w.url === WEBHOOK_URL)

  if (found) {
    console.log(`✓ Webhook already registered (id=${found.id}, status=${found.status})`)
    console.log(`  URL: ${found.url}`)
    console.log(`  Events: ${found.enabled_events.join(', ')}`)
    console.log()

    // Update events in case they've changed
    const missingEvents = ENABLED_EVENTS.filter(e => !found.enabled_events.includes(e))
    if (missingEvents.length > 0) {
      console.log(`  Updating to add missing events: ${missingEvents.join(', ')}`)
      await stripe.webhookEndpoints.update(found.id, {
        enabled_events: [...found.enabled_events, ...missingEvents] as any,
      })
      console.log('  ✓ Updated')
    }

    console.log()
    console.log('⚠️  Signing secret is not re-shown by Stripe after creation.')
    console.log('   If you need it, delete this webhook in the Stripe dashboard and re-run this script.')
    return
  }

  // Create new webhook
  console.log(`Registering webhook at: ${WEBHOOK_URL}`)
  const webhook = await stripe.webhookEndpoints.create({
    url: WEBHOOK_URL,
    enabled_events: ENABLED_EVENTS as any,
    description: 'QRON app — sales fulfillment, subscription lifecycle',
  })

  console.log()
  console.log(`✓ Webhook registered!`)
  console.log(`  ID: ${webhook.id}`)
  console.log(`  Status: ${webhook.status}`)
  console.log(`  Events: ${webhook.enabled_events.join(', ')}`)
  console.log()
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  STRIPE_WEBHOOK_SECRET=' + webhook.secret)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log()
  console.log('Add this secret to:')
  console.log('  1. Vercel → qron-app → Settings → Environment Variables')
  console.log('  2. .env.local for local dev')
}

main().catch(err => {
  console.error('Fatal:', err.message ?? err)
  process.exit(1)
})
