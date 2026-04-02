import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SUPA_URL  = 'https://nhdnkzhtadfkkluiulhs.supabase.co'
const SUPA_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZG5remh0YWRma2tsdWl1bGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzgyNTUsImV4cCI6MjA4OTUxNDI1NX0.akaWgxRilnjavzpsLqU149nBJqxDjbYOnRdAqrwz4J8'
const PORTAL_FN = 'https://nhdnkzhtadfkkluiulhs.supabase.co/functions/v1/portal-create'
const CORS = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

export async function POST(req: Request) {
  let body: { shortcode?: string; new_url?: string; email?: string } = {}
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
  
  const { shortcode, new_url, email } = body
  if (!shortcode || !new_url) return NextResponse.json({ error: 'shortcode and new_url required' }, { status: 400 })
  
  try { new URL(new_url) } catch { return NextResponse.json({ error: 'Invalid URL' }, { status: 400 }) }

  // Verify ownership via email (simple auth for now)
  if (email) {
    const check = await fetch(`${SUPA_URL}/rest/v1/portals?shortcode=eq.${shortcode}&email=eq.${encodeURIComponent(email)}&select=shortcode`, {
      headers: { apikey: SUPA_ANON, Authorization: `Bearer ${SUPA_ANON}` }
    })
    const rows = await check.json().catch(() => [])
    if (!rows.length) return NextResponse.json({ error: 'Portal not found or email mismatch' }, { status: 403 })
  }

  // Update via portal-create function (uses service key)
  const res = await fetch(`${PORTAL_FN}/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shortcode, new_url }),
  })
  
  if (!res.ok) {
    // Fallback: direct anon update (if RLS allows)
    const upd = await fetch(`${SUPA_URL}/rest/v1/portals?shortcode=eq.${shortcode}`, {
      method: 'PATCH',
      headers: { apikey: SUPA_ANON, Authorization: `Bearer ${SUPA_ANON}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify({ destination_url: new_url, updated_at: new Date().toISOString() })
    })
    if (!upd.ok) return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true, shortcode, new_url, portal_url: `https://qron.space/p/${shortcode}` }, { headers: CORS })
}
