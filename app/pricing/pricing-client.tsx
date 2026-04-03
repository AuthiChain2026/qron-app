'use client'
import { useState } from 'react'

export function CheckoutModal({ plan, label, price, onClose }: { plan: string, label: string, price: string, onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

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
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
      <div style={{ background:'#111', border:'1px solid rgba(201,162,39,.3)', borderRadius:16, padding:32, maxWidth:400, width:'100%', margin:'0 24px' }}>
        <h3 style={{ color:'#c9a227', marginBottom:8 }}>Get {label}</h3>
        <p style={{ color:'#888', fontSize:14, marginBottom:20 }}>Enter your email to continue to checkout.</p>
        <input
          type="email" placeholder="your@email.com" value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCheckout()}
          style={{ width:'100%', background:'rgba(255,255,255,.06)', border:'1px solid rgba(201,162,39,.3)', borderRadius:8, color:'#e5e5e5', padding:'10px 12px', fontSize:14, outline:'none', marginBottom:12 }}
        />
        <button onClick={handleCheckout} disabled={loading || !email.includes('@')}
          style={{ width:'100%', background:'#c9a227', color:'#000', border:'none', borderRadius:8, padding:'12px', fontSize:15, fontWeight:700, cursor:'pointer', opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Loading...' : `Continue to ${price} →`}
        </button>
        <button onClick={onClose} style={{ width:'100%', background:'transparent', color:'#666', border:'none', padding:'10px', cursor:'pointer', marginTop:8, fontSize:13 }}>
          Cancel
        </button>
      </div>
    </div>
  )
}
