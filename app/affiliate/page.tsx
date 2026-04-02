import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'QRON Affiliate Program — Earn 20% Per Sale',
  description: 'Earn 20% recurring commission on every QRON sale you refer. Custom link, real-time dashboard, monthly payouts.',
  alternates: { canonical: 'https://qron.space/affiliate' },
}

const TIERS = [
  { name: 'Starter', sales: '1–10/mo', commission: '20%', payout: 'Monthly', perks: 'Custom link, basic dashboard' },
  { name: 'Partner', sales: '11–50/mo', commission: '25%', payout: 'Monthly', perks: 'Priority support, co-marketing' },
  { name: 'Agency', sales: '51+/mo', commission: '30%', payout: 'Bi-weekly', perks: 'White-label option, dedicated rep' },
]

const EXAMPLES = [
  { ref: 'Freelance designer', sales: 5, avg: 99, monthly: 99 },
  { ref: 'Marketing agency', sales: 20, avg: 199, monthly: 796 },
  { ref: 'Cannabis consultant', sales: 50, avg: 149, monthly: 1490 },
]

export default function AffiliatePage() {
  const gold = '#c9a227'
  const S = {
    page: { background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' } as const,
    hero: { maxWidth: '900px', margin: '0 auto', padding: '72px 24px 48px', textAlign: 'center' as const },
    section: { maxWidth: '900px', margin: '0 auto', padding: '0 24px 64px' } as const,
    card: { background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '24px' } as const,
  }
  return (
    <div style={S.page}>
      <section style={S.hero}>
        <div style={{ fontSize: '12px', color: gold, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '20px' }}>
          QRON AFFILIATE PROGRAM
        </div>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>
          Earn 20% on Every QRON Sale
        </h1>
        <p style={{ color: '#888', fontSize: '17px', maxWidth: '560px', margin: '0 auto 36px', lineHeight: 1.6 }}>
          Share your affiliate link. When someone buys, you earn 20% — forever, on every renewal too.
          Designers, agencies, consultants, and content creators welcome.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          <Link href="/affiliate/apply"
            style={{ background: gold, color: '#000', padding: '14px 32px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }}>
            Apply to Join →
          </Link>
          <Link href="/affiliate/login"
            style={{ background: 'transparent', color: '#e5e5e5', padding: '14px 32px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '16px', border: '1px solid #333' }}>
            Affiliate Login
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
          {[['20%', 'Commission'], ['30-day', 'Cookie window'], ['Monthly', 'Payouts']].map(([v, l]) => (
            <div key={l} style={{ background: 'rgba(201,162,39,.06)', border: '1px solid rgba(201,162,39,.2)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: gold }}>{v}</div>
              <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '64px 24px' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '32px' }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { n: '1', title: 'Apply', desc: 'Fill out a quick form. Instant approval for designers, agencies, and content creators.' },
              { n: '2', title: 'Share', desc: 'Get your unique link (qron.space?ref=you). Share on social, in proposals, with clients.' },
              { n: '3', title: 'Earn', desc: '20% of every sale. If they subscribe, you earn every month they renew.' },
              { n: '4', title: 'Get Paid', desc: 'Monthly PayPal or wire. Minimum $25 payout threshold.' },
            ].map(s => (
              <div key={s.n} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: gold, marginBottom: '8px' }}>{s.n}</div>
                <div style={{ fontWeight: 700, marginBottom: '6px' }}>{s.title}</div>
                <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings examples */}
      <section style={{ ...S.section, paddingTop: '64px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>What Affiliates Earn</h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '32px' }}>Real numbers, realistic scenarios</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {EXAMPLES.map(e => (
            <div key={e.ref} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '13px', color: '#888', marginBottom: '12px', fontWeight: 600 }}>{e.ref}</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: gold }}>${e.monthly.toLocaleString()}<span style={{ fontSize: '14px', color: '#666' }}>/mo</span></div>
              <div style={{ fontSize: '13px', color: '#555', marginTop: '8px' }}>{e.sales} sales × ${e.avg} avg × 20%</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '64px 24px' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '32px' }}>Commission Tiers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {TIERS.map(t => (
              <div key={t.name} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>{t.name}</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: gold, marginBottom: '8px' }}>{t.commission}</div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>{t.sales} sales/mo</div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>{t.payout} payouts</div>
                <div style={{ fontSize: '13px', color: '#888' }}>{t.perks}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect for */}
      <section style={{ ...S.section, paddingTop: '64px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: '32px' }}>Perfect For</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {[
            ['🎨', 'Graphic Designers', 'Offer AI QR art as an add-on to every branding project.'],
            ['📱', 'Marketing Agencies', 'Bundle QRON into your social + print packages.'],
            ['🌿', 'Cannabis Consultants', 'Every dispensary needs compliant QR codes.'],
            ['🍔', 'Restaurant Consultants', 'Every new restaurant needs a menu QR.'],
            ['📸', 'Photographers', 'Add portfolio QR art to every wedding package.'],
            ['✍️', 'Content Creators', 'Share your link with your audience.'],
          ].map(([emoji, title, desc]) => (
            <div key={title} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{emoji}</div>
              <div style={{ fontWeight: 700, marginBottom: '6px' }}>{title}</div>
              <p style={{ color: '#888', fontSize: '13px', lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '64px 24px 80px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '12px' }}>Ready to Start Earning?</h2>
        <p style={{ color: '#888', marginBottom: '28px' }}>Apply takes 2 minutes. Instant approval for most applicants.</p>
        <Link href="/affiliate/apply"
          style={{ background: gold, color: '#000', padding: '16px 40px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '16px', display: 'inline-block' }}>
          Apply Now — It&#39;s Free →
        </Link>
        <p style={{ color: '#444', fontSize: '13px', marginTop: '16px' }}>Questions? Email <a href="mailto:qron@qron.space" style={{ color: gold }}>qron@qron.space</a></p>
      </section>
    </div>
  )
}
