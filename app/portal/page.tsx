import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'QRON Living Portals — Dynamic QR Codes With Analytics',
  description: 'Change where your QR points without reprinting. Track every scan. QRON Living Portals give your QR codes a live, editable redirect with real-time analytics.',
  alternates: { canonical: 'https://qron.space/portal' },
}

const S = {
  page:   { background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' } as const,
  hero:   { maxWidth: '860px', margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' as const },
  tag:    { fontSize: '12px', color: '#c9a227', letterSpacing: '0.18em', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: '20px' },
  h1:     { fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' } as const,
  sub:    { color: '#888', fontSize: '17px', maxWidth: '580px', margin: '0 auto 40px', lineHeight: 1.6 } as const,
  cta:    { display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' as const },
  btn:    { background: '#c9a227', color: '#000', padding: '13px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' } as const,
  btnOut: { background: 'transparent', color: '#e5e5e5', padding: '13px 28px', borderRadius: '10px', border: '1px solid #333', fontWeight: 600, textDecoration: 'none', fontSize: '15px' } as const,
}

const FEATURES = [
  { icon: '🔄', title: 'Update Without Reprinting', desc: 'Change where your QR points anytime from your dashboard. New promo? Updated menu? Seasonal campaign? No reprint needed.' },
  { icon: '📊', title: 'Real-Time Scan Analytics', desc: 'Track every scan: device type, country, city, time of day. Know which packaging, placement, or campaign drives the most engagement.' },
  { icon: '🎨', title: 'AI Art, Fully Trackable', desc: 'Every Living Portal is also QRON AI art. Beautiful and branded — and now with a scan counter and redirect analytics behind it.' },
  { icon: '⚡', title: 'Global Edge Redirect', desc: 'Redirects execute in <100ms globally via Cloudflare edge. No noticeable latency between scanning and landing.' },
  { icon: '🔗', title: 'One Code, Infinite Campaigns', desc: 'Print one QR code on your packaging and update it for every campaign. The physical QR never changes.' },
  { icon: '💼', title: 'Every Industry', desc: 'Restaurants updating daily specials. Cannabis dispensaries switching COA pages. Brands routing seasonal drops. Real estate agent listings.' },
]

const HOW = [
  { n: '1', title: 'Create Portal', desc: 'Enter your destination URL. Get a unique Living Portal link (qron.space/p/xxxxx).' },
  { n: '2', title: 'Generate QR Art', desc: 'Use your portal URL as the QR input. QRON generates AI art around it.' },
  { n: '3', title: 'Print & Deploy', desc: 'Print on packaging, menus, signs. Customers scan and arrive at your destination.' },
  { n: '4', title: 'Update Anytime', desc: 'Change the destination from your dashboard. The printed QR stays unchanged.' },
]

const PLANS = [
  { name: 'Free', price: '$0', scans: '100/mo', portals: '1 portal', href: '/free-qr-generator', cta: 'Start Free', pop: false },
  { name: 'Starter', price: '$29', period: '/mo', scans: '5,000/mo', portals: '10 portals', href: '/api/checkout?planId=starter', cta: 'Get Starter', pop: true },
  { name: 'Creator', price: '$99', period: '/mo', scans: '25,000/mo', portals: '50 portals', href: '/api/checkout?planId=creator', cta: 'Get Creator', pop: false },
  { name: 'Studio', price: '$299', period: '/mo', scans: 'Unlimited', portals: 'Unlimited', href: '/api/checkout?planId=studio', cta: 'Get Studio', pop: false },
]

export default function PortalPage() {
  return (
    <div style={S.page}>
      <section style={S.hero}>
        <div style={S.tag}>QRON Living Portals — New</div>
        <h1 style={S.h1}>QR Codes That Never<br />Become Outdated</h1>
        <p style={S.sub}>Dynamic redirects. Real-time analytics. Change your destination anytime without reprinting a single label.</p>
        <div style={S.cta}>
          <Link href="/free-qr-generator" style={S.btn}>Create Free Portal →</Link>
          <Link href="#how" style={S.btnOut}>How It Works</Link>
        </div>
        <p style={{ color: '#555', fontSize: '13px', marginTop: '14px' }}>Free forever · 1 portal · 100 scans/month</p>
      </section>

      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px 72px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '16px' }}>
        {FEATURES.map(f => (
          <div key={f.title} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '28px', marginBottom: '10px' }}>{f.icon}</div>
            <div style={{ fontWeight: 700, marginBottom: '6px' }}>{f.title}</div>
            <div style={{ color: '#888', fontSize: '14px', lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </section>

      <section id="how" style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '64px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' as const }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '40px' }}>How Living Portals Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '24px' }}>
            {HOW.map(h => (
              <div key={h.n}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#c9a227', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, margin: '0 auto 12px', fontSize: '16px' }}>{h.n}</div>
                <div style={{ fontWeight: 700, marginBottom: '6px' }}>{h.title}</div>
                <div style={{ color: '#888', fontSize: '13px', lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px 80px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center' as const, marginBottom: '32px' }}>Plans</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '12px' }}>
          {PLANS.map(p => (
            <div key={p.name} style={{ background: p.pop ? 'rgba(201,162,39,0.06)' : '#111', border: `1px solid ${p.pop ? 'rgba(201,162,39,0.5)' : '#1e1e1e'}`, borderRadius: '12px', padding: '22px', position: 'relative' }}>
              {p.pop && <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: '#c9a227', color: '#000', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '0 0 8px 8px', whiteSpace: 'nowrap' }}>POPULAR</div>}
              <div style={{ fontSize: '12px', color: '#888', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' as const }}>{p.name}</div>
              <div style={{ fontSize: '2rem', fontWeight: 900 }}>{p.price}<span style={{ fontSize: '14px', color: '#888' }}>{p.period || ''}</span></div>
              <div style={{ fontSize: '12px', color: '#555', marginBottom: '12px' }}>{p.portals} · {p.scans} scans</div>
              <Link href={p.href} style={{ display: 'block', textAlign: 'center' as const, padding: '10px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', textDecoration: 'none', background: p.pop ? '#c9a227' : 'transparent', color: p.pop ? '#000' : '#e5e5e5', border: p.pop ? 'none' : '1px solid #333' }}>
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center' as const, color: '#555', fontSize: '13px', marginTop: '24px' }}>
          All paid plans include AI QR art generation credits + Living Portal analytics + destination updates
        </p>
      </section>
    </div>
  )
}
