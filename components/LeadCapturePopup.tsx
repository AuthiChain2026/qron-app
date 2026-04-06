'use client'

import { useState, useEffect } from 'react'
import { X, ArrowRight } from 'lucide-react'

export function LeadCapturePopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const dismiss = () => {
    setVisible(false)
    try { sessionStorage.setItem('qron_lead_dismissed', '1') } catch {}
  }

  useEffect(() => {
    try {
      if (sessionStorage.getItem('qron_lead_dismissed')) return
      if (localStorage.getItem('qron_lead_captured')) return
    } catch {}

    const timer = setTimeout(() => setVisible(true), 8000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)

    try {
      const params = new URLSearchParams(window.location.search)
      await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'banner',
          page_url: window.location.pathname,
          product_interest: 'qron',
          utm_source: params.get('utm_source') || '',
          utm_medium: params.get('utm_medium') || '',
          utm_campaign: params.get('utm_campaign') || '',
        }),
      })
      setSubmitted(true)
      try { localStorage.setItem('qron_lead_captured', '1') } catch {}
      setTimeout(dismiss, 3000)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      animation: 'slideUp 0.4s ease-out',
    }}>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
      <div style={{
        borderTop: '1px solid rgba(201,162,39,0.2)',
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(12px)',
        padding: '12px 16px',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {submitted ? (
            <p style={{ color: '#10b981', fontSize: '14px', fontWeight: 600, flex: 1, textAlign: 'center' }}>
              Welcome! Your 10 free AI QR codes are ready.
            </p>
          ) : (
            <>
              <p style={{ color: '#9e9e9e', fontSize: '14px', flex: 1 }}>
                <span style={{ color: '#e5e5e5', fontWeight: 700 }}>10 free AI QR codes</span> — create stunning QR art, no credit card needed.
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(201,162,39,0.2)',
                    background: '#1a1a1a',
                    color: '#e5e5e5',
                    fontSize: '13px',
                    width: '180px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #c9a227, #a07c10)',
                    color: '#000',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: loading ? 'wait' : 'pointer',
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  {loading ? '...' : 'Get Free'}
                  {!loading && <ArrowRight size={13} />}
                </button>
              </form>
            </>
          )}
          <button
            onClick={dismiss}
            style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, padding: '4px' }}
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
