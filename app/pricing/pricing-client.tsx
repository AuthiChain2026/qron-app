'use client'
import { useState, useEffect } from 'react'

export function CheckoutModal({ plan, label, price }: { plan: string, label: string, price: string }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent SSR rendering the modal
  useEffect(() => { setMounted(true) }, [])

  const handleCheckout = async () => {
    if (!email || !email.includes('@')) return
    setLoading(true)
    try {
      const r = await fetch('https://qron-checkout-capture.undone-k.workers.dev/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan })
      })
      const d = await r.json()
      if (d.url) window.location.href = d.url
    } catch {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          width: '100%',
          background: '#c9a227',
          color: '#000',
          border: 'none',
          borderRadius: 10,
          padding: '13px',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        Get {label} →
      </button>

      {mounted && open && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div style={{
            background: '#111',
            border: '1px solid rgba(201,162,39,.3)',
            borderRadius: 16,
            padding: 32,
            maxWidth: 400,
            width: '100%',
            margin: '0 24px'
          }}>
            <h3 style={{ color: '#c9a227', marginBottom: 8 }}>Get {label}</h3>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 20 }}>
              Enter your email to continue to checkout.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              autoFocus
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheckout()}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,.06)',
                border: '1px solid rgba(201,162,39,.3)',
                borderRadius: 8,
                color: '#e5e5e5',
                padding: '10px 12px',
                fontSize: 14,
                outline: 'none',
                marginBottom: 12
              }}
            />
            <button
              onClick={handleCheckout}
              disabled={loading || !email.includes('@')}
              style={{
                width: '100%',
                background: '#c9a227',
                color: '#000',
                border: 'none',
                borderRadius: 8,
                padding: '12px',
                fontSize: 15,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading || !email.includes('@') ? 0.6 : 1
              }}
            >
              {loading ? 'Redirecting...' : `Continue to ${price} →`}
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: '100%',
                background: 'transparent',
                color: '#666',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
                marginTop: 8,
                fontSize: 13
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}
