import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SUPA_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPA_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const CORS = { 'Content-Type': 'application/json' }

export async function GET(req: Request) {
  try {
    const sid = new URL(req.url).searchParams.get('session_id')
    if (!sid) return NextResponse.json({ error: 'session_id required' }, { status: 400, headers: CORS })
  
    const [deliveryRes, portalRes] = await Promise.all([
      fetch(`${SUPA_URL}/rest/v1/qron_deliveries?stripe_session_id=eq.${sid}&select=image_url,qr_url,delivered_at,customer_email`, {
        headers: { apikey: SUPA_ANON, Authorization: `Bearer ${SUPA_ANON}` }
      }),
      fetch(`${SUPA_URL}/rest/v1/portals?order_ref=eq.${sid}&select=shortcode,destination_url,scan_count,active,qr_url,image_url,label`, {
        headers: { apikey: SUPA_ANON, Authorization: `Bearer ${SUPA_ANON}` }
      }),
    ])
  
    const deliveries = await deliveryRes.json().catch(() => [])
    const portals    = await portalRes.json().catch(() => [])
  
    const delivery = deliveries[0] || null
    const portal   = portals[0] || null
  
    const ready = !!(delivery?.image_url || portal?.image_url)
    const imageUrl = delivery?.image_url || portal?.image_url || null
    const portalShortcode = portal?.shortcode || null
    const portalUrl = portalShortcode ? `https://qron.space/p/${portalShortcode}` : null
    const statsUrl  = portalShortcode ? `https://qron.space/portals/${portalShortcode}` : null
  
    return NextResponse.json({
      ready, imageUrl, portalUrl, statsUrl, portalShortcode,
      destination_url: portal?.destination_url || delivery?.qr_url || null,
      delivered_at: delivery?.delivered_at || null,
      email: delivery?.customer_email || null,
    }, { headers: CORS })
  } catch (err: any) {
    console.error('[GET] error:', err);
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}
