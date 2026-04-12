import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'EU Digital Product Passport (DPP) QR Code Solution | QRON + AuthiChain',
  description: 'DPP-ready QR code infrastructure for EU compliance. Blockchain-verified product passports with AI-generated QR art. Registry opens July 2026 — prepare now.',
  keywords: ['digital product passport', 'EU DPP compliance', 'ESPR qr code', 'product passport qr code', 'DPP ready infrastructure', 'EU product authentication'],
  openGraph: {
    title: 'EU Digital Product Passport (DPP) QR Code Solution | QRON + AuthiChain',
    description: 'DPP-ready QR code infrastructure for EU compliance. Blockchain-verified product passports with AI-generated QR art.',
    url: 'https://qron.space/digital-product-passport',
    type: 'website',
  },
  alternates: { canonical: 'https://qron.space/digital-product-passport' },
}

export default function Page() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#c9a227', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>
          EU Regulation 2024/1781 (ESPR) Compliance
        </p>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', background: 'linear-gradient(135deg,#c9a227,#f0d060,#fff 65%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Digital Product Passport Infrastructure — DPP Ready Now
        </h1>
        <p style={{ fontSize: '17px', color: '#888', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.7 }}>
          The EU Digital Product Passport registry opens July 2026. Battery passports become mandatory February 2027. QRON + AuthiChain gives you blockchain-verified QR codes that meet DPP requirements today — before your competitors even start.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/pricing" style={{ background: '#c9a227', color: '#000', padding: '13px 26px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Get DPP Ready</Link>
          <Link href="https://authichain.com" style={{ background: 'transparent', color: '#e5e5e5', padding: '13px 26px', borderRadius: '10px', border: '1px solid #333', textDecoration: 'none', fontWeight: 600 }}>AuthiChain Enterprise</Link>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>DPP Compliance Timeline</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { date: 'July 2026', label: 'Central DPP Registry Opens', color: '#c9a227', active: true },
            { date: 'Feb 2027', label: 'Battery Passport Mandatory (EV, industrial >2kWh)', color: '#ef4444', active: false },
            { date: '2028', label: 'Textiles, Electronics delegated acts expected', color: '#888', active: false },
            { date: '2028-2030', label: 'Tyres, Detergents, Furniture, Chemicals', color: '#888', active: false },
            { date: '2030+', label: 'All products sold in EU must carry a DPP', color: '#888', active: false },
          ].map((item) => (
            <div key={item.date} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '14px 18px', background: item.active ? 'rgba(201,162,39,0.08)' : '#111', border: `1px solid ${item.active ? 'rgba(201,162,39,0.3)' : '#1e1e1e'}`, borderRadius: '10px' }}>
              <div style={{ color: item.color, fontWeight: 800, fontSize: '14px', minWidth: '90px', whiteSpace: 'nowrap' }}>{item.date}</div>
              <div style={{ fontSize: '14px', color: item.active ? '#e5e5e5' : '#888' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What DPP Requires */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>What a Digital Product Passport Requires</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {[
            { title: 'Unique Product ID', desc: 'Serialized identifier for every unit — linked to a scannable data carrier (QR code).' },
            { title: 'Material Composition', desc: 'Full bill of materials, recycled content percentage, and hazardous substance declarations.' },
            { title: 'Carbon Footprint', desc: 'Lifecycle emissions data from raw materials through manufacturing, transport, and end-of-life.' },
            { title: 'Repairability Score', desc: 'Spare parts availability, repair manuals, and expected product lifetime.' },
            { title: 'Supply Chain Provenance', desc: 'Auditable chain of custody from source to shelf — immutable on blockchain.' },
            { title: 'End-of-Life Instructions', desc: 'Recycling, disassembly, and disposal guidance accessible via QR scan.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '18px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: '#888', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How QRON + AuthiChain Solves It */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>How QRON + AuthiChain Solves DPP</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { title: 'AI QR Code as Data Carrier', desc: 'EU mandates a scannable data carrier on every product. QRON generates beautiful AI QR art that doubles as the DPP access point — compliant and brand-enhancing.' },
            { title: 'Blockchain Immutability', desc: 'AuthiChain mints each product certificate as an ERC-721 NFT on Polygon. Material data, carbon footprint, and provenance are cryptographically locked — tamper-proof by design.' },
            { title: 'Dynamic Lifecycle Updates', desc: 'DPP data evolves across a product lifecycle (manufacturing, retail, repair, recycling). AuthiChain supports versioned updates with full audit history.' },
            { title: 'Enterprise API Integration', desc: 'Connect your ERP, PLM, or supply chain system via REST API. Bulk-generate DPP-compliant QR codes at scale.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { q: 'Does the EU DPP require blockchain?', a: 'The regulation is technology-neutral — it requires immutable, auditable product data accessible via a data carrier. Blockchain is the strongest way to meet the immutability requirement. AuthiChain uses Polygon for low-cost, high-throughput on-chain verification.' },
            { q: 'When do I need to be compliant?', a: 'The central registry opens July 2026. Batteries are first (Feb 2027), followed by textiles and electronics. If you sell physical products in the EU, starting preparation now avoids supply chain disruption.' },
            { q: 'Can I use my existing QR codes?', a: 'Yes. QRON can generate DPP-compliant QR art that links to your existing product data systems, or you can use AuthiChain as your complete DPP data host.' },
            { q: 'What does it cost?', a: 'QRON starts at $29 for a single design. Enterprise DPP solutions through AuthiChain are custom-quoted based on product volume and integration requirements.' },
          ].map((item) => (
            <div key={item.q} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>{item.q}</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Read More + CTA */}
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '48px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>
          Read our full guide: <Link href="/blog/eu-digital-product-passport-2026" style={{ color: '#c9a227', textDecoration: 'underline' }}>EU Digital Product Passport: What Brands Need to Know Before 2027</Link>
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/pricing" style={{ background: '#c9a227', color: '#000', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}>
            Get DPP Ready Now
          </Link>
          <Link href="/contact" style={{ background: 'transparent', color: '#e5e5e5', padding: '14px 28px', borderRadius: '10px', border: '1px solid #333', textDecoration: 'none', fontWeight: 600, fontSize: '16px' }}>
            Contact Enterprise Sales
          </Link>
        </div>
      </section>
    </div>
  )
}
