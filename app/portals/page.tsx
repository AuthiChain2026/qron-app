'use client'
import { useState, useEffect } from 'react'

interface Portal {
  shortcode: string
  destination_url: string
  label: string
  style: string
  image_url: string
  scan_count: number
  active: boolean
  created_at: string
}

export default function PortalsDashboard() {
  const [portals, setPortals] = useState<Portal[]>([])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const SUPA_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const SUPA_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  async function lookupPortals() {
    if (!email.trim()) return
    setLoading(true)
    try {
      const res = await fetch(
        `${SUPA_URL}/rest/v1/portals?email=eq.${encodeURIComponent(email)}&select=shortcode,destination_url,label,style,image_url,scan_count,active,created_at&order=created_at.desc`,
        { headers: { apikey: SUPA_ANON, Authorization: `Bearer ${SUPA_ANON}` } }
      )
      const data = await res.json()
      setPortals(Array.isArray(data) ? data : [])
      setSearched(true)
    } catch { setPortals([]); setSearched(true) }
    finally { setLoading(false) }
  }

  const S = {
    page: { background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' } as const,
    card: { background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '20px', marginBottom: '12px' } as const,
    input: { width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(201,162,39,.2)', borderRadius: '8px', color: '#e5e5e5', fontSize: '15px', padding: '11px 13px', outline: 'none', fontFamily: 'inherit' } as const,
    btn: { padding: '11px 24px', background: '#c9a227', color: '#000', fontWeight: 700, border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' } as const,
  }

  return (
    <div style={S.page}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '13px', color: '#c9a227', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '8px' }}>QRON LIVING PORTALS</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>Your Portals</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>Enter your email to view your AI QR portals and scan analytics.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <input style={S.input} type="email" placeholder="your@email.com"
            value={email} onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && lookupPortals()} />
          <button style={S.btn} onClick={lookupPortals} disabled={loading}>
            {loading ? 'Looking up...' : 'View Portals'}
          </button>
        </div>

        {searched && portals.length === 0 && (
          <div style={{ ...S.card, textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>No portals found</div>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>No portals linked to that email. Purchase a QRON design to create your first portal.</p>
            <a href="/gig" style={{ background: '#c9a227', color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>Create Portal →</a>
          </div>
        )}

        {portals.map(p => (
          <div key={p.shortcode} style={S.card}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              {p.image_url && (
                <img src={p.image_url} alt="QR Art" style={{ width: '72px', height: '72px', borderRadius: '6px', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700 }}>{p.label || `Portal ${p.shortcode}`}</span>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '100px',
                    background: p.active ? 'rgba(34,197,94,.15)' : 'rgba(239,68,68,.15)',
                    color: p.active ? '#22c55e' : '#ef4444', fontWeight: 700 }}>
                    {p.active ? 'LIVE' : 'INACTIVE'}
                  </span>
                </div>
                <div style={{ color: '#888', fontSize: '13px', marginBottom: '8px' }}>
                  → {p.destination_url?.slice(0, 60)}{p.destination_url?.length > 60 ? '...' : ''}
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#c9a227' }}>
                  <span>📱 {p.scan_count} scans</span>
                  <a href={`/portals/${p.shortcode}`} style={{ color: '#c9a227' }}>View Analytics →</a>
                  <a href={`https://qron.space/p/${p.shortcode}`} target="_blank" rel="noopener" style={{ color: '#888' }}>Test Link</a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {portals.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <a href="/gig" style={{ color: '#c9a227', fontSize: '14px' }}>+ Add another portal →</a>
          </div>
        )}
      </div>
    </div>
  )
}
