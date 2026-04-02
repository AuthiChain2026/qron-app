import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Restaurant QR Code Art — Menu Links Customers Actually Scan | QRON',
  description: 'AI-generated botanical QR codes for restaurants. 3x higher scan rate. Update menu links anytime without reprinting.',
  alternates: { canonical: 'https://qron.space/for/restaurants' },
}

export default function RestaurantsPage() {
  const gold = '#c9a227'

  const StatCard = ({ n, l }: { n: string; l: string }) => (
    <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
      <div style={{ fontSize: '2.2rem', fontWeight: 900, color: gold, lineHeight: 1, marginBottom: '4px' }}>{n}</div>
      <div style={{ color: '#666', fontSize: '12px' }}>{l}</div>
    </div>
  )
  const UcCard = ({ t, d }: { t: string; d: string }) => (
    <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '18px 20px' }}>
      <div style={{ fontWeight: 700, marginBottom: '4px' }}>{t}</div>
      <div style={{ color: '#666', fontSize: '13px' }}>{d}</div>
    </div>
  )

  const badges = ['AI-Generated Art', '3x Scan Rate', 'Update Anytime', '24h Delivery']
  const stats = [{ n: '3×', l: 'scan rate vs plain codes' }, { n: '40%', l: 'customers photograph and share' }, { n: '$0', l: 'cost to update menu link' }]
  const ucs = [
    { t: 'Table tent codes', d: 'Digital menus, daily specials, wine lists' },
    { t: 'Takeout packaging', d: 'Loyalty programs and reorder links' },
    { t: 'Window signage', d: 'Hours, reservations, Google reviews' },
    { t: 'Event menus', d: 'Catering events with branded art' },
  ]
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '80px 24px 56px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          {badges.map(b => <span key={b} style={{ background: 'rgba(201,162,39,.1)', border: '1px solid rgba(201,162,39,.3)', color: gold, fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px' }}>{b}</span>)}
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '18px' }}>
          Restaurant Menu QR Codes<br /><span style={{ color: gold }}>Customers Actually Scan</span>
        </h1>
        <p style={{ color: '#888', fontSize: '16px', maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Standard menu QR codes get ignored. QRON creates AI botanical art that makes customers scan — and come back. Update the menu link any time without reprinting a single tent card.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/gig" style={{ background: gold, color: '#000', padding: '13px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>Create Restaurant Portal — $49 →</Link>
          <Link href="/free-qr-generator" style={{ background: 'transparent', color: '#e5e5e5', border: '1px solid #333', padding: '13px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>Try Free First</Link>
        </div>
      </section>
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '40px 24px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {stats.map(s => <StatCard key={s.n} n={s.n} l={s.l} />)}
        </div>
      </section>
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 24px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>Use Cases</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '10px', marginBottom: '40px' }}>
          {ucs.map(uc => <UcCard key={uc.t} t={uc.t} d={uc.d} />)}
        </div>
        <div style={{ background: 'rgba(201,162,39,.06)', border: '1px solid rgba(201,162,39,.2)', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
          <h3 style={{ fontWeight: 800, marginBottom: '8px' }}>Best style: Nature Botanical</h3>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>Earthy, lush, organic — matches any restaurant aesthetic. All 6 styles available.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/gig" style={{ background: gold, color: '#000', padding: '11px 24px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>Order Now →</Link>
            <Link href="/free-qr-generator" style={{ background: '#1a1a1a', color: '#e5e5e5', border: '1px solid #333', padding: '11px 24px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>Free Preview</Link>
          </div>
        </div>
      </section>
    </div>
  )
}