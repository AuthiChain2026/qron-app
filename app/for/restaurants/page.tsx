import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI QR Code Art for Restaurants — Menu Links That Get Scanned',
  description: 'Replace boring black menu QR codes with AI-generated art. Cannabis-quality artwork meets restaurant practicality.',
  keywords: 'restaurant qr code menu, ai qr code for restaurants, menu qr code art',
  alternates: { canonical: 'https://qron.space/for/restaurants' },
}

export default function Page() {
  const S = {
    page:  { background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' } as const,
    hero:  { maxWidth: '900px', margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' as const },
    h1:    { fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' } as const,
    sub:   { color: '#888', fontSize: '17px', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 } as const,
    badge: { background: 'rgba(201,162,39,.1)', border: '1px solid rgba(201,162,39,.3)', color: '#c9a227', fontSize: '12px', fontWeight: 600, padding: '5px 14px', borderRadius: '100px' } as const,
    stat:  { background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '24px', textAlign: 'center' as const } as const,
    cta:   { background: '#c9a227', color: '#000', padding: '14px 32px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '15px', display: 'inline-block' } as const,
  }
  return (
    <div style={S.page}>
      <section style={S.hero}>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          {['✅ AI-Generated', '📱 Scan-Tested', '🔄 Living Portal', '⚡ 24h Delivery'].map(b => (
            <span key={b} style={S.badge}>{b}</span>
          ))}
        </div>
        <h1 style={S.h1}><span>Restaurant Menu QR Codes</span><br/><span style={{ color: '#c9a227' }}>Customers Actually Scan</span></h1>
        <p style={S.sub}>Standard menu QR codes get ignored. QRON creates AI-generated art that makes customers scan — and come back.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Link href="/gig" style={S.cta}>Create Your Menu Portal →</Link>
          <Link href="/free-qr-generator" style={{ ...S.cta, background: 'transparent', color: '#e5e5e5', border: '1px solid #333' }}>Try Free First</Link>
        </div>
      </section>

      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '48px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {[
            { n: '3×', l: 'scan rate vs standard codes' },
            { n: '40%', l: 'customers photograph and share' },
            { n: '0min', l: 'reprinting when menu changes' },
          ].map(s => (
            <div key={s.n} style={S.stat}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#c9a227', lineHeight: 1, marginBottom: '6px' }}>{s.n}</div>
              <div style={{ color: '#666', fontSize: '13px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '32px', textAlign: 'center' }}>Use Cases</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '12px', marginBottom: '48px' }}>
              <div key="Table tent codes" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '18px 20px' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>Table tent codes</div>
                <div style={{ color: '#666', fontSize: '13px' }}>Link to digital menus, daily specials, or wine lists</div>
              </div>
              <div key="Takeout packaging" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '18px 20px' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>Takeout packaging</div>
                <div style={{ color: '#666', fontSize: '13px' }}>Loyalty programs and reorder links</div>
              </div>
              <div key="Window signage" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '18px 20px' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>Window signage</div>
                <div style={{ color: '#666', fontSize: '13px' }}>Hours, reservations, Google reviews</div>
              </div>
              <div key="Event menus" style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '18px 20px' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>Event menus</div>
                <div style={{ color: '#666', fontSize: '13px' }}>Catering events with branded art</div>
              </div>
        </div>

        <div style={{ background: 'rgba(201,162,39,.06)', border: '1px solid rgba(201,162,39,.2)', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
          <h3 style={{ fontWeight: 800, marginBottom: '8px' }}>Styles that work: nature, abstract, retro, minimalist</h3>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
            All 6 QRON styles work for this use case. Try the free generator to preview before buying.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/gig" style={S.cta}>Order Now ($49+) →</Link>
            <Link href="/free-qr-generator" style={{ ...S.cta, background: '#222', color: '#e5e5e5', border: '1px solid #333' }}>Free Preview</Link>
          </div>
        </div>
      </section>

      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '48px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>What is a Living Portal?</h2>
          <p style={{ color: '#888', lineHeight: 1.7, fontSize: '15px', marginBottom: '24px' }}>
            Every QRON code is a Living Portal — a shortcode URL that redirects to your destination and tracks every scan.
            You can update the destination any time without reprinting. See country, device, and time-of-day for every scan at your portal dashboard.
          </p>
          <Link href="/portals" style={{ color: '#c9a227', fontWeight: 700 }}>View portal analytics demo →</Link>
        </div>
      </section>
    </div>
  )
}
