import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
export const maxDuration = 60; export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseAnonKey) return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await request.json().catch(() => ({})) as { url?: string; prompt?: string; mode?: string; presetId?: string }
    const edgeRes = await fetch(`${supabaseUrl}/functions/v1/qron-generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}`, 'apikey': supabaseAnonKey },
      body: JSON.stringify(body),
    })
    const data = await edgeRes.json()
    if (!edgeRes.ok) return NextResponse.json({ error: (data as {error?:string}).error || 'Generation failed' }, { status: edgeRes.status })
    const qron = (data as {qron?:{imageUrl?:string;destinationUrl?:string;prompt?:string}}).qron
    return NextResponse.json({ imageUrl: qron?.imageUrl, qrDataUrl: qron?.imageUrl, prompt: qron?.prompt, url: qron?.destinationUrl, qron })
  } catch (err: unknown) { return NextResponse.json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 }) }
}
export async function GET() { return NextResponse.json({ status: 'ok', model: 'fal-ai/illusion-diffusion' }) }
