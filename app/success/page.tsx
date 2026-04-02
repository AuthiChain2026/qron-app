'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SuccessPage() {
  const [step, setStep] = useState(0)
  const [session, setSession] = useState('')

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    setSession(p.get('session_id') || '')
    const t1 = setTimeout(() => setStep(1), 800)
    const t2 = setTimeout(() => setStep(2), 2200)
    const t3 = setTimeout(() => setStep(3), 3800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const gold = '#c9a227'
  const steps = [
    { icon: '🎨', label: 'Generating your AI QR art' },
    { icon: '🔄', label: 'Creating your Living Portal' },
    { icon: '📧', label: 'Sending delivery email' },
  ]

  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: gold, marginBottom: '8px' }}>Order Confirmed!</h1>
        <p style={{ color: '#888', fontSize: '16px', marginBottom: '36px' }}>
          Your AI QR art is being generated right now.
        </p>

        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '28px', marginBottom: '24px', textAlign: 'left' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: i < 2 ? '20px' : 0 }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: step > i ? 'rgba(201,162,39,.15)' : '#1a1a1a', border: `1px solid ${step > i ? gold : '#333'}`, fontSize: '16px', flexShrink: 0, transition: 'all .4s' }}>
                {step > i ? '✓' : s.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: step > i ? gold : '#666', transition: 'color .4s' }}>
                {s.label}
                {step > i && <span style={{ display: 'block', fontSize: '12px', color: '#555', fontWeight: 400, marginTop: '2px' }}>Complete</span>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(201,162,39,.06)', border: '1px solid rgba(201,162,39,.2)', borderRadius: '12px', padding: '20px', marginBottom: '24px', textAlign: 'left' }}>
          <div style={{ fontWeight: 700, marginBottom: '12px', fontSize: '14px' }}>What happens next</div>
          {[
            ['📬', 'Check your email', 'Your PNG download link arrives within ~90 seconds'],
            ['🔄', 'Living Portal is ready', 'Track scan analytics at qron.space/portals'],
            ['🖨️', 'Print or share', 'High-res PNG ready for print or digital use'],
          ].map(([icon, title, desc]) => (
            <div key={String(title)} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>{title}</div>
                <div style={{ color: '#666', fontSize: '12px' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          <Link href="/portals" style={{ background: gold, color: '#000', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
            View My Portals →
          </Link>
          <Link href="/order" style={{ background: 'transparent', color: '#e5e5e5', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '14px', border: '1px solid #333' }}>
            Submit Order Details
          </Link>
        </div>

        {session && <p style={{ color: '#333', fontSize: '11px', marginBottom: '12px' }}>Order ref: {session.slice(-8).toUpperCase()}</p>}
        <p style={{ color: '#444', fontSize: '13px' }}>
          Questions? <a href="mailto:qron@qron.space" style={{ color: gold }}>qron@qron.space</a>
        </p>
      </div>
    </div>
  )
}
