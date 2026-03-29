'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Download, CreditCard, CheckCircle, Shield, Zap, Lock, ArrowRight } from 'lucide-react';
import { LeadCapturePopup } from '@/components/LeadCapturePopup';
import { createClient } from '@/utils/supabase/client';
import { MODES, FalaiPreset, QRONModeConfig } from '@/lib/types';
import { PLANS } from '@/lib/plans';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const StaticImageGallery = dynamic(() => import('@/components/StaticImageGallery').then(m => m.StaticImageGallery), { ssr: false });

export default function Home() {
  const hasSupabaseEnv =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const supabase = hasSupabaseEnv ? createClient() : null;

  const [targetUrl, setTargetUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [selectedMode, setSelectedMode] = useState<QRONModeConfig>(MODES[0]);
  const [presetId, setPresetId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [userTier, setUserTier] = useState('free');
  const [generationsUsed, setGenerationsUsed] = useState(0);
  const [generationsLimit, setGenerationsLimit] = useState(10);
  const [user, setUser] = useState<any>(null);
  const [presets, setPresets] = useState<FalaiPreset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<FalaiPreset | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!supabase) return;
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);
      if (authUser) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('tier, generations_used, generations_limit')
          .eq('user_id', authUser.id)
          .single();
        if (profile && !profileError) {
          setUserTier(profile.tier);
          setGenerationsUsed(profile.generations_used);
          setGenerationsLimit(profile.generations_limit);
        }
      }
    };

    const fetchPresets = async () => {
      try {
        const res = await fetch('/api/presets');
        if (res.ok) {
          const data: FalaiPreset[] = await res.json();
          setPresets(data);
          if (data[0]) { setSelectedPreset(data[0]); setPresetId(data[0].id); }
        }
      } catch {
        // silently fail — presets will be empty
      }
    };

    fetchUserData();
    fetchPresets();
  }, []);

  const isTierSufficient = (requiredTier: string) => {
    if (requiredTier === 'free') return true;
    if (requiredTier === 'pro' && (userTier === 'pro' || userTier === 'enterprise')) return true;
    if (requiredTier === 'enterprise' && userTier === 'enterprise') return true;
    return false;
  };

  const handleGenerate = async () => {
    if (!targetUrl || !prompt || !selectedMode || !presetId) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUrl, prompt, presetId: selectedPreset?.id, mode: selectedMode.id }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.qron.imageUrl);
        setGenerationsUsed(prev => prev + 1);
      } else {
        setError(data.message || 'Generation failed.');
      }
    } catch (err) {
      setError('Network error or unexpected response.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId: string) => {
    const plan = PLANS.find(p => p.id === planId);
    if (!plan || plan.price === 0) {
      window.location.assign('/login');
      return;
    }
    if (!plan.stripe_price_id) {
      window.location.assign('mailto:Z@authichain.com');
      return;
    }
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, email: user?.email }),
      });
      const { url, error: checkoutError } = await res.json();
      if (url) window.location.assign(url);
      else if (plan.stripe_payment_link) window.location.assign(plan.stripe_payment_link);
      else if (checkoutError) setError(checkoutError);
    } catch {
      if (plan.stripe_payment_link) window.location.assign(plan.stripe_payment_link);
      else setError('Could not start checkout. Please try again.');
    }
  };

  const userPlan = PLANS.find(p => p.id === userTier) || PLANS[0];

  return (
    <div className="min-h-screen protocol-bg text-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* ─── Hero ──────────────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          {/* Protocol badge */}
          <div className="flex justify-center mb-6">
            <span className="protocol-badge">
              <Shield className="w-3 h-3" />
              Creative Layer of the AuthiChain Protocol
            </span>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div style={{
              width: 96, height: 96,
              borderRadius: '50%',
              border: '2px solid rgba(201,162,39,0.4)',
              boxShadow: '0 0 32px rgba(255,215,0,0.2), 0 0 64px rgba(201,162,39,0.1)',
              background: '#0d0d0d',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#c9a227', fontSize: '44px', fontWeight: 900, lineHeight: 1, letterSpacing: '-2px' }}>Q</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
            <span className="gold-text">QRON</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-3" style={{ color: '#c8c8c8' }}>
            Cryptographically verified QR art.
          </p>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#6b6b6b' }}>
            Where authentication meets artistry — every QRON is signed by the{' '}
            <a href="https://authichain.com" target="_blank" rel="noreferrer"
               style={{ color: '#c9a227', textDecoration: 'none', fontWeight: 600 }}>
              AuthiChain Protocol
            </a>{' '}
            and verifiable by anyone, anywhere.
          </p>

          {/* Stat strip */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { icon: <Zap className="w-4 h-4" />, stat: '~25%', label: 'scan lift vs plain QR' },
              { icon: <Lock className="w-4 h-4" />, stat: 'Ed25519', label: 'cryptographic signature' },
              { icon: <Shield className="w-4 h-4" />, stat: '99.7%', label: 'verification accuracy' },
            ].map(({ icon, stat, label }) => (
              <div key={label} className="flex items-center gap-2" style={{ color: '#9e9e9e', fontSize: '13px' }}>
                <span style={{ color: '#c9a227' }}>{icon}</span>
                <span style={{ color: '#e8c547', fontWeight: 700 }}>{stat}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Inline Email Capture ──────────────────────────────────── */}
        {!user && (
          <div className="protocol-card p-6 mt-10 mb-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Get 10 Free AI QR Codes</h3>
                <p className="text-sm" style={{ color: '#9e9e9e' }}>
                  Create stunning, scannable QR art. No credit card required.
                </p>
              </div>
              <form
                className="flex gap-2 w-full md:w-auto"
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.target as HTMLFormElement
                  const emailInput = form.querySelector('input') as HTMLInputElement
                  if (!emailInput.value) return
                  fetch('/api/leads/capture', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email: emailInput.value,
                      source: 'inline_hero',
                      product_interest: 'qron',
                      page_url: '/',
                    }),
                  }).then(() => {
                    emailInput.value = ''
                    window.location.assign('/login')
                  }).catch(() => window.location.assign('/login'))
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="protocol-input px-4 py-3 flex-1 min-w-0"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-black font-semibold whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #c9a227, #a07c10)' }}
                >
                  Start Free <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="gold-divider mb-12" />

        {/* ─── Generator ────────────────────────────────────────────────── */}
        <div className="protocol-card p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Create Your QRON</h2>
            <span className="protocol-badge">
              <Shield className="w-3 h-3" />
              AuthiChain Protocol
            </span>
          </div>

          {/* Tier / limit indicator */}
          <div className="flex items-center justify-between mb-6 px-4 py-3 rounded-lg"
               style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.15)' }}>
            <span style={{ color: '#9e9e9e', fontSize: '13px' }}>
              Plan: <span style={{ color: '#e8c547', fontWeight: 700 }}>{userPlan?.name.toUpperCase()}</span>
            </span>
            <span style={{ color: '#9e9e9e', fontSize: '13px' }}>
              Generations:{' '}
              <span style={{ color: generationsUsed >= generationsLimit ? '#ff4444' : '#e8c547', fontWeight: 700 }}>
                {generationsUsed}/{generationsLimit}
              </span>
            </span>
          </div>

          <div className="space-y-4">
            {/* Destination URL */}
            <div>
              <label htmlFor="targetUrl" className="block text-sm font-semibold mb-2" style={{ color: '#c8c8c8' }}>
                Destination URL
              </label>
              <input
                type="url"
                id="targetUrl"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="protocol-input w-full px-4 py-3"
              />
            </div>

            {/* Creative Prompt */}
            <div>
              <label htmlFor="prompt" className="block text-sm font-semibold mb-2" style={{ color: '#c8c8c8' }}>
                Creative Prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A warrior shield forged from gold and steel, blockchain circuitry, dark armored aesthetic…"
                rows={3}
                className="protocol-input w-full px-4 py-3 resize-none"
              />
            </div>

            {/* Mode + Preset row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mode" className="block text-sm font-semibold mb-2" style={{ color: '#c8c8c8' }}>
                  QRON Mode
                </label>
                <select
                  id="mode"
                  value={selectedMode.id}
                  onChange={(e) => {
                    const mode = MODES.find(m => m.id === e.target.value);
                    if (mode) setSelectedMode(mode);
                  }}
                  className="protocol-input w-full px-4 py-3"
                >
                  {MODES.map((modeOption) => (
                    <option key={modeOption.id} value={modeOption.id} disabled={!isTierSufficient(modeOption.tier)}>
                      {modeOption.name} {modeOption.tier !== 'free' ? `(${modeOption.tier.toUpperCase()})` : ''}
                    </option>
                  ))}
                </select>
                {!isTierSufficient(selectedMode.tier) && (
                  <p className="text-xs mt-1" style={{ color: '#ff6b6b' }}>
                    Requires {selectedMode.tier.toUpperCase()} — upgrade to unlock.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="preset" className="block text-sm font-semibold mb-2" style={{ color: '#c8c8c8' }}>
                  Style Preset
                </label>
                <select
                  id="preset"
                  value={selectedPreset?.id || ''}
                  onChange={(e) => {
                    const preset = presets.find(p => p.id === e.target.value);
                    if (preset) { setSelectedPreset(preset); setPresetId(preset.id); }
                  }}
                  className="protocol-input w-full px-4 py-3"
                >
                  {presets.map((presetOption) => (
                    <option key={presetOption.id} value={presetOption.id} disabled={presetOption.is_premium && !isTierSufficient('pro')}>
                      {presetOption.name}{presetOption.is_premium ? ' ◆ Premium' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 rounded-lg text-sm" style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)', color: '#ff9999' }}>
                {error}
              </div>
            )}

            {/* CTA */}
            {!user ? (
              <a href="/login" className="btn-gold w-full py-4 rounded-xl flex items-center justify-center gap-2 text-base no-underline">
                <Sparkles className="w-5 h-5" />
                Sign In to Generate
              </a>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={loading || !isTierSufficient(selectedMode.tier) || (generationsUsed >= generationsLimit && userTier !== 'enterprise')}
                className="btn-gold w-full py-4 rounded-xl flex items-center justify-center gap-2 text-base"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2" style={{ borderColor: '#0a0a0a', borderTopColor: 'transparent' }} />
                    Generating QRON…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate QRON
                  </>
                )}
              </button>
            )}
          </div>

          {/* Result */}
          {result && (
            <div className="mt-8 text-center space-y-4">
              <div className="protocol-badge justify-center inline-flex mb-2">
                <Shield className="w-3 h-3" />
                AuthiChain Protocol — Verified
              </div>
              <h3 className="text-xl font-bold gold-text">Your QRON is Ready</h3>
              <div className="inline-block p-4 rounded-xl" style={{ background: '#ffffff' }}>
                <img src={result} alt="Generated QRON" className="w-full max-w-sm mx-auto rounded-lg shadow-2xl" />
              </div>
              <p className="text-sm" style={{ color: '#9e9e9e' }}>
                Cryptographically signed · Blockchain-anchored · Publicly verifiable
              </p>
              <a
                href={result}
                download={`qron-${selectedMode.id}-${Date.now()}.png`}
                className="btn-outline-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl"
              >
                <Download className="w-4 h-4" />
                Download QRON
              </a>
            </div>
          )}
        </div>

        {/* ─── Gallery Sections ──────────────────────────────────────────── */}
        <StaticImageGallery
          title="Artsy Presets"
          description="Beautifully designed QRON styles — each one cryptographically signed by the AuthiChain Protocol."
          images={[
            { src: '/media/gallery-static-portal-1080.svg', alt: 'Centered scannable QR with cyan/blue glowing ring.', width: 1080, height: 1080 },
            { src: '/media/gallery-chromatic-portal-1080.svg', alt: 'Chromatic portal QR code.', width: 1080, height: 1080 },
          ]}
        />

        <StaticImageGallery
          title="Business Use Cases"
          description="Enterprise-grade QR authentication across luxury, retail, events, and supply chain."
          images={[
            { src: '/media/gallery-event-poster-1350x1080.svg', alt: 'Event poster with AuthiChain-verified QRON.', width: 1350, height: 1080 },
            { src: '/media/gallery-event-badge-1080.svg', alt: 'Night city wall poster with QRON CTA.', width: 1080, height: 1080 },
            { src: '/media/gallery-ecommerce-card-1080.svg', alt: 'Product card with chromatic QRON.', width: 1080, height: 1080 },
            { src: '/media/gallery-creator-merch-1080.svg', alt: 'Tech gadget with living QR corner.', width: 1080, height: 1080 },
          ]}
        />

        <div className="gold-divider my-12" />

        {/* ─── Social Proof Strip ───────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 mb-12 text-center">
          {[
            { stat: '100%', label: 'Scan guarantee' },
            { stat: 'Ed25519', label: 'Cryptographic signing' },
            { stat: '< 3s', label: 'Generation time' },
          ].map(({ stat, label }) => (
            <div key={label} className="protocol-card p-4">
              <div className="text-2xl font-bold gold-text">{stat}</div>
              <div className="text-xs mt-1" style={{ color: '#6b6b6b' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ─── Pricing ──────────────────────────────────────────────────── */}
        <section className="mb-16" id="pricing">
          <div className="text-center mb-10">
            <span className="protocol-badge mb-4 inline-flex">
              <Shield className="w-3 h-3" />
              AuthiChain Protocol Plans
            </span>
            <h2 className="text-4xl font-bold mt-4 mb-3">
              <span className="gold-text">Choose Your Tier</span>
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: '#6b6b6b' }}>
              All plans include AuthiChain Protocol verification. Credits never expire.{' '}
              <a href="https://authichain.com" target="_blank" rel="noreferrer"
                 style={{ color: '#c9a227', textDecoration: 'none' }}>
                Enterprise operations →
              </a>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.id} className={`protocol-card p-8 flex flex-col ${'highlighted' in plan && plan.highlighted ? 'ring-1 ring-yellow-500/50' : ''} ${plan.id === userTier ? 'ring-1 ring-yellow-500/80' : ''}`}>
                {plan.id === userTier && (
                  <div className="protocol-badge justify-center mb-3">Current Plan</div>
                )}
                {'highlighted' in plan && plan.highlighted && plan.id !== userTier && (
                  <div className="text-center mb-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(201,162,39,0.15)', color: '#c9a227', border: '1px solid rgba(201,162,39,0.3)' }}>
                      BEST VALUE
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-center mb-1">{plan.name}</h3>
                {'description' in plan && (
                  <p className="text-xs text-center mb-4" style={{ color: '#6b6b6b' }}>{plan.description}</p>
                )}
                <div className="text-center mb-6">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-bold gold-text">Free</span>
                  ) : (
                    <span className="text-4xl font-bold gold-text">
                      ${plan.price}<span className="text-base font-normal" style={{ color: '#6b6b6b' }}>{plan.price_suffix || ' one-time'}</span>
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-grow text-sm" style={{ color: '#9e9e9e' }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#c9a227' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={plan.id === userTier}
                  className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all ${
                    plan.id === userTier ? 'btn-outline-gold opacity-40 cursor-not-allowed' : 'btn-gold'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  {plan.id === userTier ? 'Current Plan' : plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="gold-divider my-12" />

        {/* ─── How It Works ─────────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="protocol-badge mb-4 inline-flex">
              <Shield className="w-3 h-3" />
              AuthiChain Protocol
            </span>
            <h2 className="text-4xl font-bold mt-4 mb-3">
              <span className="gold-text">How It Works</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: '#6b6b6b' }}>
              Every QRON is an Ed25519-signed cryptographic payload — scannable by anyone, verifiable by the AuthiChain Protocol.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6">
            <Image
              src="/media/docs-flow-1080.svg"
              alt="URL → AI QR Art → AuthiChain Verify → Analytics"
              width={1080}
              height={1080}
              className="rounded-xl shadow-2xl max-w-full h-auto"
              style={{ border: '1px solid rgba(201,162,39,0.15)' }}
            />
            <Image
              src="/media/docs-scannability-1080.svg"
              alt="Plain QR vs AuthiChain QRON — scan rate comparison"
              width={1080}
              height={1080}
              className="rounded-xl shadow-2xl max-w-full h-auto"
              style={{ border: '1px solid rgba(201,162,39,0.15)' }}
            />
          </div>
        </section>

        {/* ─── Cross-link Banner ────────────────────────────────────────── */}
        <div className="protocol-card p-8 text-center mb-8"
             style={{ background: 'linear-gradient(135deg, #111100 0%, #0d0d0d 50%, #110d00 100%)' }}>
          <div className="protocol-badge mb-4 inline-flex">
            <Shield className="w-3 h-3" />
            AuthiChain Protocol — Enterprise
          </div>
          <h3 className="text-2xl font-bold mb-3">
            Need the <span className="gold-text">Executive Platform?</span>
          </h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: '#9e9e9e' }}>
            QRON is the creative studio. <strong style={{ color: '#c8c8c8' }}>authichain.com</strong> is the enterprise authentication command center — NFT marketplace, supply chain tracking, government-grade verification, and DHS SVIP compliance.
          </p>
          <a
            href="https://authichain.com"
            target="_blank"
            rel="noreferrer"
            className="btn-gold inline-flex items-center gap-2 px-8 py-3 rounded-xl no-underline"
          >
            <Shield className="w-4 h-4" />
            Visit AuthiChain Enterprise →
          </a>
        </div>

        {/* ─── FAQ ──────────────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="gold-text">Frequently Asked Questions</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              {
                q: 'Do credits expire?',
                a: 'Never. Pack credits are yours indefinitely — buy once, use whenever you need.',
              },
              {
                q: 'Can I scan the QR codes on any phone?',
                a: 'Yes. Every QRON works with any standard camera app — no special app required.',
              },
              {
                q: 'What is AuthiChain verification?',
                a: 'Each QR is Ed25519-signed and anchored on the AuthiChain blockchain. Anyone who scans it can verify its authenticity instantly.',
              },
              {
                q: 'What if I need more than 2,000 generations?',
                a: 'The Business plan gives you unlimited generations for $49/month, or contact us for a custom enterprise contract.',
              },
              {
                q: 'What AI model generates the QR art?',
                a: 'We use Fal.ai\'s illusion-diffusion model, fine-tuned to maximize scan reliability while maximizing visual quality.',
              },
              {
                q: 'Is there a refund policy?',
                a: 'If your generated QR is not scannable, we regenerate it free. For billing issues, contact authichain@gmail.com.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="protocol-card p-5">
                <p className="font-semibold text-sm mb-2" style={{ color: '#c8c8c8' }}>{q}</p>
                <p className="text-xs" style={{ color: '#6b6b6b' }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Capture Popup */}
        <LeadCapturePopup />

        {/* ─── Trust Strip ──────────────────────────────────────────────── */}
        <div className="text-center space-y-2 py-6">
          <p className="text-xs" style={{ color: '#6b6b6b' }}>
            ◆ 100% scannable guarantee &nbsp;·&nbsp; Ed25519 cryptographic signing &nbsp;·&nbsp; AuthiChain blockchain anchoring
          </p>
          <p className="text-xs" style={{ color: '#3a3a3a' }}>
            Powered by Fal.ai · Supabase · Stripe · AuthiChain Protocol
          </p>
        </div>

      </div>
    </div>
  );
}
