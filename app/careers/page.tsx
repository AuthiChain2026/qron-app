import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers — Internships & Entry-Level Roles at QRON, AuthiChain & StrainChain',
  description: 'Join the QRON / AuthiChain ecosystem. Explore internship and entry-level opportunities in AI, blockchain, full-stack development, design, and marketing.',
  alternates: { canonical: 'https://qron.space/careers' },
}

const platforms = [
  { name: 'QRON', url: 'https://qron.space', tagline: 'AI QR Code Art Generator', desc: 'Transform QR codes into AI-generated art. Built with Next.js, Fal.ai, Supabase, and Stripe.' },
  { name: 'AuthiChain', url: 'https://authichain.com', tagline: 'Blockchain Product Authentication', desc: 'AI classification + blockchain verification to fight counterfeits across 10+ industries.' },
  { name: 'StrainChain', url: 'https://strainchain.io', tagline: 'Cannabis Authentication & Compliance', desc: 'Seed-to-sale blockchain tracking with METRC integration for the regulated cannabis market.' },
]

const internships = [
  { title: 'Frontend Engineering Intern', platform: 'QRON / AuthiChain', desc: 'Build production React 19 + Next.js 15 components — AI QR generator UI, dashboards, and verification flows.', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { title: 'AI / Generative Art Intern', platform: 'QRON', desc: 'Improve AI QR code generation pipelines using Fal.ai. Experiment with ControlNet, prompt engineering, and image quality scoring.', skills: ['Python', 'Fal.ai', 'ControlNet', 'Prompt Engineering'] },
  { title: 'Blockchain Developer Intern', platform: 'AuthiChain / StrainChain', desc: 'Write and deploy Solidity smart contracts (ERC-721) on Polygon and VeChain for product authentication NFTs.', skills: ['Solidity', 'Hardhat', 'Ethers.js', 'ERC-721'] },
  { title: 'Full-Stack Developer Intern', platform: 'StrainChain', desc: 'Build seed-to-sale tracking features, METRC API integrations, and compliance dashboards.', skills: ['Next.js', 'Supabase', 'PostgreSQL', 'REST APIs'] },
  { title: 'UI/UX Design Intern', platform: 'QRON / AuthiChain', desc: 'Design intuitive interfaces for AI QR code generation, product verification flows, and enterprise dashboards.', skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research'] },
  { title: 'Growth & Marketing Intern', platform: 'All Platforms', desc: 'Drive user acquisition across QRON, AuthiChain, and StrainChain. Run SEO experiments, content campaigns, and email sequences.', skills: ['SEO', 'Content Marketing', 'Analytics', 'Email'] },
  { title: 'DevOps / Infrastructure Intern', platform: 'QRON / AuthiChain', desc: 'Manage Vercel deployments, Cloudflare Workers, Supabase infrastructure, and CI/CD pipelines.', skills: ['Cloudflare Workers', 'Vercel', 'CI/CD', 'PostgreSQL'] },
  { title: 'Community & DevRel Intern', platform: 'All Platforms', desc: 'Build developer documentation, create tutorials, manage communities, and support enterprise onboarding.', skills: ['Technical Writing', 'Community', 'API Docs', 'Public Speaking'] },
]

const entryLevel = [
  { title: 'Junior Full-Stack Engineer', platform: 'QRON / AuthiChain', desc: 'Own features end-to-end — APIs, React components, database schemas. Ship code to production daily.', skills: ['Next.js 15', 'TypeScript', 'Supabase', 'Drizzle ORM'] },
  { title: 'Junior AI Engineer', platform: 'QRON / AuthiChain', desc: 'Build and optimize AI pipelines for QR code art generation (Fal.ai) and product classification (GPT-4 Vision).', skills: ['Python', 'OpenAI', 'Fal.ai', 'Image Generation'] },
  { title: 'Junior Smart Contract Engineer', platform: 'AuthiChain / StrainChain', desc: 'Develop and audit ERC-721 contracts, implement token economics, and build cross-chain verification.', skills: ['Solidity', 'OpenZeppelin', 'Polygon', 'VeChain'] },
]

const benefits = [
  'Work on production apps used by real customers',
  'Ship code to blockchain networks (Polygon, VeChain)',
  'Mentorship from senior engineers and founders',
  'Flexible remote schedule — work from anywhere',
  'Exposure to AI, blockchain, and enterprise SaaS',
  'Potential conversion to full-time roles',
  'Letter of recommendation upon completion',
  'Build a portfolio with real-world impact',
]

export default function CareersPage() {
  const card: React.CSSProperties = { background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '24px' }
  const badge = (text: string, color: string): React.CSSProperties => ({ fontSize: '11px', fontWeight: 600, background: `${color}18`, color, padding: '2px 10px', borderRadius: '9999px', display: 'inline-block' })
  const skillChip: React.CSSProperties = { fontSize: '11px', background: '#1a1a1a', border: '1px solid #262626', borderRadius: '9999px', padding: '3px 12px', color: '#888' }

  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero */}
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px 48px', textAlign: 'center' }}>
        <span style={badge('Internships & Entry-Level Roles', '#7c3aed')}>Internships & Entry-Level Roles</span>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, marginTop: '20px', marginBottom: '16px', lineHeight: 1.1 }}>
          Build the future of <span style={{ color: '#c9a227' }}>AI & blockchain.</span>
        </h1>
        <p style={{ color: '#888', fontSize: '17px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
          Join our ecosystem of three platforms — QRON, AuthiChain, and StrainChain — and gain real-world experience shipping production code across AI, blockchain, and enterprise SaaS.
        </p>
      </section>

      {/* Platforms */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 48px' }}>
        <h2 style={{ fontWeight: 800, fontSize: '20px', textAlign: 'center', marginBottom: '20px', color: '#aaa' }}>Our Platforms</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {platforms.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{ ...card, textDecoration: 'none', color: 'inherit' }}>
              <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>{p.name}</div>
              <div style={{ color: '#7c3aed', fontSize: '13px', marginBottom: '10px' }}>{p.tagline}</div>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Internships */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 48px' }}>
        <h2 style={{ fontWeight: 800, fontSize: '24px', textAlign: 'center', marginBottom: '8px' }}>Internship Opportunities</h2>
        <p style={{ color: '#666', textAlign: 'center', fontSize: '15px', marginBottom: '32px' }}>Gain hands-on experience shipping production code across AI, blockchain, and web platforms.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '16px' }}>
          {internships.map(r => (
            <div key={r.title} style={card}>
              <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '6px' }}>{r.title}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span style={badge('Internship', '#10b981')}>Internship</span>
                <span style={{ fontSize: '12px', color: '#666' }}>{r.platform}</span>
                <span style={{ fontSize: '12px', color: '#555' }}>Remote</span>
              </div>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.6, margin: '0 0 14px' }}>{r.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {r.skills.map(s => <span key={s} style={skillChip}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Entry-Level */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 48px' }}>
        <h2 style={{ fontWeight: 800, fontSize: '24px', textAlign: 'center', marginBottom: '8px' }}>Entry-Level Roles</h2>
        <p style={{ color: '#666', textAlign: 'center', fontSize: '15px', marginBottom: '32px' }}>Ready to go full-time? These roles are ideal for recent graduates or career changers.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {entryLevel.map(r => (
            <div key={r.title} style={card}>
              <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '6px' }}>{r.title}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span style={badge('Entry-Level', '#3b82f6')}>Entry-Level</span>
                <span style={{ fontSize: '12px', color: '#666' }}>{r.platform}</span>
              </div>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.6, margin: '0 0 14px' }}>{r.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {r.skills.map(s => <span key={s} style={skillChip}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px 48px' }}>
        <h2 style={{ fontWeight: 800, fontSize: '24px', textAlign: 'center', marginBottom: '24px' }}>Why Join Us</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {benefits.map(b => (
            <div key={b} style={{ ...card, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ color: '#c9a227', fontWeight: 700 }}>→</span>
              <span style={{ color: '#bbb', fontSize: '14px' }}>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Apply CTA */}
      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(201,162,39,0.08))', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '48px 32px' }}>
          <h2 style={{ fontWeight: 900, fontSize: '24px', marginBottom: '12px' }}>Ready to Apply?</h2>
          <p style={{ color: '#888', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 24px' }}>
            Send your resume, a brief intro, and the role you're interested in. Include any relevant GitHub repos or portfolio links.
          </p>
          <a
            href="mailto:authichain@gmail.com?subject=Internship%20%2F%20Entry-Level%20Application%20—%20QRON"
            style={{ display: 'inline-block', background: '#c9a227', color: '#000', fontWeight: 800, fontSize: '14px', padding: '12px 32px', borderRadius: '9999px', textDecoration: 'none' }}
          >
            Apply Now →
          </a>
          <p style={{ color: '#555', fontSize: '12px', marginTop: '14px' }}>authichain@gmail.com</p>
        </div>
      </section>

      {/* Footer nav */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px 48px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {[
            ['/', 'Home'],
            ['/pricing', 'Pricing'],
            ['/contact', 'Contact'],
            ['/free-qr-generator', 'Free QR Generator'],
          ].map(([href, label]) => (
            <Link key={href} href={href} style={{ color: '#666', fontSize: '13px', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
