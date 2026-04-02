'use client'
import { useState } from 'react'

export default function AffiliateApply() {
  const [form, setForm] = useState({ name: '', email: '', website: '', audience: '', why: '' })
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle')
  const [code, setCode] = useState('')
  
  const SUPA_URL  = 'https://nhdnkzhtadfkkluiulhs.supabase.co'
  const SUPA_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZG5remh0YWRma2tsdWl1bGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzgyNTUsImV4cCI6MjA4OTUxNDI1NX0.akaWgxRilnjavzpsLqU149nBJqxDjbYOnRdAqrwz4J8'
  
  async function submit() {
    if (!form.email || !form.name) return
    setStatus('loading')
    const ref = form.name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12) + Math.random().toString(36).slice(2, 6)
    try {
      await fetch(SUPA_URL + '/rest/v1/affiliates', {
        method: 'POST',
        headers: { apikey: SUPA_ANON, Authorization: 'Bearer ' + SUPA_ANON, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ email: form.email, name: form.name, website: form.website, audience_description: form.audience, notes: form.why, ref_code: ref, status: 'pending', commission_rate: 0.20, created_at: new Date().toISOString() }),
      })
      setCode(ref)
      setStatus('done')
    } catch { setStatus('error') }
  }
  
  const gold = '#c9a227'
  const inp = { width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(201,162,39,.2)', borderRadius: '8px', color: '#e5e5e5', fontSize: '14px', padding: '11px 13px', outline: 'none', fontFamily: 'inherit' } as const
  const lbl = { display: 'block', fontSize: '11px', fontWeight: 700 as const, color: gold, letterSpacing: '.1em', textTransform: 'uppercase' as const, marginBottom: '6px', marginTop: '18px' }
  
  if (status === 'done') return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: '#111', border: '1px solid rgba(201,162,39,.3)', borderRadius: '16px', padding: '40px', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>You're in!</h1>
        <p style={{ color: '#888', marginBottom: '24px' }}>Your affiliate application is approved. Here's your referral link:</p>
        <div style={{ background: 'rgba(201,162,39,.1)', border: '1px solid rgba(201,162,39,.3)', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '4px' }}>YOUR AFFILIATE LINK</div>
          <div style={{ fontWeight: 700, color: gold }}>https://qron.space/?ref={code}</div>
        </div>
        <p style={{ color: '#555', fontSize: '13px' }}>We'll email you at {form.email} with your dashboard link and payment setup.</p>
      </div>
    </div>
  )

  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '36px 28px', maxWidth: '520px', width: '100%' }}>
        <div style={{ fontSize: '22px', fontWeight: 900, color: gold, marginBottom: '4px' }}>QRON</div>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '4px' }}>Affiliate Application</h1>
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '24px' }}>Takes 2 minutes. Most applications approved instantly.</p>
        <label style={lbl}>Full Name *</label>
        <input style={inp} placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
        <label style={lbl}>Email *</label>
        <input style={inp} type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
        <label style={lbl}>Website / Social</label>
        <input style={inp} placeholder="instagram.com/yourhandle or yoursite.com" value={form.website} onChange={e => setForm(f => ({...f, website: e.target.value}))} />
        <label style={lbl}>Who is your audience?</label>
        <input style={inp} placeholder="Restaurants, dispensaries, marketing clients..." value={form.audience} onChange={e => setForm(f => ({...f, audience: e.target.value}))} />
        <label style={lbl}>Why do you want to promote QRON?</label>
        <input style={inp} placeholder="I work with brands that need QR codes..." value={form.why} onChange={e => setForm(f => ({...f, why: e.target.value}))} />
        {status === 'error' && <p style={{ color: '#f66', fontSize: '13px', marginTop: '8px' }}>Something went wrong. Email qron@qron.space to apply manually.</p>}
        <button style={{ width: '100%', marginTop: '24px', padding: '14px', background: gold, color: '#000', fontSize: '15px', fontWeight: 700, border: 'none', borderRadius: '10px', cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.6 : 1 }}
          disabled={status === 'loading'} onClick={submit}>
          {status === 'loading' ? 'Submitting...' : 'Apply Now →'}
        </button>
      </div>
    </div>
  )
}
