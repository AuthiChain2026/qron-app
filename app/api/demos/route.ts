import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SVC = process.env.SUPABASE_SERVICE_ROLE_KEY

// Hardcoded fallback demos so the gallery always has content
const FALLBACK_DEMOS = [
  { id: 'f1', label: 'Cosmic Space',     style: 'space',     image_url: 'https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775089635376-space.png' },
  { id: 'f2', label: 'Cannabis Green',   style: 'cannabis',  image_url: 'https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775089639488-cannabis.png' },
  { id: 'f3', label: 'Cyberpunk Neon',   style: 'cyberpunk', image_url: 'https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775089643932-cyberpunk.png' },
  { id: 'f4', label: 'Nature Botanical', style: 'nature',    image_url: 'https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775089648005-nature.png' },
  { id: 'f5', label: 'Abstract Minimal', style: 'abstract',  image_url: 'https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775089651999-abstract.png' },
  { id: 'f6', label: 'Retro Vintage',    style: 'retro',     image_url: 'https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775089656923-retro.png' },
]

export async function GET() {
  const cors = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

  // Try to fetch from Supabase with service role key
  if (SUPABASE_URL && SUPABASE_SVC) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/qron_demos?select=id,label,style,image_url&image_url=not.is.null&order=generated_at.desc&limit=12`,
        {
          headers: {
            apikey: SUPABASE_SVC,
            Authorization: `Bearer ${SUPABASE_SVC}`,
          },
        }
      )
      if (res.ok) {
        const demos = await res.json()
        if (Array.isArray(demos) && demos.length > 0) {
          return NextResponse.json({ demos, source: 'supabase' }, { headers: cors })
        }
      }
    } catch { /* fallback below */ }
  }

  // Always return something
  return NextResponse.json({ demos: FALLBACK_DEMOS, source: 'fallback' }, { headers: cors })
}
