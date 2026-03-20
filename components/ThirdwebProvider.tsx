'use client'

import { ThirdwebProvider } from 'thirdweb/react'

export function QronThirdwebProvider({ children }: { children: React.ReactNode }) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>
}
