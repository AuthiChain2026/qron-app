'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Zap, Shield, Star, ArrowRight, Loader2, CreditCard, Lock } from 'lucide-react'
import { PLANS } from '@/lib/plans'
import { createClient } from '@/utils/supabase/client'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function PricingContent() {
  const router = useRouter()
  const params = useSearchParams()
  const cancelled = params.get('checkout') === 'cancelled'

  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userTier, setUserTier] = useState<string>('free')
  const [loading, setLoading] = useState<string | null>(null)
  const [manageLoading, setManageLoading] = useState(false)

  // Fetch current user + tier
  useEffect(() => {
    const hasEnv =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    if (!hasEnv) return

    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      setUserEmail(user.email ?? null)
      supabase
        .from('profiles')
        .select('tier')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          if (data?.tier) setUserTier(data.tier)
        })
    })
  }, [])

  // ── Checkout ────────────────────────────────────────────────────────────────

  async function handleCheckout(planId: string) {
    const plan = PLANS.find((p) => p.id === planId)
    if (!plan || plan.price === 0) return

    setLoading(planId)
    try {
      // Try API-based checkout first (preserves userId for credit fulfilment)
      if (plan.stripe_price_id) {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId, email: userEmail }),
        })
        const { url, error } = await res.json()
        if (url) {
          window.location.assign(url)
          return
        }
        // Fall through to payment link if API failed
        console.warn('[pricing] API checkout error:', error)
      }

      // Fallback: hosted payment link
      if (plan.stripe_payment_link) {
        window.location.assign(plan.stripe_payment_link)
        return
      }

      alert('Checkout is not available for this plan. Please contact support.')
    } catch (err) {
      console.error('[pricing] checkout error:', err)
      if (plan.stripe_payment_link) {
        window.location.assign(plan.stripe_payment_link)
      }
    } finally {
      setLoading(null)
    }
  }

  // ── Manage billing ──────────────────────────────────────────────────────────

  async function handleManageBilling() {
    setManageLoading(true)
    try {
      const res = await fetch('/api/billing-portal', { method: 'POST' })
      const { url, upgradeUrl } = await res.json()
      if (url) {
        window.location.assign(url)
      } else if (upgradeUrl) {
        router.push(upgradeUrl)
      }
    } catch {
      router.push('/#pricing')
    } finally {
      setManageLoading(false)
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  const visiblePlans = PLANS.filter((p) => p.id !== 'free')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-yellow-500/80 font-semibold tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <Shield className="h-3.5 w-3.5" />
            Authenticated by AuthiChain Protocol
          </p>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Simple,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a227, #a07c10)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              transparent
            </span>{' '}
            pricing
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Buy a pack of AI QR generations or subscribe for unlimited access.
            Credits never expire.
          </p>

          {cancelled && (
            <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-yellow-900/20 border border-yellow-600/40 rounded-lg text-sm text-yellow-300">
              <ArrowRight className="h-4 w-4" />
              Checkout was cancelled — your credits are unchanged.
            </div>
          )}
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {visiblePlans.map((plan) => {
            const isCurrentPlan = plan.tier === userTier || plan.id === userTier
            const isLoadingThis = loading === plan.id

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 border flex flex-col transition-all ${
                  plan.highlighted
                    ? 'border-yellow-500/50 bg-gradient-to-b from-yellow-900/20 to-transparent shadow-xl shadow-yellow-500/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/8'
                } ${isCurrentPlan ? 'ring-2 ring-yellow-500/80' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      style={{ background: 'linear-gradient(135deg, #c9a227, #a07c10)' }}
                      className="text-black text-xs font-black px-3 py-1 rounded-full"
                    >
                      BEST VALUE
                    </span>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      CURRENT
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    {plan.stripe_mode === 'subscription' ? (
                      <Zap className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Star className="h-5 w-5 text-yellow-500" />
                    )}
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                  </div>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black">${plan.price}</span>
                    {plan.price_suffix && (
                      <span className="text-gray-500 text-sm">{plan.price_suffix}</span>
                    )}
                  </div>
                  {plan.stripe_mode === 'payment' && (
                    <p className="text-xs text-gray-600 mt-1">one-time · credits never expire</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleCheckout(plan.id)}
                  disabled={!!loading || isCurrentPlan}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.highlighted
                      ? 'text-black hover:opacity-90'
                      : isCurrentPlan
                      ? 'bg-green-900/30 border border-green-700 text-green-400 cursor-default'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
                  style={
                    plan.highlighted
                      ? { background: 'linear-gradient(135deg, #c9a227, #a07c10)' }
                      : undefined
                  }
                >
                  {isLoadingThis ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isCurrentPlan ? (
                    'Current Plan'
                  ) : (
                    <>
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-12">
          {[
            { icon: Lock, label: 'SSL encrypted' },
            { icon: CreditCard, label: 'Powered by Stripe' },
            { icon: Shield, label: 'AuthiChain signed' },
            { icon: Check, label: 'No subscription required' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 p-4 bg-white/3 rounded-xl">
              <Icon className="h-6 w-6 text-yellow-500/70" />
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Manage billing */}
        {userTier !== 'free' && (
          <div className="text-center">
            <button
              onClick={handleManageBilling}
              disabled={manageLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/15 transition-all disabled:opacity-50"
            >
              {manageLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="h-4 w-4" />
              )}
              Manage Billing &amp; Subscription
            </button>
          </div>
        )}

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Do credits expire?',
                a: 'No. All pack credits (Starter, Creator, Studio) never expire. Use them at your own pace.',
              },
              {
                q: 'What is the Business plan?',
                a: 'A monthly subscription that grants unlimited AI QR code generations, API access, and 5 team seats.',
              },
              {
                q: 'Can I upgrade later?',
                a: 'Yes. Buy more packs or upgrade to Business at any time. Existing credits are preserved.',
              },
              {
                q: 'What payment methods are accepted?',
                a: 'All major credit and debit cards via Stripe. Bank transfers available for Business customers.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border border-white/10 rounded-xl p-5">
                <p className="font-semibold text-white mb-1">{q}</p>
                <p className="text-gray-400 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  )
}
