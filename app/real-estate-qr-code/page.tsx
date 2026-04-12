import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Real Estate QR Code Generator — Property Listings & Virtual Tours | QRON',
  description: 'Generate stunning AI QR codes for real estate marketing. Link to virtual tours, property listings, and open house details. Perfect for yard signs, brochures, and agent business cards.',
  keywords: ['real estate qr code', 'qr code for property listings', 'qr code virtual tour', 'real estate marketing qr code', 'open house qr code', 'property brochure qr code'],
  openGraph: { title: 'Real Estate QR Code Generator — Property Listings & Virtual Tours | QRON', description: 'Generate stunning AI QR codes for real estate marketing. Link to virtual tours, property listings, and open house details. Perfect for yard signs, brochures, and agent business cards.', url: 'https://qron.space/real-estate-qr-code', type: 'website' },
  alternates: { canonical: 'https://qron.space/real-estate-qr-code' },
}

export default function Page() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', background: 'linear-gradient(135deg,#c9a227,#f0d060,#fff 65%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI QR Code Art for Real Estate Marketing
        </h1>
        <p style={{ fontSize: '17px', color: '#888', maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          Turn ordinary QR codes into branded visual assets for your property listings. AI-generated art that drives scans on yard signs, brochures, and business cards.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/free-qr-generator?style=realestate" style={{ background: '#7c3aed', color: '#fff', padding: '13px 26px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Try Free →</Link>
          <Link href="/pricing" style={{ background: 'transparent', color: '#e5e5e5', padding: '13px 26px', borderRadius: '10px', border: '1px solid #333', textDecoration: 'none', fontWeight: 600 }}>See Pricing</Link>
        </div>
        <p style={{ color: '#555', fontSize: '12px', marginTop: '14px' }}>No signup required · $49/design for commercial use</p>
      </section>
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 40px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>Use Cases for Real Estate Agents</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {[
            { title: 'Yard Signs', desc: 'Place a scannable AI QR code on for-sale signs that links directly to the full property listing or virtual tour.' },
            { title: 'Virtual Tour Links', desc: 'Connect buyers to immersive 3D walkthroughs and video tours with a single scan from any printed material.' },
            { title: 'Open House Signage', desc: 'Let visitors scan to access property details, floor plans, and neighborhood information on the spot.' },
            { title: 'Property Brochures', desc: 'Embed branded QR codes in print brochures that link to galleries, pricing, and scheduling pages.' },
            { title: 'Agent Business Cards', desc: 'Add an AI-styled QR code to your card that links to your portfolio, reviews, or booking calendar.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '6px', color: '#c9a227' }}>{item.title}</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>What can I link a real estate QR code to?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>You can link to any URL — virtual tours, Zillow or Realtor.com listings, scheduling pages, video walkthroughs, or a custom landing page with property details and contact forms.</div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Will the QR code scan reliably from a yard sign?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>Yes. QRON codes are designed for high contrast and scan reliability at distance. We recommend printing at least 4 inches wide for yard signs so phones can read them from the sidewalk.</div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Can I match my brokerage brand colors?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>Absolutely. Our real estate style uses warm tones by default, but custom color matching to your brokerage branding is available on Business plans.</div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Can I update the link after printing?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>Yes. With QRON dynamic QR codes, you can change the destination URL anytime without reprinting. Swap from one listing to another when a property sells.</div>
            </div>
        </div>
      </section>
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '48px 24px', textAlign: 'center' }}>
        <Link href="/free-qr-generator?style=realestate" style={{ background: '#7c3aed', color: '#fff', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}>
          Generate Your AI QR Code →
        </Link>
      </section>
    </div>
  )
}
