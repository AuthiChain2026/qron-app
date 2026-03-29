'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Sparkles, ArrowRight } from 'lucide-react'

export function LeadCapturePopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const dismiss = useCallback(() => {
    setVisible(false)
    try { sessionStorage.setItem('qron_lead_dismissed', '1') } catch {}
  }, [])

  useEffect(() => {
    try {
      if (sessionStorage.getItem('qron_lead_dismissed')) return
      if (localStorage.getItem('qron_lead_captured')) return
    } catch {}

    let timer: ReturnType<typeof setTimeout>

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setVisible(true)
    }

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrollPercent > 0.5) setVisible(true)
    }

    timer = setTimeout(() => setVisible(true), 45000)

    const activateTimer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
      window.addEventListener('scroll', handleScroll, { passive: true })
    }, 8000)

    return () => {
      clearTimeout(timer)
      clearTimeout(activateTimer)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
    }
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
          source: 'popup',
          page_url: window.location.pathname,
          product_interest: 'qron',
          utm_source: params.get('utm_source') || '',
          utm_medium: params.get('utm_medium') || '',
          utm_campaign: params.get('utm_campaign') || '',
        }),
      })
      setSubmitted(true)
      try { localStorage.setItem('qron_lead_captured', '1') } catch {}
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="relative w-full max-w-md mx-4 rounded-2xl p-8 shadow-2xl" style={{ background: '#111', border: '1px solid rgba(201,162,39,0.3)' }}>
        <button onClick={dismiss} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'rgba(201,162,39,0.15)' }}>
              <Sparkles className="h-8 w-8" style={{ color: '#c9a227' }} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Welcome to QRON!</h3>
            <p style={{ color: '#9e9e9e' }}>
              Your 10 free AI QR code generations are ready. Sign up to start creating.
            </p>
            <a href="/login" className="inline-block mt-6 px-6 py-2 rounded-lg font-medium text-black" style={{ background: 'linear-gradient(135deg, #c9a227, #a07c10)' }}>
              Create Your First QRON
            </a>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4" style={{ background: 'rgba(201,162,39,0.1)', color: '#c9a227' }}>
              <Sparkles className="h-3 w-3" />
              Free Access
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">
              Get 10 Free AI QR Codes
            </h3>
            <p className="mb-6" style={{ color: '#9e9e9e' }}>
              Create stunning, scannable QR art with AI. Cryptographically signed by the AuthiChain Protocol.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2"
                style={{ background: '#1a1a1a', border: '1px solid rgba(201,162,39,0.2)', focusRingColor: '#c9a227' }}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-black font-semibold hover:opacity-90 disabled:opacity-50 transition"
                style={{ background: 'linear-gradient(135deg, #c9a227, #a07c10)' }}
              >
                {loading ? 'Joining...' : 'Get Free QRONs'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
            <p className="text-xs mt-3 text-center" style={{ color: '#4a4a4a' }}>
              No credit card required. 10 generations included.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
