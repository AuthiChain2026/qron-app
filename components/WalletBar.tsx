'use client'

import { ConnectButton } from 'thirdweb/react'
import { thirdwebClient, activeChain } from '@/lib/thirdweb'

/**
 * Compact wallet connect button for the protocol header bar.
 * Styled to match the dark gold QRON aesthetic.
 */
export function WalletBar() {
  return (
    <ConnectButton
      client={thirdwebClient}
      chain={activeChain}
      connectButton={{
        label: 'Connect Wallet',
        style: {
          background: 'transparent',
          border: '1px solid rgba(201,162,39,0.5)',
          color: '#c9a227',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.06em',
          padding: '3px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
          height: 'auto',
          minHeight: 'unset',
        },
      }}
      detailsButton={{
        style: {
          background: 'transparent',
          border: '1px solid rgba(201,162,39,0.4)',
          color: '#c9a227',
          fontSize: '11px',
          fontWeight: 600,
          padding: '3px 10px',
          borderRadius: '4px',
          height: 'auto',
          minHeight: 'unset',
        },
      }}
    />
  )
}
