import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Permanent R2 fallback — updated Apr 2 2026
const FALLBACK: {style:string;image_url:string;label:string}[] = [
  {style:"space",image_url:"https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775171932559-fydmix",label:"Cosmic Space — QRON"},
  {style:"space",image_url:"https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775171940530-mq0n40",label:"Cosmic Space — AuthiChain"},
  {style:"cannabis",image_url:"https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775171948136-8gerwu",label:"Cannabis — StrainChain"},
  {style:"cannabis",image_url:"https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775171955747-0dmfvv",label:"Cannabis — Dispensary"},
  {style:"cyberpunk",image_url:"https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775171963075-ij8mio",label:"Cyberpunk — AuthiChain"},
  {style:"cyberpunk",image_url:"https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775171970505-rgryam",label:"Cyberpunk — QRON"}
]

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase
      .from('qron_demos')
      .select('style, image_url, label, prompt')
      .order('created_at', { ascending: false })
      .limit(12)

    const demos = (!error && data && data.length > 0) ? data : FALLBACK
    return NextResponse.json({
      demos,
      source: (!error && data && data.length > 0) ? 'supabase' : 'fallback',
      count: demos.length,
    })
  } catch {
    return NextResponse.json({ demos: FALLBACK, source: 'fallback', count: FALLBACK.length })
  }
}
