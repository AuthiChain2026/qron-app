'use client'
import { useState } from 'react'

const QRON_API = 'https://qron-ai-api.undone-k.workers.dev'
const SUPA_URL = 'https://nhdnkzhtadfkkluiulhs.supabase.co'
const SUPA_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZG5remh0YWRma2tsdWl1bGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MzgyNTUsImV4cCI6MjA4OTUxNDI1NX0.akaWgxRilnjavzpsLqU149nBJqxDjbYOnRdAqrwz4J8'
const PORTAL_FN = 'https://nhdnkzhtadfkkluiulhs.supabase.co/functions/v1/portal-create'

const STYLES = [
  { id: 'space',    label: '🚀 Cosmic Space',   desc: 'Deep galaxy, purple & gold' },
  { id: 'cannabis', label: '🌿 Cannabis',        desc: 'Emerald botanical' },
  { id: 'cyberpunk',label: '⚡ Cyberpunk',        desc: 'Neon electric blue' },
  { id: 'nature',   label: '🍃 Nature',           desc: 'Watercolor botanical' },
  { id: 'abstract', label: '◆ Abstract',          desc: 'Geometric minimal' },
  { id: 'retro',    label: '📻 Retro Vintage',    desc: 'Warm americana' },
]

export default function OrderPage() {
  const [url, setUrl] = useState('')
  const [style, setStyle] = useState('space')
  const [notes, setNotes] = useState('')
  const [email, setEmail] = useState('')
  const [ref, setRef] = useState('')
  const [status, setStatus] = useState<'idle'|'generating'|'done'|'error'>('idle')
  const [imageUrl, setImageUrl] = useState('')
  const [portalUrl, setPortalUrl] = useState('')
  const [provider, setProvider] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const S: Record<string, React.CSSProperties> = {
    page: { background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '0' },
    hero: { background: 'linear-gradient(135deg, #0d0d0d, #111)', borderBottom: '1px solid #1e1e1e', padding: '32px 24px 24px', textAlign: 'center' },
    logo: { fontSize: '24px', fontWeight: 900, color: '#c9a227', letterSpacing: '0.08em', marginBottom: '4px' },
    card: { maxWidth: '560px', margin: '32px auto', background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '32px 28px' },
    label: { display: 'block', fontSize: '11px', fontWeight: 700, color: '#c9a227', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '6px', marginTop: '18px' },
    input: { width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(201,162,39,.2)', borderRadius: '8px', color: '#e5e5e5', fontSize: '14px', padding: '11px 13px', outline: 'none', fontFamily: 'inherit' },
    textarea: { width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(201,162,39,.2)', borderRadius: '8px', color: '#e5e5e5', fontSize: '14px', padding: '11px 13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical' as const, minHeight: '72px' },
    btn: { width: '100%', marginTop: '24px', padding: '15px', background: '#c9a227', color: '#000', fontSize: '16px', fontWeight: 700, border: 'none', borderRadius: '10px', cursor: 'pointer' },
    styleGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '8px' },
    styleBtn: (sel: boolean) => ({ border: `1px solid ${sel ? '#c9a227' : 'rgba(201,162,39,.15)'}`, background: sel ? 'rgba(201,162,39,.1)' : 'transparent', borderRadius: '8px', padding: '10px 8px', cursor: 'pointer', color: sel ? '#c9a227' : '#e5e5e5', textAlign: 'center' as const, fontSize: '13px' }),
    preview: { marginTop: '24px', border: '1px dashed rgba(201,162,39,.3)', borderRadius: '12px', padding: '24px', textAlign: 'center', minHeight: '120px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#555' },
    note: { fontSize: '12px', color: '#555', marginTop: '6px' },
    fiverr: { background: 'rgba(30,209,100,.06)', border: '1px solid rgba(30,209,100,.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '8px', fontSize: '13px', color: '#888' },
  }

  async function generate() {
    if (!url.trim()) { setErrMsg('URL required'); return }
    setStatus('generating')
    setErrMsg('')
    try {
      // 1. Create Living Portal first
      let portalUrlResult = url
      let shortcode = null
      try {
        const pr = await fetch(PORTAL_FN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target_url: url, style, email: email || undefined, label: ref ? `Fiverr ${ref}` : undefined }),
        })
        const pd = await pr.json()
        if (pd.success) { portalUrlResult = pd.portal_url; shortcode = pd.shortcode }
      } catch { /* portal creation optional */ }

      // 2. Generate art encoding the portal URL (so the QR redirects dynamically)
      const res = await fetch(`${QRON_API}/v1/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: portalUrlResult, style, prompt: notes || undefined }),
      })
      const d = await res.json()
      const img = d.previewUrl || d.downloadUrl || d.imageUrl || d.url
      if (!img) throw new Error(d.error || d.message || 'No image returned')

      // 3. Update portal with art
      if (shortcode) {
        fetch(`${SUPA_URL}/rest/v1/portals?shortcode=eq.${shortcode}`, {
          method: 'PATCH',
          headers: { apikey: SUPA_ANON, Authorization: `Bearer ${SUPA_ANON}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ image_url: img }),
        }).catch(() => {})
      }

      setImageUrl(img)
      setPortalUrl(portalUrlResult)
      setProvider(d.provider || '')
      setStatus('done')
    } catch (e: unknown) {
      setErrMsg(e instanceof Error ? e.message : 'Generation failed')
      setStatus('error')
    }
  }

  return (
    <div style={S.page}>
      <div style={S.hero}>
        <div style={S.logo}>QRON</div>
        <p style={{ color: '#888', fontSize: '14px' }}>AI QR Art — Submit Your Order Details</p>
      </div>

      <div style={S.card}>
        {/* Fiverr buyer context */}
        <div style={S.fiverr}>
          🎉 Thanks for your Fiverr order! Enter your details below to generate your AI QR art instantly.
          Your design will be ready in 30–90 seconds.
        </div>

        <label style={S.label}>Your URL to Encode *</label>
        <input style={S.input} type="url" placeholder="https://your-website.com" value={url} onChange={e => setUrl(e.target.value)} />
        <p style={S.note}>Any link: menu, website, Instagram, product page, COA, or any URL.</p>

        <label style={S.label}>Art Style *</label>
        <div style={S.styleGrid}>
          {STYLES.map(s => (
            <button key={s.id} style={S.styleBtn(style === s.id)} onClick={() => setStyle(s.id)}>
              <div>{s.label}</div>
              <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{s.desc}</div>
            </button>
          ))}
        </div>

        <label style={S.label}>Brand Notes (optional)</label>
        <textarea style={S.textarea} placeholder='Colors, mood — e.g. "dark emerald for cannabis dispensary packaging"' value={notes} onChange={e => setNotes(e.target.value)} />

        <label style={S.label}>Your Email (for portal + download link)</label>
        <input style={S.input} type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />

        <label style={S.label}>Fiverr Order ID (optional)</label>
        <input style={S.input} placeholder="e.g. FO1234567890" value={ref} onChange={e => setRef(e.target.value)} />
        <p style={S.note}>Optional — helps us track your order if you message us on Fiverr.</p>

        {errMsg && <p style={{ color: '#f66', fontSize: '13px', marginTop: '8px' }}>{errMsg}</p>}

        <button style={{ ...S.btn, opacity: status === 'generating' ? 0.6 : 1 }}
          disabled={status === 'generating'} onClick={generate}>
          {status === 'generating' ? 'Generating... (30–90s, don't close)' : '🎨 Generate My QR Art'}
        </button>

        {status === 'done' && imageUrl && (
          <div style={{ marginTop: '24px' }}>
            <img src={imageUrl} alt="Your QRON AI QR Art" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', display: 'block', margin: '0 auto' }} />
            <div style={{ textAlign: 'center', marginTop: '16px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={imageUrl} download="qron-art.png" target="_blank" rel="noopener"
                style={{ background: '#7c3aed', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
                ⬇ Download PNG
              </a>
              {portalUrl !== url && (
                <a href={`/portals`} target="_blank" rel="noopener"
                  style={{ background: 'rgba(201,162,39,.15)', color: '#c9a227', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px', border: '1px solid rgba(201,162,39,.3)' }}>
                  📊 View Scan Analytics
                </a>
              )}
            </div>
            <p style={{ textAlign: 'center', color: '#555', fontSize: '12px', marginTop: '12px' }}>
              Provider: {provider} · Need another style? Click generate again.
            </p>
            {portalUrl !== url && (
              <div style={{ background: 'rgba(201,162,39,.06)', border: '1px solid rgba(201,162,39,.2)', borderRadius: '10px', padding: '16px', marginTop: '16px' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px', fontSize: '14px' }}>🔄 Your Living Portal</div>
                <p style={{ color: '#888', fontSize: '13px' }}>Your QR code is a "living" redirect — track scans and update the destination without reprinting.</p>
                <a href={portalUrl} style={{ color: '#c9a227', fontSize: '13px', fontWeight: 700 }}>{portalUrl}</a>
              </div>
            )}
          </div>
        )}

        {status === 'error' && (
          <div style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', borderRadius: '8px', padding: '12px 16px', marginTop: '16px', fontSize: '13px' }}>
            Generation failed. Try again — the AI sometimes takes a moment to warm up.
            <br/>If it keeps failing, message us on Fiverr and we'll deliver manually within 1 hour.
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', padding: '24px', color: '#444', fontSize: '12px' }}>
        QRON · <a href="https://qron.space" style={{ color: '#555' }}>qron.space</a> · Powered by ControlNet AI
      </div>
    </div>
  )
}
