import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
export const maxDuration = 60; export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseAnonKey) return NextResponse.json({ message: 'Server configuration error' }, { status: 500 })
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ message: 'Authentication required.' }, { status: 401 })
    let body: { targetUrl?: string; prompt?: string; presetId?: string; mode?: string }
    try { body = await request.json() } catch { return NextResponse.json({ message: 'Invalid JSON.' }, { status: 400 }) }
    const { targetUrl, prompt, presetId, mode = 'static' } = body
    if (!targetUrl) return NextResponse.json({ message: 'Destination URL is required.' }, { status: 400 })
    if (!prompt && !presetId) return NextResponse.json({ message: 'A prompt or preset is required.' }, { status: 400 })
    const edgeRes = await fetch(`${supabaseUrl}/functions/v1/qron-generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}`, 'apikey': supabaseAnonKey },
      body: JSON.stringify({ url: targetUrl, prompt, presetId, mode }),
    })
    const data = await edgeRes.json() as { qron?: unknown; error?: string; code?: string }
    if (!edgeRes.ok) {
      if (data.code === 'LIMIT_REACHED' || edgeRes.status === 403) return NextResponse.json({ message: data.error }, { status: 403 })
      return NextResponse.json({ message: data.error || 'Generation failed.' }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (err: unknown) { return NextResponse.json({ message: err instanceof Error ? err.message : 'Unexpected error.' }, { status: 500 }) }
}
export async function GET() { return NextResponse.json({ status: 'ok', backend: 'qron-generate', model: 'fal-ai/illusion-diffusion' }) }
