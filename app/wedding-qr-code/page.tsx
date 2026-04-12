import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Wedding QR Code Generator — Invitations & RSVP | QRON',
  description: 'Create beautiful AI QR codes for weddings and events. Perfect for invitations, RSVP links, photo album sharing, table seating, and gift registry access.',
  keywords: ['wedding qr code', 'qr code wedding invitation', 'wedding rsvp qr code', 'wedding event qr code', 'qr code for wedding photos', 'wedding table qr code'],
  openGraph: { title: 'Wedding QR Code Generator — Invitations & RSVP | QRON', description: 'Create beautiful AI QR codes for weddings and events. Perfect for invitations, RSVP links, photo album sharing, table seating, and gift registry access.', url: 'https://qron.space/wedding-qr-code', type: 'website' },
  alternates: { canonical: 'https://qron.space/wedding-qr-code' },
}

export default function Page() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', background: 'linear-gradient(135deg,#c9a227,#f0d060,#fff 65%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI QR Code Art for Weddings and Events
        </h1>
        <p style={{ fontSize: '17px', color: '#888', maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          Replace generic QR codes with elegant AI-generated art that matches your wedding aesthetic. Scannable, beautiful, and uniquely yours.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/free-qr-generator" style={{ background: '#7c3aed', color: '#fff', padding: '13px 26px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Try Free →</Link>
          <Link href="/pricing" style={{ background: 'transparent', color: '#e5e5e5', padding: '13px 26px', borderRadius: '10px', border: '1px solid #333', textDecoration: 'none', fontWeight: 600 }}>See Pricing</Link>
        </div>
        <p style={{ color: '#555', fontSize: '12px', marginTop: '14px' }}>No signup required · $49/design for commercial use</p>
      </section>
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 40px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>Use Cases for Weddings and Events</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {[
            { title: 'Invitations', desc: 'Embed a styled QR code in your wedding invitation that links to your wedding website with all the details guests need.' },
            { title: 'RSVP Links', desc: 'Let guests scan to RSVP instantly from the save-the-date or invitation — no typing URLs or mailing cards back.' },
            { title: 'Photo Album Sharing', desc: 'Place QR codes at the reception so guests can upload their photos to a shared album or view the professional gallery.' },
            { title: 'Table Seating', desc: 'Add a QR code to the welcome table that links to an interactive seating chart so guests find their seats quickly.' },
            { title: 'Gift Registry', desc: 'Include a scannable QR code on shower invitations or place cards that opens your gift registry directly.' },
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
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Will the QR code match my wedding theme?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>Yes. QRON uses AI to generate art around the QR code that can incorporate floral, minimalist, vintage, or modern aesthetics. You can guide the style to complement your invitation design.</div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>What happens when guests scan the code?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>They are taken directly to whatever URL you set — your wedding website, RSVP form, photo album, registry, or seating chart. No app download required.</div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Can I use the same QR code on multiple items?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>Absolutely. One QR code design can go on your invitation, programs, signage, and place cards. You can also create different codes for different links — one for RSVP, another for photos.</div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Is the QR code print-ready for professional stationery?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>Yes. QRON exports high-resolution files suitable for professional printing on cardstock, programs, and signage. We recommend downloading the SVG or high-resolution PNG for best results.</div>
            </div>
        </div>
      </section>
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '48px 24px', textAlign: 'center' }}>
        <Link href="/free-qr-generator" style={{ background: '#7c3aed', color: '#fff', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}>
          Generate Your AI QR Code →
        </Link>
      </section>
    </div>
  )
}
