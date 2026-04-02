import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'QRON AI QR Art — Order Your Custom Design',
  description: 'Order stunning AI-generated QR codes. $49 single design, $199 brand pack. Cannabis, restaurant, retail, and event QR art. 100% scannable.',
  alternates: { canonical: 'https://qron.space/gig' },
}

const S = {
  page:    { background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' } as const,
  hero:    { maxWidth: '900px', margin: '0 auto', padding: '72px 24px 48px', textAlign: 'center' as const },
  logo:    { fontSize: '13px', fontWeight: 700, color: '#c9a227', letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: '24px' },
  h1:      { fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' } as const,
  sub:     { color: '#888', fontSize: '17px', maxWidth: '580px', margin: '0 auto 40px', lineHeight: 1.6 } as const,
  badges:  { display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' as const, marginBottom: '48px' },
  badge:   { background: 'rgba(201,162,39,.1)', border: '1px solid rgba(201,162,39,.3)', color: '#c9a227', fontSize: '12px', fontWeight: 600, padding: '5px 14px', borderRadius: '100px' } as const,
}

const PLANS = [
  {
    name: 'Single Design',
    price: '$49',
    period: 'one-time',
    desc: '1 AI QR code in your chosen style. High-res PNG, commercial use, 24h delivery.',
    features: ['1 AI QR code', 'All 6 art styles', '768px high-res PNG', 'Commercial use license', '24h delivery', '1 revision'],
    cta: 'Order Single →',
    href: 'https://qron-fiverr.undone-k.workers.dev/buy',
    plan: 'single',
    popular: false,
  },
  {
    name: 'Brand Pack',
    price: '$199',
    period: 'one-time · 5 designs',
    desc: '5 AI QR codes with matched brand theme. Bulk ZIP, priority generation.',
    features: ['5 AI QR codes', 'Matched brand theme', 'Priority generation', 'Bulk ZIP delivery', 'Commercial use', '2 revisions each'],
    cta: 'Order Brand Pack →',
    href: 'https://qron-fiverr.undone-k.workers.dev/buy',
    plan: 'pack',
    popular: true,
  },
  {
    name: 'Monthly Plan',
    price: '$29',
    period: '/month',
    desc: '10 credits/month. Dashboard access. Auto-renewal. Cancel anytime.',
    features: ['10 credits/month', 'Dashboard + history', 'API access', 'Email delivery', 'Credits roll over', 'Priority support'],
    cta: 'Start Monthly →',
    href: '/pricing',
    plan: 'starter',
    popular: false,
  },
]

const STYLES = [
  { emoji: '🚀', name: 'Cosmic Space',   desc: 'Deep galaxy, nebula, purple and gold' },
  { emoji: '🌿', name: 'Cannabis',        desc: 'Emerald botanical, premium green' },
  { emoji: '⚡', name: 'Cyberpunk',       desc: 'Neon grid, electric blue circuits' },
  { emoji: '🍃', name: 'Nature',          desc: 'Watercolor botanical, earthy tones' },
  { emoji: '◆',  name: 'Abstract',        desc: 'Geometric minimal, gold and black' },
  { emoji: '📻', name: 'Retro Vintage',   desc: 'Warm americana, aged texture' },
]

const FAQ = [
  { q: 'Does it actually scan?', a: 'Yes — every QRON code is tested for scannability using ControlNet AI that preserves the QR structure at 30% error correction. Works on any iPhone or Android.' },
  { q: 'What URL should I encode?', a: 'Any URL — menu, website, COA page, product page, social profile, or any link you choose. You provide the URL, we create the art.' },
  { q: 'How long does delivery take?', a: 'Single designs generate in 30–60 seconds. Brand packs (5 designs) deliver within 1 hour. We email you the download link.' },
  { q: 'Can I match my brand colors?', a: 'Yes — describe your brand in the notes field and our AI adapts. Premium color matching available on brand packs.' },
  { q: 'Can I use these commercially?', a: 'Yes. All QRON designs include a commercial use license. Use on packaging, signage, business cards, menus, and any print or digital materials.' },
  { q: 'What if I need a refund?', a: 'Email authichain@gmail.com within 7 days for a full refund if you are not happy with the result.' },
]

function CheckoutButton({ plan, cta, href, isPack }: { plan: string; cta: string; href: string; isPack?: boolean }) {
  return (
    <a
      href={href}
      onClick={async (e) => {
        e.preventDefault()
        const email = window.prompt('Your email for receipt (optional):') || undefined
        const res = await fetch('https://qron-fiverr.undone-k.workers.dev/buy', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan, email }),
        }).catch(() => null)
        if (res?.ok) {
          const d = await res.json()
          if (d.url) window.location.href = d.url
        } else {
          window.location.href = href
        }
      }}
      style={{
        display: 'block', textAlign: 'center', padding: '13px', borderRadius: '10px',
        fontWeight: 700, fontSize: '15px', textDecoration: 'none',
        background: isPack ? '#c9a227' : 'transparent',
        color: isPack ? '#000' : '#e5e5e5',
        border: isPack ? 'none' : '1px solid #333',
        cursor: 'pointer',
      }}
    >
      {cta}
    </a>
  )
}

export default function GigPage() {
  return (
    <div style={S.page}>

      {/* Hero */}
      <section style={S.hero}>
        <div style={S.logo}>QRON · AI QR Art</div>
        <h1 style={S.h1}>Turn Any URL Into<br />AI-Generated QR Art</h1>
        <p style={S.sub}>Beautiful, scannable QR codes powered by AI diffusion models. Used by cannabis dispensaries, restaurants, and brands worldwide.</p>
        <div style={S.badges}>
          {['✅ 100% Scannable', '🎨 6 AI Styles', '📦 Commercial License', '⚡ 24h Delivery', '🔒 Stripe Secure'].map(b => (
            <span key={b} style={S.badge}>{b}</span>
          ))}
        </div>
        {/* Living Portals callout */}
      <div style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.3)', borderRadius: '12px', padding: '16px 24px', marginBottom: '32px', textAlign: 'left' as const, maxWidth: '600px', margin: '0 auto 32px' }}>
        <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>
          🌊 Living Portals — Included with every order
        </div>
        <p style={{ color: '#888', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
          Every QR code encodes a trackable portal URL. See scan counts, country, and device breakdown in real time. Update the destination without reprinting. <a href="/portals" style={{ color: '#c9a227' }}>View dashboard →</a>
        </p>
      </div>
      <Link href="/free-qr-generator"
          style={{ color: '#888', fontSize: '14px', textDecoration: 'underline' }}>
          Try free first (no signup) →
        </Link>
      </section>

      {/* Portfolio */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px', borderRadius: '12px', overflow: 'hidden' }}>
          {[
            'https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775163472154-tjtjyg',
            'https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775163507531-5e1q81',
            'https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775163542588-1c7bgj',
          ].map((url, i) => (
            <div key={i} style={{ aspectRatio: '1', background: '#111', overflow: 'hidden' }}>
              <img src={url} alt={`QRON example ${i+1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: '#555', fontSize: '12px', marginTop: '12px' }}>
          Every code is unique · AI-generated · Scan-tested
        </p>
      </section>

      {/* Plans */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px 72px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: '32px' }}>Choose Your Package</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '2px' }}>
          {PLANS.map(p => (
            <div key={p.name} style={{
              background: p.popular ? 'rgba(201,162,39,0.06)' : '#111',
              border: `1px solid ${p.popular ? 'rgba(201,162,39,0.5)' : '#1e1e1e'}`,
              borderRadius: '12px', padding: '32px 24px', position: 'relative',
            }}>
              {p.popular && (
                <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: '#c9a227', color: '#000', fontSize: '10px', fontWeight: 700, padding: '4px 14px', borderRadius: '0 0 8px 8px', letterSpacing: '0.1em' }}>
                  BEST VALUE
                </div>
              )}
              <div style={{ fontSize: '13px', color: '#888', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase' as const }}>{p.name}</div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#e5e5e5', lineHeight: 1, marginBottom: '4px' }}>{p.price}</div>
              <div style={{ fontSize: '13px', color: '#555', marginBottom: '16px' }}>{p.period}</div>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '20px', lineHeight: 1.5 }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: '13px', color: '#ccc', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#c9a227', flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={`https://qron-fiverr.undone-k.workers.dev/buy?plan=${p.plan}`}
                style={{
                  display: 'block', textAlign: 'center', padding: '13px', borderRadius: '10px',
                  fontWeight: 700, fontSize: '14px', textDecoration: 'none',
                  background: p.popular ? '#c9a227' : 'transparent',
                  color: p.popular ? '#000' : '#e5e5e5',
                  border: p.popular ? 'none' : '1px solid #333',
                }}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Styles */}
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '64px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '32px' }}>6 AI Art Styles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '12px' }}>
            {STYLES.map(s => (
              <Link key={s.name} href={`/free-qr-generator?style=${s.name.toLowerCase().split(' ')[0]}`}
                style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '18px 20px', textDecoration: 'none', color: '#e5e5e5' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.emoji}</div>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>{s.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{s.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* After Order */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', textAlign: 'center' }}>After You Order</h2>
        <p style={{ color: '#888', textAlign: 'center', marginBottom: '32px' }}>Complete your purchase, then submit your details here:</p>
        <div style={{ background: '#111', border: '1px solid rgba(201,162,39,.3)', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎨</div>
          <div style={{ fontWeight: 800, fontSize: '18px', marginBottom: '8px' }}>Submit Order Details → Get Living Portal</div>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>Provide your URL, pick a style, and generate instantly.</p>
          <Link href="https://qron-fiverr.undone-k.workers.dev/order"
            style={{ display: 'inline-block', background: '#c9a227', color: '#000', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none' }}>
            Submit Order Details →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '64px 24px 80px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '32px', textAlign: 'center' }}>FAQ</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQ.map(f => (
              <div key={f.q} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px 24px' }}>
                <div style={{ fontWeight: 700, marginBottom: '6px' }}>{f.q}</div>
                <div style={{ color: '#888', fontSize: '14px', lineHeight: 1.6 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
