'use client'

import { CheckCircle2, Share2, Copy, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

interface ShareVerifiedProps {
  txHash: string
  tokenId?: string
  contractAddress?: string
  imageUrl?: string
}

export function ShareVerified({ txHash, tokenId, contractAddress, imageUrl }: ShareVerifiedProps) {
  const explorerUrl = `https://sepolia.basescan.org/tx/${txHash}`

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(explorerUrl)
    toast.success('Explorer link copied!')
  }

  const handleShare = async () => {
    const text = tokenId
      ? `I just minted QRON NFT #${tokenId} on-chain! 🎨✨`
      : 'I just minted a QRON NFT on-chain! 🎨✨'
    if (navigator.share) {
      try {
        await navigator.share({ title: 'QRON NFT', text, url: explorerUrl })
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${text}\n${explorerUrl}`)
      toast.success('Share text copied!')
    }
  }

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
      <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
        <CheckCircle2 className="w-4 h-4" />
        NFT minted successfully
        {tokenId && <span className="text-green-500/70">#{tokenId}</span>}
      </div>

      <p className="text-xs font-mono break-all text-green-400/60">{txHash}</p>

      <div className="flex gap-2">
        <button
          onClick={handleCopyLink}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium
                     py-1.5 px-3 rounded border border-green-500/30 text-green-400
                     hover:bg-green-500/10 transition-colors"
        >
          <Copy className="w-3 h-3" />
          Copy Link
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium
                     py-1.5 px-3 rounded border border-green-500/30 text-green-400
                     hover:bg-green-500/10 transition-colors"
        >
          <Share2 className="w-3 h-3" />
          Share
        </button>
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 text-xs font-medium
                     py-1.5 px-3 rounded border border-green-500/30 text-green-400
                     hover:bg-green-500/10 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Explorer
        </a>
      </div>
    </div>
  )
}
