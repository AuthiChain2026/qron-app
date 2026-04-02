'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SuccessPage() {
  const [session, setSession] = useState<string|null>(null)
  const [step, setStep] = useState(0)
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sid = params.get('session_id')
    setSession(sid)
    // Animate steps
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const gold = '#c9a227'
  const steps = [
    { icon: '🎨', label: 'Generating your AI QR art', done: step >= 1 },
    { icon: '🔄', label: 'Creating your Living Portal', done: step >= 2 },
    { icon: '📧', label: 'Sending delivery email', done: step >= 3 },
  ]

  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: gold, marginBottom: '8px' }}>Order Confirmed!</h1>
        <p style={{ color: '#888', fontSize: '16px', marginBottom: '40px' }}>
          Your AI QR art is being generated right now.
        </p>

        {/* Progress steps */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '28px', marginBottom: '28px', textAlign: 'left' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: i < steps.length-1 ? '20px' : 0 }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.done ? 'rgba(201,162,39,.15)' : '#1a1a1a', border: `1px solid ${s.done ? gold : '#333'}`, fontSize: '18px', flexShrink: 0, transition: 'all .4s' }}>
                {s.done ? '✓' : s.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: s.done ? gold : '#666', transition: 'color .4s' }}>{s.label}</div>
                {s.done && <div style={{ fontSize: '12px', color: '#555', marginTop: '2px' }}>Complete</div>}
              </div>
            </div>
          ))}
        </div>

        {/* What happens next */}
        <div style={{ background: 'rgba(201,162,39,.06)', border: '1px solid rgba(201,162,39,.2)', borderRadius: '12px', padding: '20px', marginBottom: '24px', textAlign: 'left' }}>
          <div style={{ fontWeight: 700, marginBottom: '12px', fontSize: '14px' }}>What happens next:</div>
          {[
            ['📬', 'You'll receive an email', 'Within ~90 seconds with your PNG download link'],
            ['🔄', 'Your Living Portal is created', 'Track scan analytics at qron.space/portals'],
            ['🖨️', 'Print or share your QR', 'High-res PNG, ready for print or digital use'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>{title}</div>
                <div style={{ color: '#666', fontSize: '12px' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/portals" style={{ background: gold, color: '#000', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
            View My Portals →
          </Link>
          <Link href="/order" style={{ background: 'transparent', color: '#e5e5e5', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '14px', border: '1px solid #333' }}>
            Submit Order Details
          </Link>
        </div>

        {session && (
          <p style={{ color: '#333', fontSize: '11px', marginTop: '24px' }}>
            Order ref: {session.slice(-8).toUpperCase()}
          </p>
        )}

        <p style={{ color: '#444', fontSize: '13px', marginTop: '20px' }}>
          Questions? <a href="mailto:qron@qron.space" style={{ color: gold }}>qron@qron.space</a>
        </p>
      </div>
    </div>
  )
}
