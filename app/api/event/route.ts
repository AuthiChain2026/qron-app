import { NextRequest, NextResponse } from 'next/server'
import { writeActivityEvent } from '@/lib/activity-store'

export const dynamic = 'force-dynamic'

const ALLOWED_EVENTS = new Set([
  'qr_generated',
  'qr_downloaded',
  'qr_shared',
  'nft_minted',
  'wallet_connected',
  'wallet_disconnected',
  'verify_success',
  'verify_failed',
  'verify_error',
  'checkout_started',
  'checkout_completed',
  'page_view',
])

const MAX_DETAILS_BYTES = 4096

function sanitizeDetails(details: unknown): Record<string, unknown> | undefined {
  if (!details || typeof details !== 'object' || Array.isArray(details)) return undefined
  const serialized = JSON.stringify(details)
  if (!serialized || serialized.length > MAX_DETAILS_BYTES) return undefined
  return details as Record<string, unknown>
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }

    const type = String(body?.type || '')
    if (!ALLOWED_EVENTS.has(type)) {
      return NextResponse.json({ error: 'Unsupported event type' }, { status: 400 })
    }

    const event = {
      type,
      timestamp: new Date().toISOString(),
      details: sanitizeDetails(body?.details),
    }

    await writeActivityEvent(event)

    // Optional forwarding to external analytics (ANALYTICS_API_URL env var)
    if (process.env.ANALYTICS_API_URL) {
      fetch(process.env.ANALYTICS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      }).catch((err) => console.warn('[event] analytics forward failed:', err))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[event] failed:', err)
    return NextResponse.json({ error: 'Failed to log event' }, { status: 500 })
  }
}
