import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'QRON Blog — AI QR Code Tips, Guides & Industry Insights',
  description: 'Learn how AI QR codes work, best practices for cannabis and restaurant QR codes, and how to generate beautiful scannable art.',
  alternates: { canonical: 'https://qron.space/blog' },
}

const POSTS = [
  {
    slug: 'how-ai-qr-codes-work',
    title: 'How AI QR Codes Work — The Technology Behind Beautiful, Scannable Art',
    excerpt: "AI QR codes use ControlNet diffusion models to wrap artistic imagery around the QR data structure. Here's exactly how they work and why they scan reliably.",
    date: '2026-04-02',
    category: 'Technology',
    readTime: '5 min',
  },
  {
    slug: 'cannabis-dispensary-qr-code-guide',
    title: 'Cannabis Dispensary QR Codes — Compliance, Packaging & Best Practices 2026',
    excerpt: 'Everything dispensaries need to know about QR codes on cannabis packaging — METRC compliance, label requirements, and how AI art QR codes increase scan rates.',
    date: '2026-04-02',
    category: 'Cannabis',
    readTime: '7 min',
  },
  {
    slug: 'restaurant-menu-qr-code-guide',
    title: 'Restaurant Menu QR Codes — Design Guide That Gets Customers Scanning',
    excerpt: 'Standard black QR codes on restaurant tables have a 12% scan rate. AI art QR codes average 43%. Here is what works and why.',
    date: '2026-04-02',
    category: 'Restaurant',
    readTime: '6 min',
  },
]

const S = {
  page: { background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' } as const,
  container: { maxWidth: '800px', margin: '0 auto', padding: '80px 24px 60px' } as const,
  tag: { fontSize: '12px', color: '#7c3aed', letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: '16px' },
  h1: { fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, marginBottom: '12px' } as const,
  sub: { color: '#888', fontSize: '17px', marginBottom: '48px' } as const,
  list: { display: 'flex', flexDirection: 'column' as const, gap: '2px' },
  card: { background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '28px 32px', textDecoration: 'none', color: '#e5e5e5', display: 'block' } as const,
  meta: { display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' } as const,
  badge: { background: '#7c3aed22', color: '#a78bfa', fontSize: '11px', padding: '3px 10px', borderRadius: '100px' } as const,
  date: { color: '#555', fontSize: '12px' } as const,
  title: { fontWeight: 700, fontSize: '18px', marginBottom: '8px', lineHeight: 1.3 } as const,
  excerpt: { color: '#888', fontSize: '14px', lineHeight: 1.6 } as const,
  link: { color: '#7c3aed', fontSize: '13px', marginTop: '14px', fontWeight: 600 } as const,
  cta: { marginTop: '48px', textAlign: 'center' as const },
  btn: { background: '#7c3aed', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 } as const,
}

export default function BlogPage() {
  return (
    <div style={S.page}>
      <section style={S.container}>
        <div style={S.tag}>QRON Blog</div>
        <h1 style={S.h1}>AI QR Code Guides & Insights</h1>
        <p style={S.sub}>Tips, guides, and industry insights for brands using AI QR codes.</p>
        <div style={S.list}>
          {POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={S.card}>
              <div style={S.meta}>
                <span style={S.badge}>{post.category}</span>
                <span style={S.date}>{post.date} · {post.readTime} read</span>
              </div>
              <div style={S.title}>{post.title}</div>
              <div style={S.excerpt}>{post.excerpt}</div>
              <div style={S.link}>Read more →</div>
            </Link>
          ))}
        </div>
        <div style={S.cta}>
          <Link href="/free-qr-generator" style={S.btn}>Try QRON Free →</Link>
        </div>
      </section>
    </div>
  )
}
