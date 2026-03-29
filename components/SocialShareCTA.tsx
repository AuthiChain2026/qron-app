'use client'

import { useState } from 'react'
import { Share2, Copy, CheckCircle } from 'lucide-react'

interface SocialShareCTAProps {
  imageUrl?: string
  title?: string
  description?: string
}

export function SocialShareCTA({ imageUrl, title = 'Check out my AI QR Code!', description = 'Created with QRON — AI QR Code Art Generator' }: SocialShareCTAProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = 'https://qron.space/free-qr-generator'
  const shareText = `${title}\n\n${description}\n\nCreate yours free:`

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: shareUrl })
        trackShare('native')
      } catch { /* cancelled */ }
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
    setCopied(true)
    trackShare('copy')
    setTimeout(() => setCopied(false), 2000)
  }

  const trackShare = (method: string) => {
    fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: `share_${method}`, product_interest: 'qron', page_url: window.location.pathname }),
    }).catch(() => {})
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      padding: '12px',
      background: 'rgba(201,162,39,0.05)',
      border: '1px solid rgba(201,162,39,0.15)',
      borderRadius: '10px',
    }}>
      <span style={{ fontSize: '12px', color: '#9e9e9e', width: '100%', marginBottom: '4px' }}>
        Share your creation:
      </span>

      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button onClick={handleNativeShare} style={btnStyle}>
          <Share2 style={{ height: '14px', width: '14px' }} /> Share
        </button>
      )}

      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnStyle, textDecoration: 'none' }}>
        𝕏 Post
      </a>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnStyle, textDecoration: 'none' }}>
        in LinkedIn
      </a>
      <a href={redditUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnStyle, textDecoration: 'none' }}>
        Reddit
      </a>

      <button onClick={handleCopy} style={btnStyle}>
        {copied ? <CheckCircle style={{ height: '14px', width: '14px', color: '#22c55e' }} /> : <Copy style={{ height: '14px', width: '14px' }} />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '6px 12px',
  background: '#1a1a1a',
  border: '1px solid #333',
  borderRadius: '6px',
  color: '#ccc',
  fontSize: '12px',
  fontWeight: 600,
  cursor: 'pointer',
}
