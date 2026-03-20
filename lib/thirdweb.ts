import { createThirdwebClient } from 'thirdweb'
import { baseSepolia, base } from 'thirdweb/chains'

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ?? '',
})

// Active chain — override with NEXT_PUBLIC_THIRDWEB_CHAIN=base for production
const chainName = process.env.NEXT_PUBLIC_THIRDWEB_CHAIN ?? 'base-sepolia'
export const activeChain = chainName === 'base' ? base : baseSepolia
