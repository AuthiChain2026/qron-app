import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'
import nacl from 'tweetnacl'
import { decodeUTF8 } from 'tweetnacl-util'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const PRIVATE_KEY = Buffer.from(process.env.QRON_PRIVATE_KEY!, 'hex')

  try {
    const body = await req.json()
    const { name, description, brand, metadata } = body

    if (!name || !brand) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create product record in Supabase
    const productId = randomUUID()

    const { error: insertError } = await supabase.from('products').insert({
      id: productId,
      name,
      description,
      brand,
      metadata,
    })

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // Deterministic payload for QRON signing
    const payload = JSON.stringify({
      product_id: productId,
      brand,
      ts: Date.now(),
    })

    // Sign payload using Ed25519
    const signature = nacl.sign.detached(
      decodeUTF8(payload),
      PRIVATE_KEY
    )

    const signatureHex = Buffer.from(signature).toString('hex')

    // Return unsigned payload + signature for QRON generation
    return NextResponse.json({
      ok: true,
      product_id: productId,
      payload,
      signature: signatureHex,
      qron_url: `qron://${productId}?sig=${signatureHex}`,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
