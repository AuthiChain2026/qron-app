import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact QRON — Enterprise QR Art & AuthiChain API',
  description: 'Contact QRON for enterprise AI QR code generation, bulk API access, StrainChain cannabis authentication, or AuthiChain product verification.',
  alternates: { canonical: 'https://qron.space/contact' },
}

export default function ContactPage() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px 80px' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, marginBottom: '14px' }}>Get in Touch</h1>
        <p style={{ color: '#888', fontSize: '17px', marginBottom: '48px', lineHeight: 1.6 }}>
          For enterprise pricing, custom API integrations, bulk QR art orders, and cannabis/pharma authentication — reach us directly.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          {[
            { label: 'General & Orders', email: 'authichain@gmail.com', desc: 'QR art orders, credits, refunds' },
            { label: 'Enterprise & API', email: 'authichain@gmail.com', desc: 'High-volume, white-label, API access' },
            { label: 'Cannabis / AuthiChain', email: 'authichain@gmail.com', desc: 'StrainChain, METRC, blockchain authentication' },
          ].map(c => (
            <div key={c.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px 24px' }}>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>{c.label}</div>
              <div style={{ color: '#888', fontSize: '13px', marginBottom: '8px' }}>{c.desc}</div>
              <a href={`mailto:${c.email}?subject=${c.label}`}
                style={{ color: '#7c3aed', fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}>
                {c.email} →
              </a>
            </div>
          ))}
        </div>

        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '24px' }}>
          <div style={{ fontWeight: 700, marginBottom: '12px' }}>Quick Links</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              ['/pricing', 'Pricing & Plans'],
              ['/free-qr-generator', 'Try Free AI QR Generator'],
              ['https://authichain.com', 'AuthiChain API (Product Authentication)'],
              ['https://strainchain.io', 'StrainChain (Cannabis Authentication)'],
            ].map(([href, label]) => (
              <Link key={href} href={href}
                style={{ color: '#888', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#7c3aed' }}>→</span> {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
