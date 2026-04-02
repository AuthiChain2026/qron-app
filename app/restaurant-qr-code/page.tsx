import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Restaurant QR Code Generator — Beautiful Menu QR Codes | QRON',
  description: 'Create stunning AI QR codes for your restaurant menu. Customers scan 40% more often than plain black codes. Free to try, $49 per design.',
  openGraph: { title: 'Restaurant QR Code Generator — Beautiful Menu QR Codes | QRON', description: 'Create stunning AI QR codes for your restaurant menu. Customers scan 40% more often than plain black codes. Free to try, $49 per design.', url: 'https://qron.space/restaurant-qr-code', type: 'website' },
  alternates: { canonical: 'https://qron.space/restaurant-qr-code' },
}

export default function Page() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', background: 'linear-gradient(135deg,#c9a227,#f0d060,#fff 65%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI QR Codes for Restaurant Menus
        </h1>
        <p style={{ fontSize: '17px', color: '#888', maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          Your menu QR code is the first thing customers touch. Make it beautiful. QRON generates AI art QR codes that match your restaurant's aesthetic.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/free-qr-generator?style=nature" style={{ background: '#7c3aed', color: '#fff', padding: '13px 26px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Try Free →</Link>
          <Link href="/pricing" style={{ background: 'transparent', color: '#e5e5e5', padding: '13px 26px', borderRadius: '10px', border: '1px solid #333', textDecoration: 'none', fontWeight: 600 }}>See Pricing</Link>
        </div>
        <p style={{ color: '#555', fontSize: '12px', marginTop: '14px' }}>No signup required · $49/design for commercial use</p>
      </section>
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Will customers be able to scan a stylized QR code?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>Yes. All QRON codes are tested for scannability. The AI art is applied within strict contrast guidelines that guarantee scan success.</div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>What menu URL should I link my QR code to?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>Link to your online menu (Toast, Square, your website), Google menu, or any URL where customers can see your food and prices.</div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Can I order multiple QR codes for different locations?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>Yes. Our Business plan includes bulk ordering and API access for generating codes across multiple locations efficiently.</div>
            </div>
        </div>
      </section>
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '48px 24px', textAlign: 'center' }}>
        <Link href="/free-qr-generator?style=nature" style={{ background: '#7c3aed', color: '#fff', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}>
          Generate Your AI QR Code →
        </Link>
      </section>
    </div>
  )
}
