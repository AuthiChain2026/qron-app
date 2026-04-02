'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

interface StatusData {
  ready: boolean
  imageUrl: string | null
  portalUrl: string | null
  statsUrl: string | null
  portalShortcode: string | null
  destination_url: string | null
  email: string | null
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<StatusData | null>(null)
  const [polling, setPolling] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  const checkStatus = useCallback(async () => {
    if (!sessionId) return
    try {
      const res = await fetch(`/api/portals/check?session_id=${sessionId}`)
      const data = await res.json()
      setStatus(data)
      if (data.ready) setPolling(false)
    } catch { /* continue polling */ }
    setAttempts(a => a + 1)
  }, [sessionId])

  useEffect(() => {
    if (!sessionId) return
    setPolling(true)
    checkStatus()
    const interval = setInterval(() => {
      setElapsed(e => e + 3)
      checkStatus()
    }, 3000)
    const timeout = setTimeout(() => {
      clearInterval(interval)
      setPolling(false)
    }, 120000) // stop after 2 min
    return () => { clearInterval(interval); clearTimeout(timeout) }
  }, [sessionId, checkStatus])

  const S = {
    page: { background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '24px' } as const,
    card: { background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px',
      padding: '40px', maxWidth: '560px', width: '100%' } as const,
    gold: { color: '#c9a227' } as const,
    muted: { color: '#666', fontSize: '13px' } as const,
  }

  if (!sessionId) return (
    <div style={S.page}>
      <div style={S.card}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Invalid session</h1>
        <Link href="/gig" style={{ color: '#c9a227' }}>← Back to QRON</Link>
      </div>
    </div>
  )

  const ready = status?.ready
  const pct = Math.min(95, attempts * 5)

  return (
    <div style={S.page}>
      <div style={S.card}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>{ready ? '✨' : '🎨'}</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '8px' }}>
            {ready ? 'Your AI QR Art is Ready!' : 'Creating Your Art...'}
          </h1>
          <p style={{...S.muted, fontSize: '14px' }}>
            {ready ? 'Check your email for the download link.' : `Generating your AI QR art — ${elapsed}s elapsed`}
          </p>
        </div>

        {/* Progress bar while generating */}
        {!ready && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ background: '#1a1a1a', borderRadius: '100px', height: '6px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '100px',
                background: 'linear-gradient(90deg, #7c3aed, #c9a227)',
                width: `${pct}%`,
                transition: 'width 2s ease',
              }} />
            </div>
            <p style={{...S.muted, textAlign: 'center', marginTop: '8px' }}>
              This takes 30–90 seconds. Don't close this tab.
            </p>
          </div>
        )}

        {/* Art reveal */}
        {ready && status?.imageUrl && (
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <img
              src={status.imageUrl}
              alt="Your QRON AI QR Art"
              style={{ width: '100%', maxWidth: '320px', borderRadius: '12px', margin: '0 auto', display: 'block' }}
            />
            <div style={{ marginTop: '16px' }}>
              <a href={status.imageUrl} download
                style={{
                  background: '#7c3aed', color: '#fff', padding: '10px 24px',
                  borderRadius: '8px', fontWeight: 700, textDecoration: 'none',
                  display: 'inline-block', fontSize: '14px'
                }}>
                ⬇ Download PNG
              </a>
            </div>
          </div>
        )}

        {/* Living Portal card */}
        {ready && status?.portalUrl && (
          <div style={{
            background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.3)',
            borderRadius: '12px', padding: '20px', marginBottom: '16px'
          }}>
            <h2 style={{...S.gold, fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>
              🔄 Your Living Portal
            </h2>
            <p style={{...S.muted, marginBottom: '12px' }}>
              This QR tracks every scan. Update the destination any time without reprinting.
            </p>
            <div style={{ marginBottom: '8px' }}>
              <span style={{...S.muted }}>Portal URL: </span>
              <a href={status.portalUrl} target="_blank" rel="noopener"
                style={{...S.gold, fontWeight: 700, fontSize: '14px' }}>
                {status.portalUrl}
              </a>
            </div>
            {status.statsUrl && (
              <Link href={status.statsUrl}
                style={{ ...S.gold, fontSize: '13px', fontWeight: 700 }}>
                📊 View Scan Analytics →
              </Link>
            )}
          </div>
        )}

        {/* All portals link */}
        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '16px', marginTop: '16px' }}>
          <Link href="/portals"
            style={{ color: '#c9a227', fontSize: '13px', fontWeight: 700 }}>
            View all your portals →
          </Link>
          <span style={{...S.muted, marginLeft: '16px' }}>
            <Link href="/order" style={{ color: '#888' }}>Generate another →</Link>
          </span>
        </div>

        {/* Fallback if not ready after 2 min */}
        {!ready && !polling && attempts > 5 && (
          <div style={{ background: '#1a1a1a', borderRadius: '10px', padding: '16px', marginTop: '16px' }}>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>
              Generation is taking longer than expected — your art will be delivered to your email within 1 hour.
            </p>
            <p style={{...S.muted }}>
              Questions? <a href="mailto:authichain@gmail.com" style={{ color: '#c9a227' }}>authichain@gmail.com</a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ background: '#0a0a0a', minHeight: '100vh' }} />}>
      <SuccessContent />
    </Suspense>
  )
}
