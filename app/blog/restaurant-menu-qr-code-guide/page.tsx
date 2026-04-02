import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Restaurant Menu QR Codes — Design Guide for High Scan Rates | QRON',
  description: 'Standard restaurant QR codes get 12% scan rates. AI art QR codes hit 43%. Here is the design guide that makes the difference.',
  openGraph: { title: 'Restaurant Menu QR Code Design Guide', description: 'How to design QR codes that customers actually scan.', url: 'https://qron.space/blog/restaurant-menu-qr-code-guide', type: 'article' },
  alternates: { canonical: 'https://qron.space/blog/restaurant-menu-qr-code-guide' },
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
        <h1 style={S.h1}>Restaurant Menu QR Codes — The Design Guide That Gets Customers Scanning</h1>
        <div style={S.meta}>April 2, 2026 · 6 min read · Restaurant</div>
        <p style={S.lead}>The average restaurant QR code has a 12% voluntary scan rate. AI art QR codes consistently hit 40% or higher. Here is what makes the difference.</p>
        <h2 style={S.h2}>The Scan Rate Problem</h2>
        <p style={S.p}>Restaurants spent billions replacing physical menus with QR codes from 2020-2022. The technology works, but engagement is low. Standard QR codes are scanned reluctantly — only when customers cannot get a physical menu. Branded QR codes that match the restaurant visual identity perform dramatically better because they read as intentional design rather than a compliance afterthought.</p>
        <h2 style={S.h2}>What Actually Increases Scan Rates</h2>
        <p style={S.p}>The highest-performing restaurant QR codes share three traits: they are visually interesting, clearly labeled ("Scan for Menu"), and match the brand aesthetic. A farm-to-table restaurant with a botanical QR code. A craft brewery with a vintage retro QR code. A modern sushi restaurant with an abstract geometric QR code. The art style signals that this restaurant cares about design, which primes customers to engage with the digital experience.</p>
        <h2 style={S.h2}>How to Use QRON for Your Restaurant</h2>
        <p style={S.p}>QRON generates AI art QR codes for restaurant menus in 60 seconds. Choose a style: nature/botanical for organic cafes, retro for diners and breweries, abstract for fine dining, or cyberpunk for tech-forward fast casual. Input your menu URL (Toast, Square, Google menu, or your own site). QRON outputs a high-resolution PNG ready for table cards at $49/design.</p>
        <h2 style={S.h2}>Tips for Table Card Design</h2>
        <p style={S.p}>Print your QR code at minimum 1.5 inches square for reliable scanning. Add the text "Scan for Menu" in your brand font. Test on both iPhone and Android before printing at scale. QRON codes are generated at 768px square — sufficient for printing up to 3 inches at 300dpi. For larger format printing, contact us for high-resolution exports.</p>
        <div style={S.cta}>
          <div style={{ fontWeight: 800, fontSize: '20px', marginBottom: '10px' }}>Try a free restaurant QR code now</div>
          <p style={{ color: '#888', marginBottom: '20px' }}>No signup · Nature or retro style · Ready in 60 seconds</p>
          <Link href="/free-qr-generator?style=nature" style={S.btn}>Generate Restaurant QR →</Link>
        </div>
      </article>
    </div>
  )
}
