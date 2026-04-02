import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cannabis QR Code Art — COA Links & Strain Info | QRON',
  description: 'Cannabis packaging QR codes required by law. Make yours botanical AI art that links to COA, strain data, and loyalty programs. Michigan dispensary specialists.',
  alternates: { canonical: 'https://qron.space/for/cannabis' },
}

export default function CannabisPage() {
  const gold = '#c9a227'
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '80px 24px 56px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          {['Compliance-Ready', '43% Scan Rate', 'COA Linking', 'Michigan Specialists'].map(b => (
            <span key={b} style={{ background: 'rgba(201,162,39,.1)', border: '1px solid rgba(201,162,39,.3)', color: gold, fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px' }}>{b}</span>
          ))}
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '18px' }}>
          Cannabis Packaging QR Codes<br /><span style={{ color: gold }}>That Build Brand Trust</span>
        </h1>
        <p style={{ color: '#888', fontSize: '16px', maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Michigan and nationwide cannabis compliance requires QR codes on packaging. QRON creates emerald botanical art that links to your COA, strain info, or loyalty program — turning a compliance checkbox into a brand touchpoint.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/gig" style={{ background: gold, color: '#000', padding: '13px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>Create Dispensary Portal — $49 →</Link>
          <Link href="/free-qr-generator?style=cannabis" style={{ background: 'transparent', color: '#e5e5e5', border: '1px solid #333', padding: '13px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>Try Cannabis Style Free</Link>
        </div>
      </section>
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '40px 24px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {[{ n: '43%', l: 'scan rate (vs 11% plain)' }, { n: '100%', l: 'scan-verified by ControlNet' }, { n: '$49', l: 'per design, commercial use' }].map(s => (
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
            { t: 'COA verification', d: 'Certificate of analysis for any batch' },
            { t: 'Strain information', d: 'Terpenes, lineage, grow notes' },
            { t: 'Loyalty programs', d: 'Patient rewards and reorder links' },
            { t: 'Compliance labels', d: 'METRC and DSCSA compatible links' },
          ].map(uc => (
            <div key={uc.t} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '18px 20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>{uc.t}</div>
              <div style={{ color: '#666', fontSize: '13px' }}>{uc.d}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(34,197,94,.06)', border: '1px solid rgba(34,197,94,.2)', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
          <h3 style={{ fontWeight: 800, marginBottom: '8px', color: '#22c55e' }}>Cannabis style: Emerald Botanical</h3>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>Deep greens, organic leaves, premium cannabis aesthetic. Commercial use included.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/gig" style={{ background: gold, color: '#000', padding: '11px 24px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>Order Now →</Link>
            <Link href="/cannabis-qr-code" style={{ background: '#1a1a1a', color: '#e5e5e5', border: '1px solid #333', padding: '11px 24px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  )
}