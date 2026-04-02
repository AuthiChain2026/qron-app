import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'QRON Pricing — AI QR Code Generator Plans | Free to $299/mo',
  description: 'QRON pricing plans: Free (2/day), Starter $29 (10 QR codes), Creator $99 (50), Studio $299 (200). AI-generated QR art for brands, cannabis, restaurants, and events.',
  alternates: { canonical: 'https://qron.space/pricing' },
}

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '',
    desc: 'Try before you buy',
    cta: 'Start Free',
    href: '/free-qr-generator',
    features: ['2 AI QR codes / day', 'All 6 art styles', 'PNG download', 'No signup needed', 'Standard resolution'],
    not: ['Bulk download', 'Custom prompts', 'Priority generation', 'API access'],
    highlight: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    period: '/one-time',
    desc: '10 credits, never expire',
    cta: 'Buy Starter Pack',
    href: '/api/checkout?planId=starter',
    features: ['10 AI QR codes', 'All 6 art styles', 'High-res PNG (768px)', 'Custom prompts', 'Credits never expire', 'Email delivery'],
    not: ['API access', 'Priority generation'],
    highlight: false,
  },
  {
    id: 'creator',
    name: 'Creator',
    price: '$99',
    period: '/one-time',
    desc: '50 credits for agencies & brands',
    cta: 'Buy Creator Pack',
    href: '/api/checkout?planId=creator',
    features: ['50 AI QR codes', 'All 6 art styles', 'High-res PNG (768px)', 'Custom prompts', 'Credits never expire', 'Priority generation', 'Bulk ZIP download'],
    not: ['API access'],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'studio',
    name: 'Studio',
    price: '$299',
    period: '/one-time',
    desc: '200 credits for high-volume use',
    cta: 'Buy Studio Pack',
    href: '/api/checkout?planId=studio',
    features: ['200 AI QR codes', 'All 6 art styles', 'High-res PNG (768px)', 'Custom prompts', 'Credits never expire', 'Priority generation', 'Bulk ZIP download', 'API access', 'White-label export'],
    not: [],
    highlight: false,
  },
]

const FAQ = [
  { q: 'Do credits expire?', a: 'No. Credits on paid plans never expire — use them at your own pace.' },
  { q: 'Do the QR codes actually scan?', a: 'Yes. Every QRON code is tested for scannability using ControlNet AI that preserves the QR structure. Works on any iPhone or Android.' },
  { q: 'Can I use QRON on packaging and print?', a: 'Yes. PNG files at 768px are suitable for print up to 3 inches at 300dpi. Contact us for high-resolution exports for larger formats.' },
  { q: 'What URL do I put in the QR code?', a: 'Any URL — your website, a menu link, a product page, a social profile, a COA page, or any destination you choose. The URL is not changed.' },
  { q: 'Can I get a refund?', a: 'Yes. If you're not happy with your QR codes, contact authichain@gmail.com within 7 days for a full refund.' },
  { q: 'Is there an API?', a: 'Yes, the Studio plan includes API access. Enterprise API plans with higher volume are available via the AuthiChain RapidAPI listing.' },
]

export default function PricingPage() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 24px 48px', maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, marginBottom: '14px' }}>
          Simple, Transparent Pricing
        </h1>
        <p style={{ color: '#888', fontSize: '17px', marginBottom: '8px' }}>
          Pay once, own your credits. No subscriptions, no surprises.
        </p>
        <p style={{ color: '#555', fontSize: '14px' }}>
          Start free — no credit card required.
        </p>
      </section>

      {/* Plans */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 72px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '2px' }}>
        {PLANS.map(plan => (
          <div key={plan.id} style={{
            background: plan.highlight ? 'rgba(124,58,237,0.06)' : '#111',
            border: `1px solid ${plan.highlight ? 'rgba(124,58,237,0.5)' : '#1e1e1e'}`,
            borderRadius: '12px', padding: '32px 24px', position: 'relative',
          }}>
            {plan.badge && (
              <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)',
                background: '#7c3aed', color: '#fff', fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.1em', padding: '4px 12px', borderRadius: '0 0 8px 8px', textTransform: 'uppercase' }}>
                {plan.badge}
              </div>
            )}
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{plan.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
              <span style={{ fontSize: '3rem', fontWeight: 900 }}>{plan.price}</span>
              <span style={{ color: '#555', fontSize: '14px' }}>{plan.period}</span>
            </div>
            <div style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>{plan.desc}</div>
            <Link href={plan.href} style={{
              display: 'block', textAlign: 'center', padding: '12px',
              background: plan.highlight ? '#7c3aed' : 'transparent',
              color: plan.highlight ? '#fff' : '#e5e5e5',
              border: `1px solid ${plan.highlight ? '#7c3aed' : '#333'}`,
              borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '14px',
              marginBottom: '24px',
            }}>{plan.cta}</Link>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {plan.features.map(f => (
                <li key={f} style={{ fontSize: '13px', color: '#ccc', display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#7c3aed', flexShrink: 0 }}>✓</span> {f}
                </li>
              ))}
              {plan.not.map(f => (
                <li key={f} style={{ fontSize: '13px', color: '#444', display: 'flex', gap: '8px' }}>
                  <span style={{ flexShrink: 0 }}>—</span> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Enterprise */}
      <section style={{ maxWidth: '900px', margin: '0 auto 72px', padding: '0 24px' }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '20px', marginBottom: '6px' }}>Enterprise & API</div>
            <p style={{ color: '#888', fontSize: '14px', maxWidth: '500px' }}>
              High-volume API access, custom QR art styles, white-label delivery, and SLA support. Starts at $999/mo with unlimited credits.
            </p>
          </div>
          <Link href="mailto:authichain@gmail.com?subject=QRON Enterprise" style={{ background: '#7c3aed', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, whiteSpace: 'nowrap' }}>
            Contact Sales →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '720px', margin: '0 auto 80px', padding: '0 24px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', marginBottom: '32px' }}>Questions & Answers</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FAQ.map(f => (
            <div key={f.q} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px 24px' }}>
              <div style={{ fontWeight: 700, marginBottom: '6px' }}>{f.q}</div>
              <div style={{ color: '#888', fontSize: '14px', lineHeight: 1.6 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
