'use client'

import { useState } from 'react'
import { ArrowRight, Download, Sparkles, Zap, Star } from 'lucide-react'
import Link from 'next/link'

export default function FreeQRGenerator() {
  const [url, setUrl] = useState('')
  const [qrGenerated, setQrGenerated] = useState(false)
  const [email, setEmail] = useState('')
  const [captured, setCaptured] = useState(false)

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [genError, setGenError] = useState('')

  const handleGenerate = async () => {
    if (!url) return
    setLoading(true)
    setGenError('')
    try {
      const res = await fetch('/api/generate/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, style: 'space', email: email || undefined }),
      })
      const data = await res.json()
      if (res.ok && data.imageUrl) {
        setImageUrl(data.imageUrl)
        setQrGenerated(true)
      } else if (res.status === 429) {
        setGenError('Daily limit reached. Sign up free for 10/month!')
      } else {
        setGenError(data.error || 'Generation failed. Try again.')
      }
    } catch {
      setGenError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCapture = async () => {
    if (!email) return
    try {
      await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'free_qr_generator',
          product_interest: 'qron',
          page_url: '/free-qr-generator',
        }),
      })
      setCaptured(true)
    } catch {}
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', color: '#e5e5e5' }}>
      {/* SEO Hero */}
      <section style={{ padding: '60px 24px 40px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #c9a227, #f0d060)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Free AI QR Code Generator
        </h1>
        <p style={{ fontSize: '18px', color: '#9e9e9e', maxWidth: '600px', margin: '0 auto 32px' }}>
          Turn any URL into a beautiful AI-generated QR code. Free, no signup required.
          Powered by QRON — where authentication meets artistry.
        </p>

        {/* Generator Form */}
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          background: '#141414',
          border: '1px solid #2a2a2a',
          borderRadius: '16px',
          padding: '32px',
        }}>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Paste your URL here..."
            style={{
              width: '100%',
              padding: '14px 16px',
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '16px',
              marginBottom: '12px',
              outline: 'none',
            }}
          />
          <button
            onClick={handleGenerate} disabled={loading}
            disabled={!url}
            style={{
              width: '100%',
              padding: '14px',
              background: url ? 'linear-gradient(135deg, #c9a227, #a88520)' : '#333',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700,
              cursor: url ? 'pointer' : 'not-allowed',
              transition: 'opacity 0.2s',
            }}
          >
            Generate Free QR Code <Sparkles style={{ display: 'inline', height: '16px', width: '16px', marginLeft: '6px' }} />
          </button>

          {qrGenerated && imageUrl && (
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              {/* Basic QR preview using public API */}
              <div style={{
                width: '200px',
                height: '200px',
                margin: '0 auto 16px',
                background: '#fff',
                borderRadius: '12px',
                padding: '12px',
                position: 'relative',
              }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=176x176&data=${encodeURIComponent(url)}`}
                  alt="QR Code"
                  width={176}
                  height={176}
                  style={{ borderRadius: '8px' }}
                />
              </div>
              <p style={{ fontSize: '13px', color: '#6b6b6b', marginBottom: '16px' }}>
                Basic QR Code &middot; <span style={{ color: '#c9a227' }}>Want AI-styled art?</span>
              </p>

              {/* Lead capture gate for AI version */}
              {!captured ? (
                <div style={{
                  background: 'rgba(201,162,39,0.08)',
                  border: '1px solid rgba(201,162,39,0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                }}>
                  <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
                    <Zap style={{ display: 'inline', height: '16px', width: '16px', color: '#c9a227' }} /> Unlock 3 Free AI QR Art Codes
                  </p>
                  <p style={{ fontSize: '13px', color: '#9e9e9e', marginBottom: '12px' }}>
                    Enter your email to get 3 free AI-generated QR code designs — no credit card.
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        background: '#0a0a0a',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={handleCapture}
                      disabled={!email}
                      style={{
                        padding: '10px 20px',
                        background: email ? 'linear-gradient(135deg, #c9a227, #a88520)' : '#333',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontWeight: 600,
                        cursor: email ? 'pointer' : 'not-allowed',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Get Free AI QR
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                }}>
                  <p style={{ fontWeight: 700, color: '#22c55e', marginBottom: '8px' }}>
                    ✓ 3 Free AI QR Credits Unlocked!
                  </p>
                  <Link
                    href="/login"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 24px',
                      background: 'linear-gradient(135deg, #c9a227, #a88520)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontWeight: 600,
                      textDecoration: 'none',
                      marginTop: '8px',
                    }}
                  >
                    Create Your AI QR Code <ArrowRight style={{ height: '16px', width: '16px' }} />
                  </Link>
                </div>
              )}

              <a
                href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}&format=png`}
                download="qron-qr-code.png"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '16px',
                  fontSize: '13px',
                  color: '#9e9e9e',
                  textDecoration: 'none',
                }}
              >
                <Download style={{ height: '14px', width: '14px' }} /> Download basic QR (PNG)
              </a>
              <p style={{ fontSize: '11px', color: '#444', marginTop: '8px' }}>
                Powered by QRON.space — AI QR Code Art Generator
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Credit Pack Upsell */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
            Need More AI QR Codes?
          </h2>
          <p style={{ color: '#9e9e9e', marginBottom: '32px' }}>
            One-time packs. Credits never expire. No subscription required.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { name: 'Starter Pack', credits: 100, price: '$29', perCode: '$0.29', priceId: 'starter', link: 'https://buy.stripe.com/6oUeVfflp9lPgzY76AaIM0c', popular: false },
              { name: 'Creator Pack', credits: 500, price: '$99', perCode: '$0.20', priceId: 'creator', link: 'https://buy.stripe.com/28E00l6OT7dHcjI1MgaIM0d', popular: true },
              { name: 'Studio Pack', credits: 2000, price: '$299', perCode: '$0.15', priceId: 'studio', link: 'https://buy.stripe.com/9B66oJ1uz7dHabA1MgaIM0e', popular: false },
            ].map((pack) => (
              <div key={pack.priceId} style={{
                background: pack.popular ? 'linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.04))' : '#141414',
                border: pack.popular ? '2px solid #c9a227' : '1px solid #2a2a2a',
                borderRadius: '16px',
                padding: '28px 20px',
                position: 'relative',
              }}>
                {pack.popular && (
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #c9a227, #a88520)', color: '#fff',
                    padding: '4px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                  }}>BEST VALUE</div>
                )}
                <h3 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '4px' }}>{pack.name}</h3>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#c9a227', margin: '12px 0 4px' }}>{pack.price}</div>
                <p style={{ fontSize: '14px', color: '#9e9e9e', marginBottom: '4px' }}>{pack.credits} AI QR codes</p>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>{pack.perCode}/code</p>
                <a
                  href={pack.link}
                  style={{
                    display: 'block', padding: '12px', borderRadius: '10px', fontWeight: 700,
                    fontSize: '14px', textDecoration: 'none', textAlign: 'center',
                    background: pack.popular ? 'linear-gradient(135deg, #c9a227, #a88520)' : '#222',
                    color: '#fff', border: pack.popular ? 'none' : '1px solid #333',
                  }}
                >
                  Buy {pack.name}
                </a>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#555', marginTop: '16px' }}>
            Secure checkout via Stripe. Credits added instantly to your account.
          </p>
        </div>
      </section>

      {/* SEO Content Section */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>
            Why Use QRON&apos;s AI QR Code Generator?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { icon: '🎨', title: 'AI-Powered Art', desc: 'Transform plain QR codes into stunning branded artwork using AI image generation. Stand out from every other QR code.' },
              { icon: '🔒', title: 'Blockchain Verified', desc: 'Every QRON code is cryptographically signed on the blockchain. Prove authenticity with a scan.' },
              { icon: '⚡', title: 'Instant Generation', desc: 'Create beautiful QR codes in seconds. No design skills needed. AI does the creative work.' },
              { icon: '📱', title: '100% Scannable', desc: 'Every AI QR code is tested for scannability. Beautiful AND functional — guaranteed.' },
              { icon: '🎯', title: 'Brand Customizable', desc: 'Match your brand colors, style, and aesthetic. Each QR code is unique to your brand.' },
              { icon: '📊', title: 'Scan Analytics', desc: 'Track scans, locations, and engagement. Know exactly how your QR codes perform.' },
            ].map((f, i) => (
              <div key={i} style={{
                background: '#141414',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                padding: '20px',
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: '6px', fontSize: '15px' }}>{f.title}</h3>
                <p style={{ fontSize: '13px', color: '#9e9e9e', lineHeight: '1.5' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: '40px 24px', borderTop: '1px solid #1a1a1a', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} style={{ height: '20px', width: '20px', color: '#c9a227', fill: '#c9a227' }} />
          ))}
        </div>
        <p style={{ color: '#9e9e9e', fontSize: '14px' }}>
          Trusted by creators, brands, and businesses worldwide
        </p>
      </section>

      {/* FAQ for SEO */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: 'Is the QR code generator really free?', a: 'Yes! You can generate unlimited basic QR codes for free. AI-styled QR art codes come with 3 free credits, then start at $29 for 10 codes.' },
            { q: 'What makes AI QR codes different from regular QR codes?', a: 'AI QR codes use generative AI to transform the QR pattern into artwork while maintaining scannability. The result is a unique, branded QR code that stands out and gets more scans.' },
            { q: 'Are QRON QR codes blockchain-verified?', a: 'Yes. Every QRON code is cryptographically signed on the blockchain via the AuthiChain Protocol, providing tamper-proof verification of authenticity.' },
            { q: 'Can I use these QR codes commercially?', a: 'Absolutely. All generated QR codes are yours to use for business cards, marketing materials, product packaging, or any commercial purpose.' },
            { q: 'Do the QR codes expire?', a: 'No. QRON QR codes are permanent and will work forever. The URL they point to is encoded directly in the QR pattern.' },
          ].map((faq, i) => (
            <details key={i} style={{
              background: '#141414',
              border: '1px solid #2a2a2a',
              borderRadius: '10px',
              padding: '16px 20px',
              marginBottom: '8px',
              cursor: 'pointer',
            }}>
              <summary style={{ fontWeight: 600, fontSize: '15px' }}>{faq.q}</summary>
              <p style={{ fontSize: '14px', color: '#9e9e9e', marginTop: '10px', lineHeight: '1.6' }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '60px 24px',
        borderTop: '1px solid rgba(201,162,39,0.2)',
        background: 'linear-gradient(180deg, rgba(201,162,39,0.05) 0%, transparent 100%)',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>
          Ready for AI-Powered QR Art?
        </h2>
        <p style={{ color: '#9e9e9e', marginBottom: '24px' }}>
          3 free AI QR codes. No credit card required.
        </p>
        <Link
          href="/login"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 32px',
            background: 'linear-gradient(135deg, #c9a227, #a88520)',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: 700,
            fontSize: '16px',
            textDecoration: 'none',
          }}
        >
          Start Creating <ArrowRight style={{ height: '18px', width: '18px' }} />
        </Link>
      </section>

      {/* FAQ Schema for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "Is the QR code generator really free?", acceptedAnswer: { "@type": "Answer", text: "Yes! You can generate unlimited basic QR codes for free. AI-styled QR art codes come with 3 free credits, then start at $29 for 10 codes." } },
              { "@type": "Question", name: "What makes AI QR codes different from regular QR codes?", acceptedAnswer: { "@type": "Answer", text: "AI QR codes use generative AI to transform the QR pattern into artwork while maintaining scannability." } },
              { "@type": "Question", name: "Are QRON QR codes blockchain-verified?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every QRON code is cryptographically signed on the blockchain via the AuthiChain Protocol." } },
              { "@type": "Question", name: "Can I use these QR codes commercially?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. All generated QR codes are yours to use for any commercial purpose." } },
              { "@type": "Question", name: "Do the QR codes expire?", acceptedAnswer: { "@type": "Answer", text: "No. QRON QR codes are permanent and will work forever." } },
            ],
          }),
        }}
      />
    </div>
  )
}
