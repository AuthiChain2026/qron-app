import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SUPA_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPA_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const CORS = { 'Content-Type': 'application/json' }

export async function GET(req: Request, { params }: { params: { shortcode: string } }) {
  const { shortcode } = params
  const [pr, sr] = await Promise.all([
    fetch(`${SUPA_URL}/rest/v1/portals?shortcode=eq.${shortcode}&select=shortcode,destination_url,label,style,image_url,scan_count,active,created_at`, {
      headers: { apikey: SUPA_ANON, Authorization: `Bearer ${SUPA_ANON}` }
    }),
    fetch(`${SUPA_URL}/rest/v1/portal_scans?shortcode=eq.${shortcode}&select=scanned_at,country,device_type&order=scanned_at.desc&limit=100`, {
      headers: { apikey: SUPA_ANON, Authorization: `Bearer ${SUPA_ANON}` }
    }),
  ])
  const [portals, scans] = await Promise.all([pr.json(), sr.json()])
  if (!portals?.length) return NextResponse.json({ error: 'Portal not found' }, { status: 404, headers: CORS })
  const portal = portals[0]
  const byCountry: Record<string, number> = {}
  const byDevice: Record<string, number> = {}
  for (const s of scans || []) {
    byCountry[s.country || 'Unknown'] = (byCountry[s.country || 'Unknown'] || 0) + 1
    byDevice[s.device_type || 'unknown'] = (byDevice[s.device_type || 'unknown'] || 0) + 1
  }
  return NextResponse.json({
    shortcode, portal_url: `https://qron.space/p/${shortcode}`,
    destination_url: portal.destination_url, label: portal.label,
    style: portal.style, image_url: portal.image_url,
    scan_count: portal.scan_count, active: portal.active,
    created_at: portal.created_at, by_country: byCountry, by_device: byDevice,
    recent_scans: (scans || []).slice(0, 10),
  }, { headers: CORS })
}
