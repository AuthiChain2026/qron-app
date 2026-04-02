import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SUPABASE_URL  = 'https://nhdnkzhtadfkkluiulhs.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZG5remh0YWRma2tsdWl1bGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzgyNTUsImV4cCI6MjA4OTUxNDI1NX0.akaWgxRilnjavzpsLqU149nBJqxDjbYOnRdAqrwz4J8'

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
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/qron_demos?select=id,label,style,image_url&image_url=not.is.null&order=generated_at.desc&limit=12`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: 'no-store' }
    )
    if (res.ok) {
      const demos = await res.json()
      if (Array.isArray(demos) && demos.length > 0) {
        return NextResponse.json({ demos, source: 'supabase' }, { headers: cors })
      }
    }
  } catch { /* fall through */ }
  return NextResponse.json({ demos: FALLBACK_DEMOS, source: 'fallback' }, { headers: cors })
}
