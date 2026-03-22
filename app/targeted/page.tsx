'use client'

import { useState, useEffect } from 'react'
import { Shield, Target, Sparkles } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import dynamic from 'next/dynamic'

const TargetedQRONGenerator = dynamic(
  () => import('@/components/TargetedQRONGenerator').then(m => m.TargetedQRONGenerator),
  { ssr: false },
)

export default function TargetedPage() {
  const [userTier, setUserTier] = useState('free')
  const supabase = createClient()

  useEffect(() => {
    const fetchTier = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase
        .from('profiles')
        .select('tier')
        .eq('id', user.id)
        .single()
      if (profile?.tier) setUserTier(profile.tier)
    }
    fetchTier()
  }, [])

  return (
    <div className="min-h-screen protocol-bg text-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="protocol-badge">
              <Target className="w-3 h-3" />
              Targeted QRON Studio — Beta
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
            <span className="gold-text">Personalized</span>{' '}
            <span className="text-white">QRON</span>
          </h1>
          <p className="text-lg md:text-xl font-light mb-3" style={{ color: '#c8c8c8' }}>
            Fuse any person, brand, or logo into a scannable QR code masterpiece.
          </p>
          <p className="text-sm max-w-2xl mx-auto mb-8" style={{ color: '#6b6b6b' }}>
            Power your marketing with QR codes that look like world-class art — cyberpunk characters,
            watercolor portraits, miniature cities, and more — all still scannable and
            cryptographically verified by the{' '}
            <a href="https://authichain.com" target="_blank" rel="noreferrer"
               style={{ color: '#c9a227', textDecoration: 'none', fontWeight: 600 }}>
              AuthiChain Protocol
            </a>.
          </p>

          {/* Example style chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 text-xs">
            {[
              { emoji: '🤖', label: 'Cyberpunk character' },
              { emoji: '🖌️', label: 'Watercolor leopard' },
              { emoji: '🏙️', label: 'Miniature city' },
              { emoji: '💎', label: 'Luxury brand seal' },
              { emoji: '🎨', label: 'Oil portrait' },
              { emoji: '⛩️', label: 'Anime style' },
            ].map(({ emoji, label }) => (
              <span key={label}
                    className="px-3 py-1 rounded-full"
                    style={{ background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.2)', color: '#9e9e9e' }}>
                {emoji} {label}
              </span>
            ))}
          </div>
        </div>

        <div className="gold-divider mb-10" />

        {/* ── Generator ──────────────────────────────────────────────────────── */}
        <TargetedQRONGenerator userTier={userTier} />

        <div className="gold-divider my-12" />

        {/* ── How It Works ───────────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="gold-text">How Targeted QRON Works</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-4 text-center text-sm">
            {[
              { step: '01', emoji: '🔗', title: 'Enter URL', desc: 'The destination your QR code will encode — your website, product page, social profile.' },
              { step: '02', emoji: '🎯', title: 'Name Subject', desc: 'Describe what the art should look like — a person, brand, animal, character, or logo.' },
              { step: '03', emoji: '🎨', title: 'Pick Style', desc: 'Choose a style preset: cyberpunk, watercolor, miniature city, luxury, anime, and more.' },
              { step: '04', emoji: '🔏', title: 'Mint QRON', desc: 'Your AI artwork is fused with the QR pattern and signed by the AuthiChain Protocol.' },
            ].map(({ step, emoji, title, desc }) => (
              <div key={step} className="protocol-card p-6 flex flex-col items-center gap-3">
                <span className="text-3xl">{emoji}</span>
                <span className="text-xs font-mono" style={{ color: '#c9a227' }}>{step}</span>
                <h3 className="font-bold text-white">{title}</h3>
                <p style={{ color: '#6b6b6b' }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trust Strip ─────────────────────────────────────────────────────── */}
        <div className="text-center space-y-2 py-6">
          <p className="text-xs" style={{ color: '#6b6b6b' }}>
            ◆ 100% scannable guarantee &nbsp;·&nbsp; fal.ai illusion-diffusion model &nbsp;·&nbsp; AuthiChain blockchain anchoring
          </p>
          <p className="text-xs" style={{ color: '#3a3a3a' }}>
            Powered by Fal.ai · Supabase · Stripe · AuthiChain Protocol
          </p>
        </div>

      </div>
    </div>
  )
}
