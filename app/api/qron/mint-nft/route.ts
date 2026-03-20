/**
 * POST /api/qron/mint-nft
 *
 * Mints a QRON QR code as an ERC-721 NFT to the caller's wallet via thirdweb.
 *
 * Body (JSON):
 *   recipient      – Wallet address (from thirdweb ConnectButton)
 *   imageUrl       – Fal.ai-generated QR art image URL
 *   destinationUrl – The URL the QR encodes
 *   qronId         – Internal QRON record ID
 *
 * Env vars required:
 *   THIRDWEB_SECRET_KEY          – thirdweb server-side secret key
 *   QRON_NFT_CONTRACT_ADDRESS    – Deployed ERC-721 contract address
 *   NEXT_PUBLIC_THIRDWEB_CHAIN   – 'base' | 'base-sepolia' (default: base-sepolia)
 */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { recipient, imageUrl, destinationUrl, qronId } = await req.json()

    if (!recipient || !imageUrl || !destinationUrl) {
      return NextResponse.json({ error: 'recipient, imageUrl and destinationUrl are required' }, { status: 400 })
    }

    // Validate wallet address format
    if (!/^0x[0-9a-fA-F]{40}$/.test(recipient)) {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 })
    }

    const secretKey = process.env.THIRDWEB_SECRET_KEY
    const contractAddress = process.env.QRON_NFT_CONTRACT_ADDRESS

    if (!secretKey) {
      return NextResponse.json({ error: 'THIRDWEB_SECRET_KEY not configured' }, { status: 503 })
    }
    if (!contractAddress) {
      return NextResponse.json({ error: 'QRON_NFT_CONTRACT_ADDRESS not configured' }, { status: 503 })
    }

    // ── thirdweb v5 server-side mint ────────────────────────────────────────
    const { createThirdwebClient, getContract } = await import('thirdweb')
    const { mintTo } = await import('thirdweb/extensions/erc721')
    const { privateKeyAccount } = await import('thirdweb/wallets')
    const { sendTransaction } = await import('thirdweb')
    const { baseSepolia, base } = await import('thirdweb/chains')

    const chain = (process.env.NEXT_PUBLIC_THIRDWEB_CHAIN ?? 'base-sepolia') === 'base' ? base : baseSepolia

    const client = createThirdwebClient({ secretKey })

    const contract = getContract({
      client,
      chain,
      address: contractAddress,
    })

    // Build ERC-721 metadata
    const metadata = {
      name: `QRON QR Code #${qronId ?? Date.now()}`,
      description: `AI-generated QR code linking to ${destinationUrl}. Created with the QRON Creative Studio — part of the AuthiChain Protocol.`,
      image: imageUrl,
      external_url: destinationUrl,
      attributes: [
        { trait_type: 'Destination', value: destinationUrl },
        { trait_type: 'Generator', value: 'QRON Creative Studio' },
        { trait_type: 'Protocol', value: 'AuthiChain' },
        { trait_type: 'Standard', value: 'ERC-721' },
      ],
    }

    // Use the minter wallet (MINTER_PRIVATE_KEY reused from env, or THIRDWEB_MINTER_KEY)
    const minterKey = process.env.THIRDWEB_MINTER_KEY || process.env.MINTER_PRIVATE_KEY
    if (!minterKey) {
      return NextResponse.json({ error: 'Minter private key not configured' }, { status: 503 })
    }

    const minterAccount = privateKeyAccount({ client, privateKey: minterKey })

    const mintTx = mintTo({
      contract,
      to: recipient,
      nft: metadata,
    })

    const receipt = await sendTransaction({ transaction: mintTx, account: minterAccount })

    console.log('[qron/mint-nft] Minted to', recipient, 'txHash:', receipt.transactionHash)

    // Persist to Supabase (best-effort)
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      await supabase.from('qron_nft_mints').insert({
        qron_id: qronId,
        recipient,
        image_url: imageUrl,
        destination_url: destinationUrl,
        tx_hash: receipt.transactionHash,
        chain: chain.name,
        contract_address: contractAddress,
        minted_at: new Date().toISOString(),
      })
    } catch (dbErr) {
      console.warn('[qron/mint-nft] Non-fatal DB error:', dbErr)
    }

    return NextResponse.json({
      txHash: receipt.transactionHash,
      contractAddress,
      recipient,
    })
  } catch (err: any) {
    console.error('[qron/mint-nft] Error:', err)
    return NextResponse.json({ error: err.message || 'Mint failed' }, { status: 500 })
  }
}
