import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Real Estate QR Code Art — Yard Signs That Track Every Lead | QRON',
  description: 'AI QR code art for property listings. Track every scan by country. Update listing URL when property sells. From $49.',
  alternates: { canonical: 'https://qron.space/for/real-estate' },
}

export default function RealEstatePage() {
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

  const badges = ['Lead Tracking', 'Country Analytics', 'Update Anytime', 'Professional Art']
  const stats = [{ n: 'GPS', l: 'country tracked per scan' }, { n: '$0', l: 'cost to update listing URL' }, { n: '768px', l: 'print-ready PNG' }]
  const ucs = [
    { t: 'Yard signs', d: 'Virtual tours, MLS listings, open house RSVPs' },
    { t: 'Brochures', d: 'Track how many brochure codes get scanned' },
    { t: 'Agent cards', d: 'Update your portfolio link without reprinting' },
    { t: 'Open house flyers', d: 'Real-time scan count shows buyer interest' },
  ]
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '80px 24px 56px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          {badges.map(b => <span key={b} style={{ background: 'rgba(201,162,39,.1)', border: '1px solid rgba(201,162,39,.3)', color: gold, fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px' }}>{b}</span>)}
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '18px' }}>
          Property Listing QR Codes<br /><span style={{ color: gold }}>That Track Every Lead</span>
        </h1>
        <p style={{ color: '#888', fontSize: '16px', maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Every yard sign is a lead gen touchpoint. QRON creates premium AI QR art that tracks scan country, device, and time — and lets you update the listing URL when a property sells without printing new signs.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/gig" style={{ background: gold, color: '#000', padding: '13px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>Create Listing Portal — $49 →</Link>
          <Link href="/free-qr-generator" style={{ background: 'transparent', color: '#e5e5e5', border: '1px solid #333', padding: '13px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>Try Free</Link>
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
        <div style={{ background: 'rgba(201,162,39,.06)', border: '1px solid rgba(201,162,39,.2)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '12px' }}>When a property sells, update the portal destination to your next listing. The printed sign never changes.</p>
          <Link href="/portals" style={{ color: gold, fontWeight: 700, fontSize: '14px' }}>View portal analytics →</Link>
        </div>
      </section>
    </div>
  )
}