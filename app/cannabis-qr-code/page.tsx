import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cannabis QR Code Generator — Dispensary Packaging | QRON',
  description: 'Generate compliant, beautiful AI QR codes for cannabis packaging. Links to lab results, certificates, and product provenance. METRC-friendly.',
  openGraph: { title: 'Cannabis QR Code Generator — Dispensary Packaging | QRON', description: 'Generate compliant, beautiful AI QR codes for cannabis packaging. Links to lab results, certificates, and product provenance. METRC-friendly.', url: 'https://qron.space/cannabis-qr-code', type: 'website' },
  alternates: { canonical: 'https://qron.space/cannabis-qr-code' },
}

export default function Page() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', background: 'linear-gradient(135deg,#c9a227,#f0d060,#fff 65%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Cannabis QR Code Art for Dispensary Packaging
        </h1>
        <p style={{ fontSize: '17px', color: '#888', maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          Turn compliance QR codes into premium brand assets. AI-generated art that's compliant, scannable, and on-brand.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/free-qr-generator?style=cannabis" style={{ background: '#7c3aed', color: '#fff', padding: '13px 26px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Try Free →</Link>
          <Link href="/pricing" style={{ background: 'transparent', color: '#e5e5e5', padding: '13px 26px', borderRadius: '10px', border: '1px solid #333', textDecoration: 'none', fontWeight: 600 }}>See Pricing</Link>
        </div>
        <p style={{ color: '#555', fontSize: '12px', marginTop: '14px' }}>No signup required · $49/design for commercial use</p>
      </section>
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Are cannabis QR codes METRC-compliant?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>QRON generates the QR art layer on top of your existing METRC compliance URL. The underlying data is unchanged — we only add AI visual art around it.</div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>What do dispensary customers see when they scan?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>They see your existing compliance page, product menu, or lab results page — whatever URL you embed in the QR code.</div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Can I match my dispensary brand colors?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>Yes. Our cannabis style uses deep green and gold tones. Custom color matching is available on Business plans.</div>
            </div>
        </div>
      </section>
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '48px 24px', textAlign: 'center' }}>
        <Link href="/free-qr-generator?style=cannabis" style={{ background: '#7c3aed', color: '#fff', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}>
          Generate Your AI QR Code →
        </Link>
      </section>
    </div>
  )
}
