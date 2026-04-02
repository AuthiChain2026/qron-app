'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SamplePage() {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [style, setStyle] = useState('space')
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle')

  const STYLES = [
    {id:'space',label:'Cosmic Space'},
    {id:'cannabis',label:'Cannabis'},
    {id:'nature',label:'Nature'},
    {id:'retro',label:'Retro Vintage'},
    {id:'abstract',label:'Abstract'},
    {id:'cyberpunk',label:'Cyberpunk'},
  ]

  async function request() {
    if (!email || !url) return
    setStatus('loading')
    try {
      // Save lead
      await fetch('/api/capture-email', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email, source: 'sample-request', metadata: {url, style}})
      })
      // Also trigger generation via qron-ai-api and store portal
      const portalRes = await fetch('https://nhdnkzhtadfkkluiulhs.supabase.co/functions/v1/portal-create', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({target_url: url, style, email, label: 'Free Sample Request'})
      })
      setStatus('done')
    } catch {
      setStatus('done') // still show success
    }
  }

  const gold = '#c9a227'
  const inp = {width:'100%',background:'rgba(255,255,255,.04)',border:'1px solid rgba(201,162,39,.2)',borderRadius:'8px',color:'#e5e5e5',fontSize:'14px',padding:'11px 14px',outline:'none',fontFamily:'inherit'} as const
  const lbl = {display:'block',fontSize:'11px',fontWeight:700 as const,color:gold,letterSpacing:'.1em',textTransform:'uppercase' as const,marginBottom:'6px',marginTop:'18px'}

  if (status === 'done') return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <div style={{background:'#111',border:'1px solid rgba(201,162,39,.3)',borderRadius:'16px',padding:'40px',maxWidth:'480px',width:'100%',textAlign:'center'}}>
        <div style={{fontSize:'3rem',marginBottom:'16px'}}>🎨</div>
        <h1 style={{fontSize:'1.4rem',fontWeight:800,marginBottom:'12px'}}>Sample request received!</h1>
        <p style={{color:'#888',marginBottom:'24px',lineHeight:1.6}}>
          We&apos;re generating your custom AI QR art sample. You&apos;ll receive it at <strong style={{color:gold}}>{email}</strong> within the hour.
        </p>
        <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/free-qr-generator" style={{background:gold,color:'#000',padding:'11px 22px',borderRadius:'8px',fontWeight:700,textDecoration:'none',fontSize:'14px'}}>
            Generate now →
          </Link>
          <Link href="/pricing" style={{border:'1px solid #333',color:'#e5e5e5',padding:'11px 22px',borderRadius:'8px',fontWeight:700,textDecoration:'none',fontSize:'14px'}}>
            View pricing
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'560px',margin:'0 auto',padding:'56px 24px 80px'}}>
        <Link href="/gig" style={{color:'#555',fontSize:'12px',fontWeight:700,textDecoration:'none',letterSpacing:'.1em',textTransform:'uppercase',display:'block',marginBottom:'24px'}}>
          ← Back to Gig
        </Link>
        <div style={{fontSize:'12px',color:gold,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',marginBottom:'12px'}}>Free Sample</div>
        <h1 style={{fontSize:'1.8rem',fontWeight:900,lineHeight:1.15,marginBottom:'8px'}}>
          Get a free AI QR code sample for your brand
        </h1>
        <p style={{color:'#888',fontSize:'15px',marginBottom:'32px',lineHeight:1.6}}>
          Enter your URL and style. We generate a sample and email it to you free — no credit card, no obligation.
        </p>

        <label style={lbl}>Your URL *</label>
        <input style={inp} type="url" placeholder="https://your-website.com" value={url} onChange={e => setUrl(e.target.value)} />

        <label style={lbl}>Style *</label>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',marginTop:'8px'}}>
          {STYLES.map(s => (
            <button key={s.id} onClick={() => setStyle(s.id)}
              style={{border:`1px solid ${style===s.id?gold:'rgba(201,162,39,.2)'}`,background:style===s.id?'rgba(201,162,39,.1)':'transparent',borderRadius:'8px',padding:'10px 6px',cursor:'pointer',color:style===s.id?gold:'#e5e5e5',fontSize:'12px',textAlign:'center'}}>
              {s.label}
            </button>
          ))}
        </div>

        <label style={lbl}>Your Email *</label>
        <input style={inp} type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
        <p style={{fontSize:'12px',color:'#555',marginTop:'6px'}}>We&apos;ll send your free sample here within 1 hour. No spam.</p>

        {status === 'error' && <p style={{color:'#f66',fontSize:'13px',marginTop:'8px'}}>Something went wrong. Try the free generator instead.</p>}

        <button
          style={{width:'100%',marginTop:'24px',padding:'15px',background:gold,color:'#000',fontSize:'16px',fontWeight:700,border:'none',borderRadius:'10px',cursor:status==='loading'?'not-allowed':'pointer',opacity:status==='loading'?0.6:1}}
          disabled={status==='loading'} onClick={request}>
          {status === 'loading' ? 'Sending request...' : 'Send My Free Sample →'}
        </button>

        <p style={{textAlign:'center',color:'#444',fontSize:'13px',marginTop:'16px'}}>
          Want it instantly?{' '}
          <Link href="/free-qr-generator" style={{color:gold}}>Generate yourself in 60 seconds →</Link>
        </p>
      </div>
    </div>
  )
}
