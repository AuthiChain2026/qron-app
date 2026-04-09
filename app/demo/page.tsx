/**
 * Demo: QRON Identity Authentication
 * Problem: Brands, creators, and collectors need a fast, visual way to prove that a product, drop, or collectible is genuine — but static QR codes are easy to clone and carry no design equity.
 * Solution: AuthiChain verifies authenticity in 2.1 seconds using QRON identities.
 * Business Value: Every QRON is a branded, AI-generated identity tied to an AuthiChain record, turning authentication into a marketing asset across luxury, sport, culture, celebrity, and brand targets while driving conversion into custom QRON orders.
 */
'use client'

import { useState, useEffect } from 'react'
import { DEMO_TARGETS, type DemoTarget } from '@/lib/demo-targets'
import { Shield, Sparkles, Target, Loader2, CheckCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Category filter options
const CATEGORIES = ['all', 'brand', 'luxury', 'celebrity', 'sport', 'culture'] as const
type Category = (typeof CATEGORIES)[number]

// ── Custom QRON Order Modal ────────────────────────────────────────────────────
function OrderModal({
  target,
  onClose,
}: {
  target: DemoTarget
  onClose: () => void
}) {
  const [url, setUrl]               = useState('')
  const [subject, setSubject]       = useState(target.subject.split(',')[0]) // prefill with target subject
  const [style, setStyle]           = useState(target.style)
  const [tier, setTier]             = useState<'standard' | 'premium' | 'elite'>('standard')
  const [email, setEmail]           = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')

  const TIERS = [
    { id: 'standard', label: 'Standard', price: '$49', desc: '~50 steps · AI generation · PNG download · email delivery' },
    { id: 'premium',  label: 'Premium',  price: '$99', desc: '~75 steps · Premium quality · Priority queue · email delivery' },
    { id: 'elite',    label: 'Elite',    price: '$249', desc: '75 steps · Print-ready · NFT minted on-chain · email delivery' },
  ]

  const handleOrder = async () => {
    setError('')
    if (!url) { setError('Please enter your destination URL'); return }
    if (!url.startsWith('http')) { setError('URL must start with http:// or https://'); return }
    if (!subject.trim()) { setError('Please describe what you want'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/checkout/custom-qron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, subject, style, tier, email: email || undefined }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.assign(data.url)
      } else {
        setError(data.error || 'Checkout failed. Please try again.')
        setLoading(false)
      }
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
         onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="w-full max-w-lg rounded-2xl p-8 space-y-5"
           style={{ background: '#0d0d0d', border: '1px solid rgba(201,162,39,0.3)' }}>

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Order Your Custom QRON</h2>
            <p className="text-sm mt-1" style={{ color: '#6b6b6b' }}>
              Inspired by: <span style={{ color: '#c9a227' }}>{target.label}</span>
            </p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-lg">✕</button>
        </div>

        {/* Your URL */}
        <div>
          <label className="block text-sm mb-1.5" style={{ color: '#c8c8c8' }}>Your Destination URL *</label>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://your-brand.com"
            className="protocol-input w-full px-4 py-3"
          />
        </div>

        {/* What to put in the art */}
        <div>
          <label className="block text-sm mb-1.5" style={{ color: '#c8c8c8' }}>Describe What You Want *</label>
          <textarea
            value={subject}
            onChange={e => setSubject(e.target.value)}
            rows={2}
            placeholder="e.g. Nike swoosh, gold and black, athletic energy..."
            className="protocol-input w-full px-4 py-3 resize-none"
          />
          <p className="text-xs mt-1" style={{ color: '#3a3a3a' }}>
            Be specific — include colors, mood, brand elements, or any visual details you want.
          </p>
        </div>

        {/* Tier picker */}
        <div>
          <label className="block text-sm mb-2" style={{ color: '#c8c8c8' }}>Quality Tier</label>
          <div className="grid grid-cols-3 gap-2">
            {TIERS.map(t => (
              <button
                key={t.id}
                onClick={() => setTier(t.id as typeof tier)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  tier === t.id
                    ? 'border-yellow-500/80 bg-yellow-500/10'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="font-bold text-sm text-white">{t.label}</div>
                <div className="text-lg font-black" style={{ color: '#c9a227' }}>{t.price}</div>
                <div className="text-xs mt-1" style={{ color: '#6b6b6b' }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Email (optional) */}
        <div>
          <label className="block text-sm mb-1.5" style={{ color: '#c8c8c8' }}>
            Email (optional — Stripe will ask if blank)
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="protocol-input w-full px-4 py-3"
          />
        </div>

        {error && (
          <p className="text-sm px-3 py-2 rounded-lg"
             style={{ background: 'rgba(255,68,68,0.1)', color: '#ff9999', border: '1px solid rgba(255,68,68,0.2)' }}>
            {error}
          </p>
        )}

        <button
          onClick={handleOrder}
          disabled={loading}
          className="btn-gold w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting to checkout...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Order Custom QRON</>
          )}
        </button>

        <p className="text-xs text-center" style={{ color: '#3a3a3a' }}>
          Secure checkout via Stripe · Delivered to your email within 5 minutes · 100% scannable guarantee
        </p>
      </div>
    </div>
  )
}

// ── Demo Card ─────────────────────────────────────────────────────────────────
function DemoCard({ target, onOrder, imageUrl }: { target: DemoTarget; onOrder: (t: DemoTarget) => void; imageUrl?: string }) {
  // Category badge colors
  const BADGE_COLORS: Record<string, string> = {
    brand:     'rgba(59,130,246,0.2)',
    luxury:    'rgba(201,162,39,0.2)',
    celebrity: 'rgba(168,85,247,0.2)',
    sport:     'rgba(34,197,94,0.2)',
    culture:   'rgba(249,115,22,0.2)',
  }

  return (
    <div className="protocol-card flex flex-col overflow-hidden group">
      {/* Image: real generated QRON or placeholder */}
      <div className="relative aspect-square bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden"
           style={{ borderBottom: '1px solid rgba(201,162,39,0.1)' }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${target.label} QRON`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={imageUrl.startsWith('https://placehold')}
          />
        ) : (
          <>
            {/* QR-pattern placeholder */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 210 210" className="w-full h-full">
                <rect x="10" y="10" width="50" height="50" rx="4" fill="#c9a227" />
                <rect x="20" y="20" width="30" height="30" rx="2" fill="#0d0d0d" />
                <rect x="25" y="25" width="20" height="20" rx="1" fill="#c9a227" />
                <rect x="150" y="10" width="50" height="50" rx="4" fill="#c9a227" />
                <rect x="160" y="20" width="30" height="30" rx="2" fill="#0d0d0d" />
                <rect x="165" y="25" width="20" height="20" rx="1" fill="#c9a227" />
                <rect x="10" y="150" width="50" height="50" rx="4" fill="#c9a227" />
                <rect x="20" y="160" width="30" height="30" rx="2" fill="#0d0d0d" />
                <rect x="25" y="165" width="20" height="20" rx="1" fill="#c9a227" />
                {[70,80,90,100,110,120,130,140].map(x =>
                  [70,80,90,100,110,120,130,140].map(y =>
                    Math.sin(x * y) > 0 ? (
                      <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" rx="1" fill="#c9a227" opacity="0.6" />
                    ) : null
                  )
                )}
              </svg>
            </div>
            <div className="relative z-10 text-center p-6">
              <div className="text-5xl mb-3">
                {target.category === 'luxury' ? '💎' :
                 target.category === 'celebrity' ? '⭐' :
                 target.category === 'sport' ? '🏆' :
                 target.category === 'culture' ? '🎭' : '🔷'}
              </div>
              <p className="text-xs font-mono" style={{ color: '#c9a227' }}>AI Preview Pending</p>
              <p className="text-xs mt-1" style={{ color: '#6b6b6b' }}>Generating soon…</p>
            </div>
          </>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
             style={{ background: 'rgba(0,0,0,0.7)' }}>
          <button
            onClick={() => onOrder(target)}
            className="btn-gold px-6 py-3 rounded-xl font-bold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Order Yours
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-white text-sm leading-tight">{target.label}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 capitalize"
                style={{ background: BADGE_COLORS[target.category] || 'rgba(255,255,255,0.05)', color: '#c8c8c8', border: '1px solid rgba(255,255,255,0.1)' }}>
            {target.category}
          </span>
        </div>

        <p className="text-xs flex-1" style={{ color: '#9e9e9e' }}>{target.pitch}</p>

        <div className="flex items-center gap-2 text-xs" style={{ color: '#6b6b6b' }}>
          <span className="capitalize">{target.style} style</span>
          <span>·</span>
          <a href={target.destinationUrl} target="_blank" rel="noreferrer"
             className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
            <ExternalLink className="w-3 h-3" />
            {new URL(target.destinationUrl).hostname}
          </a>
        </div>

        <button
          onClick={() => onOrder(target)}
          className="btn-gold w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mt-1"
        >
          <Target className="w-3.5 h-3.5" />
          {target.stripeCheckoutLabel}
        </button>
      </div>
    </div>
  )
}

// ── Main Demo Page ────────────────────────────────────────────────────────────
export default function DemoPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [orderTarget, setOrderTarget]       = useState<DemoTarget | null>(null)
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({})

  useEffect(() => {
        // Use server-side API route (avoids anon key issues)
    fetch('/api/demos')
      .then(r => r.json())
      .then(data => {
        if (data.demos && Array.isArray(data.demos)) {
          const imgs: Record<string, string> = {}
          data.demos.forEach((d: { id: string; image_url: string }) => {
            if (d.image_url) imgs[d.id] = d.image_url
          })
          setGeneratedImages(imgs)
        }
      })
      .catch(() => {})
  }, [])
  const filtered = activeCategory === 'all'
    ? DEMO_TARGETS
    : DEMO_TARGETS.filter(t => t.category === activeCategory)

  return (
    <div className="min-h-screen protocol-bg text-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-5">
            <span className="protocol-badge">
              <Shield className="w-3 h-3" />
              High-Profile QRON Showcase
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="gold-text">Iconic Brands.</span>{' '}
            <span className="text-white">Scannable Art.</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: '#9e9e9e' }}>
            These demo QRONs show what's possible when fal.ai illusion-diffusion meets
            the world's most recognizable brands and cultural icons.
            Every QRON is still a fully scannable QR code — verified by the AuthiChain Protocol.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link href="/targeted"
                  className="btn-gold px-8 py-3 rounded-xl inline-flex items-center gap-2 no-underline font-bold">
              <Target className="w-4 h-4" />
              Build Your Own →
            </Link>
            <a href="#demos"
               className="btn-outline-gold px-8 py-3 rounded-xl inline-flex items-center gap-2 no-underline">
              <Sparkles className="w-4 h-4" />
              Browse Demos
            </a>
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap justify-center gap-6 text-xs mt-8" style={{ color: '#6b6b6b' }}>
            {[
              { icon: <CheckCircle className="w-3.5 h-3.5" />, text: '100% scannable' },
              { icon: <Shield className="w-3.5 h-3.5" />, text: 'AuthiChain verified' },
              { icon: <Sparkles className="w-3.5 h-3.5" />, text: 'Delivered in ~5 min' },
              { icon: <Target className="w-3.5 h-3.5" />, text: 'Any subject, any style' },
            ].map(({ icon, text }) => (
              <span key={text} className="flex items-center gap-1.5" style={{ color: '#c9a227' }}>
                {icon} <span style={{ color: '#6b6b6b' }}>{text}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="gold-divider mb-10" />

        {/* ── Category Filter ──────────────────────────────────────────────── */}
        <div id="demos" className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                activeCategory === cat
                  ? 'bg-yellow-500 text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              style={activeCategory !== cat ? { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' } : {}}
            >
              {cat === 'all' ? `All (${DEMO_TARGETS.length})` : cat}
            </button>
          ))}
        </div>

        {/* ── Demo Grid ────────────────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filtered.map(target => (
            <DemoCard
              key={target.id}
              target={target}
              onOrder={setOrderTarget}
              imageUrl={generatedImages[target.id]}
            />
          ))}
        </div>

        <div className="gold-divider mb-12" />

        {/* ── Sale CTA ─────────────────────────────────────────────────────── */}
        <section className="protocol-card p-10 text-center mb-12"
                 style={{ background: 'linear-gradient(135deg, #0d0d00 0%, #0a0a0a 50%, #00090d 100%)' }}>
          <div className="protocol-badge mb-4 inline-flex">
            <Target className="w-3 h-3" />
            Custom QRON Studio
          </div>
          <h2 className="text-3xl font-bold mb-3">
            <span className="gold-text">Any Brand. Any Person. Any Style.</span>
          </h2>
          <p className="text-sm max-w-lg mx-auto mb-8" style={{ color: '#9e9e9e' }}>
            From $49 — choose your subject, pick a style, and get a print-ready AI QR code
            delivered to your inbox in under 5 minutes. Elite tier includes on-chain NFT mint.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-sm">
            {[
              { tier: 'Standard', price: '$49', points: ['~50 inference steps', 'AI generation', 'PNG download', 'Email delivery'] },
              { tier: 'Premium',  price: '$99', points: ['75 steps', 'Priority queue', 'Premium quality', 'Email delivery'] },
              { tier: 'Elite',    price: '$249', points: ['75 steps', 'Print-ready 4K', 'NFT minted', 'Email delivery'] },
            ].map(({ tier, price, points }) => (
              <div key={tier} className="protocol-card p-5 text-left">
                <div className="font-bold text-white mb-1">{tier}</div>
                <div className="text-2xl font-black gold-text mb-3">{price}</div>
                <ul className="space-y-1.5" style={{ color: '#6b6b6b' }}>
                  {points.map(p => (
                    <li key={p} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: '#c9a227' }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link href="/targeted"
                className="btn-gold px-10 py-4 rounded-xl inline-flex items-center gap-2 no-underline font-bold text-base">
            <Sparkles className="w-5 h-5" />
            Start Your Custom QRON →
          </Link>
        </section>

      </div>

      {/* ── Order Modal ───────────────────────────────────────────────────── */}
      {orderTarget && (
        <OrderModal target={orderTarget} onClose={() => setOrderTarget(null)} />
      )}
    </div>
  )
}
