import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SUPABASE_URL  = 'https://nhdnkzhtadfkkluiulhs.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZG5remh0YWRma2tsdWl1bGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MDY2NjIsImV4cCI6MjA4ODA4MjY2Mn0.I1C3GCx2fU9CjxFtOqe56fwnJRDFwEMvwjqEWO_b-e4'

// Fresh Replicate-generated fallback demos (permanent CDN URLs)
const FALLBACK_DEMOS = [
  { id: 'f1', label: 'Cosmic Space',     style: 'space',    image_url: 'https://replicate.delivery/xezq/xfjMzQAmKerXQUJm2p5o8z7ktnhH' },
  { id: 'f2', label: 'Cannabis Green',   style: 'cannabis', image_url: 'https://replicate.delivery/xezq/VkjNko7paaaXOxGNbPe7xfLr5Vef' },
  { id: 'f3', label: 'Nature Botanical', style: 'nature',   image_url: 'https://replicate.delivery/xezq/lg67W8lA0U6hNpheNd4qwjhY6CeA' },
  { id: 'f4', label: 'Abstract Minimal', style: 'abstract', image_url: 'https://replicate.delivery/xezq/V5YE6JgGoOo9NdqNpVIgEIIcgnlE' },
  { id: 'f5', label: 'Retro Vintage',    style: 'retro',    image_url: 'https://replicate.delivery/xezq/WRWPl2iYpSbGOFfXzOFpJypyrzsx' },
  { id: 'f6', label: 'Cyberpunk Neon',   style: 'cyberpunk',image_url: 'https://replicate.delivery/xezq/Ov5TChgEuXbeEaldo3M43828ItEiuox0O' },
]

export async function GET() {
  const cors = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

  // Try Supabase with anon key (RLS allows public reads on qron_demos)
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/qron_demos?select=id,label,style,image_url&image_url=not.is.null&order=generated_at.desc&limit=12`,
      {
        headers: {
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
        },
        next: { revalidate: 60 },
      }
    )
    if (res.ok) {
      const demos = await res.json()
      if (Array.isArray(demos) && demos.length > 0) {
        return NextResponse.json({ demos, source: 'supabase' }, { headers: cors })
      }
    }
  } catch { /* fall through */ }

  // Always return something visual
  return NextResponse.json({ demos: FALLBACK_DEMOS, source: 'fallback' }, { headers: cors })
}
