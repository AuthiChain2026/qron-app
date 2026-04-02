import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cannabis QR Code Art — COA Links & Strain Info | QRON',
  description: 'Cannabis packaging QR codes that comply and convert. AI botanical art linking to COA, strain data, and loyalty. Michigan dispensary specialists.',
  alternates: { canonical: 'https://qron.space/for/cannabis' },
}

export default function CannabisPage() {
  const gold = '#c9a227'

  const StatCard = ({ n, l }: { n: string; l: string }) => (
    <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
      <div style={{ fontSize: '2.2rem', fontWeight: 900, color: gold, lineHeight: 1, marginBottom: '4px' }}>{n}</div>
      <div style={{ color: '#666', fontSize: '12px' }}>{l}</div>
    </div>
  )
  const UcCard = ({ t, d }: { t: string; d: string }) => (
    <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '18px 20px' }}>
      <div style={{ fontWeight: 700, marginBottom: '4px' }}>{t}</div>
      <div style={{ color: '#666', fontSize: '13px' }}>{d}</div>
    </div>
  )

  const badges = ['Compliance-Ready', '43% Scan Rate', 'COA Linking', 'Michigan Specialists']
  const stats = [{ n: '43%', l: 'scan rate (vs 11% plain)' }, { n: '100%', l: 'scan-verified by ControlNet' }, { n: '$49', l: 'per design, commercial use' }]
  const ucs = [
    { t: 'COA verification', d: 'Certificate of analysis for any batch' },
    { t: 'Strain information', d: 'Terpenes, lineage, grow notes' },
    { t: 'Loyalty programs', d: 'Patient rewards and reorder links' },
    { t: 'Compliance labels', d: 'METRC and DSCSA compatible links' },
  ]
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '80px 24px 56px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          {badges.map(b => <span key={b} style={{ background: 'rgba(201,162,39,.1)', border: '1px solid rgba(201,162,39,.3)', color: gold, fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px' }}>{b}</span>)}
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '18px' }}>
          Cannabis Packaging QR Codes<br /><span style={{ color: gold }}>That Build Brand Trust</span>
        </h1>
        <p style={{ color: '#888', fontSize: '16px', maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Michigan and nationwide cannabis compliance requires QR codes on packaging. QRON creates emerald botanical art that links to your COA, strain info, or loyalty program — turning a compliance checkbox into a brand asset.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/gig" style={{ background: gold, color: '#000', padding: '13px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>Create Dispensary Portal — $49 →</Link>
          <Link href="/free-qr-generator" style={{ background: 'transparent', color: '#e5e5e5', border: '1px solid #333', padding: '13px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>Try Cannabis Style Free</Link>
        </div>
      </section>
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '40px 24px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {stats.map(s => <StatCard key={s.n} n={s.n} l={s.l} />)}
        </div>
      </section>
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 24px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>Use Cases</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '10px', marginBottom: '40px' }}>
          {ucs.map(uc => <UcCard key={uc.t} t={uc.t} d={uc.d} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link href="/cannabis-qr-code" style={{ color: gold, fontWeight: 700, fontSize: '14px' }}>Read the cannabis QR guide →</Link>
        </div>
      </section>
    </div>
  )
}