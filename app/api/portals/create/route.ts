import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SUPA_URL  = 'https://nhdnkzhtadfkkluiulhs.supabase.co'
const SUPA_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZG5remh0YWRma2tsdWl1bGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzgyNTUsImV4cCI6MjA4OTUxNDI1NX0.akaWgxRilnjavzpsLqU149nBJqxDjbYOnRdAqrwz4J8'
const CORS = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

function shortid() {
  return Math.random().toString(36).slice(2, 10)
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { target_url, style, image_url, email, label, plan } = body
    if (!target_url) return NextResponse.json({ error: 'target_url required' }, { status: 400 })

    const shortcode = shortid()
    const portal_url = `https://qron.space/p/${shortcode}`
    const qr_url = portal_url  // the QR code should encode the portal URL, not the final destination

    const res = await fetch(`${SUPA_URL}/rest/v1/portals`, {
      method: 'POST',
      headers: {
        apikey: SUPA_ANON, Authorization: `Bearer ${SUPA_ANON}`,
        'Content-Type': 'application/json', Prefer: 'return=representation',
      },
      body: JSON.stringify({
        shortcode, destination_url: target_url, style: style || 'space',
        image_url: image_url || null, email: email || null,
        label: label || null, plan: plan || 'single',
        active: true, scan_count: 0,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      }),
    })

    const data = await res.json()
    if (!res.ok) return NextResponse.json({ error: 'DB error', detail: data }, { status: 500 })

    return NextResponse.json({
      success: true, shortcode, portal_url, qr_url, target_url,
      style: style || 'space', label,
      stats_url: `${portal_url}/stats`,
      qr_encode_url: portal_url,  // what to put INTO the QR code
    }, { headers: CORS })
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
