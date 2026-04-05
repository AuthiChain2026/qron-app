import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PORTAL_FN   = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/portal-create`
const CORS = { 'Content-Type': 'application/json' }

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Proxy to Supabase edge fn which has service role key (bypasses RLS)
    const res = await fetch(PORTAL_FN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.ok ? 200 : res.status, headers: CORS })
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500, headers: CORS })
  }
}
