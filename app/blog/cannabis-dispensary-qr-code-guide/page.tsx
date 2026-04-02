import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cannabis Dispensary QR Codes — Compliance Guide 2026 | QRON',
  description: 'Everything dispensaries need to know about QR codes on cannabis packaging — METRC compliance, label requirements, and AI art scan rates.',
  openGraph: { title: 'Cannabis Dispensary QR Code Guide 2026', description: 'Compliance, packaging requirements, and best practices.', url: 'https://qron.space/blog/cannabis-dispensary-qr-code-guide', type: 'article' },
  alternates: { canonical: 'https://qron.space/blog/cannabis-dispensary-qr-code-guide' },
}

const S = {
  page: { background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' } as const,
  article: { maxWidth: '760px', margin: '0 auto', padding: '80px 24px 80px' } as const,
  back: { color: '#7c3aed', textDecoration: 'none', fontSize: '13px', fontWeight: 600 } as const,
  h1: { fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, margin: '24px 0 16px', lineHeight: 1.2 } as const,
  meta: { color: '#555', fontSize: '13px', marginBottom: '32px' } as const,
  lead: { fontSize: '17px', lineHeight: 1.8, color: '#ccc', marginBottom: '24px' } as const,
  h2: { fontSize: '1.4rem', fontWeight: 800, margin: '36px 0 14px' } as const,
  p: { lineHeight: 1.8, color: '#aaa', marginBottom: '20px' } as const,
  cta: { marginTop: '56px', background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '32px', textAlign: 'center' as const },
  btn: { background: '#7c3aed', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 } as const,
}

export default function Post() {
  return (
    <div style={S.page}>
      <article style={S.article}>
        <Link href="/blog" style={S.back}>← Blog</Link>
        <h1 style={S.h1}>Cannabis Dispensary QR Codes — Compliance, Packaging & Best Practices 2026</h1>
        <div style={S.meta}>April 2, 2026 · 7 min read · Cannabis</div>
        <p style={S.lead}>QR codes are mandatory on cannabis packaging in most US states, linking to lab results and COA data. But most dispensary QR codes are plain black squares customers ignore. Here is how to do it right.</p>
        <h2 style={S.h2}>What Your QR Code Must Link To (By State)</h2>
        <p style={S.p}>Most state regulations require cannabis packaging QR codes to link to Certificate of Analysis (COA) data showing cannabinoid percentages, terpene profiles, and contaminant testing results. Michigan requires COA access. California requires CDPH-compliant labeling. Colorado requires Metrc integration. Regardless of state, the QR code must scan and lead to verifiable information — the visual design does not affect compliance as long as it scans.</p>
        <h2 style={S.h2}>Why Standard QR Codes Underperform for Cannabis Brands</h2>
        <p style={S.p}>Cannabis consumers are engaged with product quality, but only 8-12% scan plain black QR codes voluntarily. The problem is visual invitation. A dispensary QR code that looks like a premium brand element — botanical art, cannabis leaf motifs, or strain-specific imagery — consistently gets 35-45% scan rates. That is a 3-4x lift from the same customer base.</p>
        <h2 style={S.h2}>QRON for Cannabis Dispensaries</h2>
        <p style={S.p}>QRON cannabis style generates emerald-green botanical AI art around your QR code. Provide the URL (COA page, Dutchie menu, Weedmaps listing, or any link), and QRON generates a dispensary-grade AI QR image at $49/design. The code scans on any iPhone or Android in under 2 seconds and complies with all state requirements for functioning QR codes.</p>
        <h2 style={S.h2}>AuthiChain: Blockchain Authentication for Cannabis</h2>
        <p style={S.p}>For dispensaries wanting to go further, AuthiChain layers blockchain verification on top of any QR code. Customers scan, see the COA, and receive cryptographic proof the product is registered and unaltered. AuthiChain is METRC-compatible and starts at $199/month.</p>
        <div style={S.cta}>
          <div style={{ fontWeight: 800, fontSize: '20px', marginBottom: '10px' }}>Ready to upgrade your dispensary QR codes?</div>
          <p style={{ color: '#888', marginBottom: '20px' }}>Try the cannabis style free — no signup needed.</p>
          <Link href="/free-qr-generator?style=cannabis" style={S.btn}>Generate Cannabis QR →</Link>
        </div>
      </article>
    </div>
  )
}
