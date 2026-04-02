import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { shortcode: string } }): Promise<Metadata> {
  return {
    title: `QRON Portal ${params.shortcode} — Scan Analytics`,
    description: 'Living Portal scan analytics powered by QRON.',
  }
}

async function getPortalStats(shortcode: string) {
  try {
    const res = await fetch(`https://qron.space/api/portals/${shortcode}/stats`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch { return null }
}

export default async function PortalStatsPage({ params }: { params: { shortcode: string } }) {
  const data = await getPortalStats(params.shortcode)
  const S = {
    page: { background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' } as const,
    card: { background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '24px', marginBottom: '16px' } as const,
    gold: { color: '#c9a227' } as const,
    muted: { color: '#666', fontSize: '14px' } as const,
    big: { fontSize: '3rem', fontWeight: 900, color: '#c9a227', lineHeight: 1 } as const,
  }
  if (!data) return (
    <div style={S.page}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ ...S.gold, fontSize: '1.5rem', marginBottom: '12px' }}>Portal not found</h1>
        <p style={S.muted}>This portal does not exist or has been removed.</p>
        <a href="https://qron.space/gig" style={{ color: '#c9a227' }}>Create a portal →</a>
      </div>
    </div>
  )
  const countries = Object.entries(data.by_country || {}).sort((a: [string, unknown], b: [string, unknown]) => (b[1] as number) - (a[1] as number)).slice(0, 5)
  const devices = Object.entries(data.by_device || {}).sort((a: [string, unknown], b: [string, unknown]) => (b[1] as number) - (a[1] as number))
  return (
    <div style={S.page}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '13px', color: '#c9a227', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '8px' }}>
            QRON LIVING PORTAL
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '4px' }}>
            {data.label || `Portal ${data.shortcode}`}
          </h1>
          <p style={S.muted}>
            <a href={`https://qron.space/p/${data.shortcode}`} style={{ color: '#c9a227' }}>
              qron.space/p/{data.shortcode}
            </a>
            {' '}→{' '}
            <a href={data.destination_url} style={{ color: '#888' }} target="_blank" rel="noopener">
              {data.destination_url?.slice(0, 50)}
            </a>
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Total Scans', value: data.scan_count || 0 },
            { label: 'Status', value: data.active ? '🟢 Live' : '🔴 Inactive' },
            { label: 'Style', value: data.style || 'space' },
          ].map(({ label, value }) => (
            <div key={label} style={S.card}>
              <div style={{ fontSize: '11px', color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{label}</div>
              <div style={typeof value === 'number' ? S.big : { fontSize: '1.1rem', fontWeight: 700 }}>{value}</div>
            </div>
          ))}
        </div>

        {/* QR Art */}
        {data.image_url && (
          <div style={{ ...S.card, display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
            <img src={data.image_url} alt="QRON AI QR Art" style={{ width: '120px', height: '120px', borderRadius: '8px', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Your Living Portal QR</div>
              <p style={S.muted}>This code redirects to your URL and tracks every scan. Update the destination without reprinting.</p>
              <a href={data.image_url} download style={{ color: '#c9a227', fontSize: '13px', fontWeight: 700 }}>⬇ Download PNG</a>
            </div>
          </div>
        )}

        {/* Geo breakdown */}
        {countries.length > 0 && (
          <div style={S.card}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#c9a227', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Scans by Country</h2>
            {countries.map(([country, count]) => (
              <div key={country} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>
                <span style={{ fontSize: '14px' }}>{country || 'Unknown'}</span>
                <span style={{ color: '#c9a227', fontWeight: 700 }}>{String(count)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Device breakdown */}
        {devices.length > 0 && (
          <div style={S.card}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#c9a227', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Device Breakdown</h2>
            {devices.map(([device, count]) => (
              <div key={device} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>
                <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>{device}</span>
                <span style={{ color: '#c9a227', fontWeight: 700 }}>{String(count)}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a href="https://qron.space/gig" style={{ color: '#c9a227', fontSize: '14px' }}>
            Create your own Living Portal →
          </a>
        </div>
      </div>
    </div>
  )
}
