import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Event QR Code Art — Tickets & Signage That Update Without Reprinting | QRON',
  description: 'Living Portal event QR codes. Print once, change the destination mid-event. Track every scan by country and device. Perfect for conferences, concerts, and corporate events.',
  alternates: { canonical: 'https://qron.space/for/events' },
}

export default function EventsPage() {
  const gold = '#c9a227'
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '80px 24px 56px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          {['Print Once', 'Update Anytime', 'Scan Analytics', 'AI Art'].map(b => (
            <span key={b} style={{ background: 'rgba(201,162,39,.1)', border: '1px solid rgba(201,162,39,.3)', color: gold, fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px' }}>{b}</span>
          ))}
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '18px' }}>
          Event QR Codes That<br /><span style={{ color: gold }}>Update Without Reprinting</span>
        </h1>
        <p style={{ color: '#888', fontSize: '16px', maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Print your event signage once. QRON Living Portals let you update the destination in real time — change session links, add last-minute schedule updates, or redirect to the livestream — without reprinting a single sign.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/gig" style={{ background: gold, color: '#000', padding: '13px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>Create Event Portal — $49 →</Link>
          <Link href="/free-qr-generator?style=cyberpunk" style={{ background: 'transparent', color: '#e5e5e5', border: '1px solid #333', padding: '13px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>Try Free</Link>
        </div>
      </section>
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '40px 24px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {[{ n: 'Live', l: 'destination updates mid-event' }, { n: '∞', l: 'scans tracked per portal' }, { n: '5min', l: 'average portal creation time' }].map(s => (
            <div key={s.n} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: gold, lineHeight: 1, marginBottom: '4px' }}>{s.n}</div>
              <div style={{ color: '#666', fontSize: '12px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 24px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>Use Cases</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '10px', marginBottom: '40px' }}>
          {[
            { t: 'Event tickets', d: 'Schedule, maps, or livestream links' },
            { t: 'Conference signage', d: 'Update presentation links in real time' },
            { t: 'Wristbands', d: 'Social sharing or photo gallery links' },
            { t: 'Sponsor activations', d: 'Branded art with tracked engagement' },
          ].map(uc => (
            <div key={uc.t} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '18px 20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>{uc.t}</div>
              <div style={{ color: '#666', fontSize: '13px' }}>{uc.d}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link href="/portals" style={{ color: gold, fontWeight: 700, fontSize: '14px' }}>See how portal analytics work →</Link>
        </div>
      </section>
    </div>
  )
}