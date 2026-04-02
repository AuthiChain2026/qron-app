'use client'
import { useState } from 'react'

const QRON_API = 'https://qron-ai-api.undone-k.workers.dev'
const PORTAL_FN = 'https://nhdnkzhtadfkkluiulhs.supabase.co/functions/v1/portal-create'
const SUPA_URL = 'https://nhdnkzhtadfkkluiulhs.supabase.co'
const SUPA_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZG5remh0YWRma2tsdWl1bGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzgyNTUsImV4cCI6MjA4OTUxNDI1NX0.akaWgxRilnjavzpsLqU149nBJqxDjbYOnRdAqrwz4J8'

const STYLES = [
  { id: 'space', label: '🚀 Cosmic Space' },
  { id: 'cannabis', label: '🌿 Cannabis' },
  { id: 'cyberpunk', label: '⚡ Cyberpunk' },
  { id: 'nature', label: '🍃 Nature' },
  { id: 'abstract', label: '◆ Abstract' },
  { id: 'retro', label: '📻 Retro Vintage' },
]

export default function OrderPage() {
  const [url, setUrl] = useState('')
  const [style, setStyle] = useState('space')
  const [notes, setNotes] = useState('')
  const [email, setEmail] = useState('')
  const [ref, setRef] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [portalUrl, setPortalUrl] = useState('')
  const [provider, setProvider] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [done, setDone] = useState(false)

  async function generate() {
    if (!url.trim()) { setErrMsg('URL required'); return }
    setLoading(true); setErrMsg(''); setDone(false); setImageUrl('')

    try {
      // Create Living Portal
      let qrTarget = url
      let pUrl = url
      try {
        const pr = await fetch(PORTAL_FN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target_url: url, style, email: email || undefined, label: ref ? 'Fiverr ' + ref : undefined }),
        })
        const pd = await pr.json()
        if (pd.success) { qrTarget = pd.portal_url; pUrl = pd.portal_url }
      } catch { /* optional */ }

      // Generate art
      const res = await fetch(QRON_API + '/v1/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: qrTarget, style, prompt: notes || undefined }),
      })
      const d = await res.json()
      const img = d.previewUrl || d.downloadUrl || d.imageUrl || d.url
      if (!img) throw new Error(d.error || d.message || 'No image')

      // Update portal with image
      if (pUrl !== url) {
        const sc = pUrl.split('/').pop()
        if (sc) {
          fetch(SUPA_URL + '/rest/v1/portals?shortcode=eq.' + sc, {
            method: 'PATCH',
            headers: { apikey: SUPA_ANON, Authorization: 'Bearer ' + SUPA_ANON, 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_url: img }),
          }).catch(() => {})
        }
      }

      setImageUrl(img); setPortalUrl(pUrl); setProvider(d.provider || ''); setDone(true)
    } catch (e: unknown) {
      setErrMsg(e instanceof Error ? e.message : 'Generation failed')
    }
    setLoading(false)
  }

  const gold = '#c9a227'
  const surface = '#111'
  const border = 'rgba(201,162,39,.2)'

  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid #1e1e1e', padding: '28px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 900, color: gold, letterSpacing: '.08em', marginBottom: '4px' }}>QRON</div>
        <p style={{ color: '#888', fontSize: '14px' }}>AI QR Art — Submit Your Order Details</p>
      </div>

      <div style={{ maxWidth: '540px', margin: '32px auto', background: surface, border: '1px solid #1e1e1e', borderRadius: '16px', padding: '32px 28px' }}>
        <div style={{ background: 'rgba(30,209,100,.06)', border: '1px solid rgba(30,209,100,.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#888' }}>
          🎉 Thanks for your Fiverr order! Enter your details below to generate instantly.
        </div>

        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: gold, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '6px' }}>URL to Encode *</label>
        <input style={{ width: '100%', background: 'rgba(255,255,255,.04)', border: `1px solid ${border}`, borderRadius: '8px', color: '#e5e5e5', fontSize: '14px', padding: '11px 13px', outline: 'none', fontFamily: 'inherit' }}
          type="url" placeholder="https://your-website.com" value={url} onChange={e => setUrl(e.target.value)} />
        <p style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>Any link: menu, website, Instagram, product page, or any URL.</p>

        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: gold, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '6px', marginTop: '18px' }}>Art Style *</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {STYLES.map(s => (
            <button key={s.id}
              onClick={() => setStyle(s.id)}
              style={{ border: `1px solid ${style === s.id ? gold : border}`, background: style === s.id ? 'rgba(201,162,39,.1)' : 'transparent', borderRadius: '8px', padding: '10px 8px', cursor: 'pointer', color: style === s.id ? gold : '#e5e5e5', fontSize: '12px', textAlign: 'center' }}>
              {s.label}
            </button>
          ))}
        </div>

        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: gold, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '6px', marginTop: '18px' }}>Brand Notes (optional)</label>
        <textarea style={{ width: '100%', background: 'rgba(255,255,255,.04)', border: `1px solid ${border}`, borderRadius: '8px', color: '#e5e5e5', fontSize: '14px', padding: '11px 13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', minHeight: '72px' }}
          placeholder={'Colors, mood — e.g. "dark emerald for cannabis dispensary"'} value={notes} onChange={e => setNotes(e.target.value)} />

        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: gold, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '6px', marginTop: '18px' }}>Email (for download link)</label>
        <input style={{ width: '100%', background: 'rgba(255,255,255,.04)', border: `1px solid ${border}`, borderRadius: '8px', color: '#e5e5e5', fontSize: '14px', padding: '11px 13px', outline: 'none', fontFamily: 'inherit' }}
          type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />

        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: gold, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '6px', marginTop: '18px' }}>Fiverr Order ID (optional)</label>
        <input style={{ width: '100%', background: 'rgba(255,255,255,.04)', border: `1px solid ${border}`, borderRadius: '8px', color: '#e5e5e5', fontSize: '14px', padding: '11px 13px', outline: 'none', fontFamily: 'inherit' }}
          placeholder="e.g. FO1234567890" value={ref} onChange={e => setRef(e.target.value)} />

        {errMsg && <p style={{ color: '#f66', fontSize: '13px', marginTop: '8px' }}>{errMsg}</p>}

        <button style={{ width: '100%', marginTop: '24px', padding: '15px', background: gold, color: '#000', fontSize: '16px', fontWeight: 700, border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
          disabled={loading} onClick={generate}>
          {loading ? '🎨 Generating... (30–90s, please wait)' : '🎨 Generate My QR Art'}
        </button>

        {done && imageUrl && (
          <div style={{ marginTop: '24px' }}>
            <img src={imageUrl} alt="Your QRON AI QR Art" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', display: 'block', margin: '0 auto 16px' }} />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={imageUrl} download="qron-art.png" target="_blank" rel="noopener"
                style={{ background: '#7c3aed', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
                ⬇ Download PNG
              </a>
              {portalUrl !== url && (
                <a href="/portals" target="_blank" rel="noopener"
                  style={{ background: 'rgba(201,162,39,.15)', color: gold, padding: '10px 20px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px', border: `1px solid ${border}` }}>
                  📊 View Scan Analytics
                </a>
              )}
            </div>
            {portalUrl !== url && (
              <div style={{ background: 'rgba(201,162,39,.06)', border: `1px solid ${border}`, borderRadius: '10px', padding: '16px', marginTop: '16px' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px', fontSize: '14px' }}>🔄 Your Living Portal</div>
                <p style={{ color: '#888', fontSize: '13px', marginBottom: '8px' }}>Your QR tracks every scan. Update the destination anytime without reprinting.</p>
                <a href={portalUrl} style={{ color: gold, fontSize: '13px', fontWeight: 700 }}>{portalUrl}</a>
              </div>
            )}
            <p style={{ textAlign: 'center', color: '#555', fontSize: '12px', marginTop: '12px' }}>
              Provider: {provider} · Need a different style? Generate again.
            </p>
          </div>
        )}
      </div>

      <p style={{ textAlign: 'center', color: '#333', fontSize: '12px', padding: '24px' }}>
        QRON · <a href="https://qron.space" style={{ color: '#444' }}>qron.space</a>
      </p>
    </div>
  )
}
