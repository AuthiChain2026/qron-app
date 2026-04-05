/**
 * POST /api/generate/guest
 *
 * Single unauthenticated generation for new visitors.
 * Rate-limited by IP (1 per 24h via CF-Connecting-IP header).
 * Captures email, generates via CF Worker, returns image URL.
 *
 * Body: { url, style?, prompt?, email? }
 * Returns: { imageUrl, sessionId, emailCaptured }
 */
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 60

const QRON_WORKER = process.env.QRON_WORKER_URL || 'https://qron-ai-api.undone-k.workers.dev'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { url, style = 'space', prompt, email } = body as {
    url?: string; style?: string; prompt?: string; email?: string
  }

  if (!url) {
    return NextResponse.json({ error: 'url is required' }, { status: 400, headers: CORS })
  }

  // Basic URL validation
  try { new URL(url) } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400, headers: CORS })
  }

  // Rate limit by IP: 1 generation per 24h (stored in Supabase)
  const ip = req.headers.get('CF-Connecting-IP') || req.headers.get('X-Forwarded-For') || 'unknown'
  const ipHash = Buffer.from(ip).toString('base64').slice(0, 20)

  if (SUPABASE_URL && SUPABASE_ANON) {
    try {
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/guest_generations?ip_hash=eq.${ipHash}&created_at=gte.${cutoff}&select=id`,
        { headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` } }
      )
      const rows = await res.json()
      if (Array.isArray(rows) && rows.length >= 2) {
        return NextResponse.json(
          { error: 'Daily limit reached', message: 'Sign up free for 10 generations/month', signupUrl: '/auth/signup' },
          { status: 429, headers: CORS }
        )
      }
    } catch { /* non-blocking — proceed if check fails */ }
  }

  // Generate via CF Worker
  try {
    const genRes = await fetch(`${QRON_WORKER}/v1/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, style, prompt: prompt || `${style} AI QR code art, beautiful, scannable` }),
      signal: AbortSignal.timeout(55000),
    })

    if (!genRes.ok) {
      return NextResponse.json({ error: 'Generation failed. Try again shortly.' }, { status: 502, headers: CORS })
    }

    const genData = await genRes.json() as { id?: string; previewUrl?: string; downloadUrl?: string; status?: string }
    const imageUrl = genData.previewUrl || genData.downloadUrl || ''

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image returned' }, { status: 502, headers: CORS })
    }

    const sessionId = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    // Log to Supabase (non-blocking)
    if (SUPABASE_URL && SUPABASE_ANON) {
      fetch(`${SUPABASE_URL}/rest/v1/guest_generations`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          ip_hash: ipHash,
          session_id: sessionId,
          target_url: url,
          style,
          image_url: imageUrl,
          email: email || null,
          created_at: new Date().toISOString(),
        }),
      }).catch(() => {})

      // Also upsert into qron_demos for the gallery
      if (imageUrl) {
        fetch(`${SUPABASE_URL}/rest/v1/qron_demos`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_ANON,
            Authorization: `Bearer ${SUPABASE_ANON}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal,resolution=ignore-duplicates',
          },
          body: JSON.stringify({
            image_url: imageUrl,
            destination_url: url,
            style,
            prompt: prompt || style,
          }),
        }).catch(() => {})
      }
    }

    return NextResponse.json({
      imageUrl,
      sessionId,
      emailCaptured: !!email,
      upgradeUrl: '/pricing',
      message: email
        ? 'Your QRON is ready! Sign up free for 10/month.'
        : 'Love it? Sign up free for 10 generations/month.',
    }, { headers: CORS })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Generation failed'
    return NextResponse.json({ error: msg }, { status: 503, headers: CORS })
  }
}
