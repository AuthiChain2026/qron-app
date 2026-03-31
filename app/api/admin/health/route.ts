import { NextRequest, NextResponse } from 'next/server'
import { checkRequiredEnvs } from '@/lib/env-check'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const adminSecret = req.headers.get('x-admin-secret')
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { missing, present } = checkRequiredEnvs()

  const checks: Record<string, { ok: boolean }> = {}
  for (const name of present) {
    checks[name.toLowerCase()] = { ok: true }
  }
  for (const name of missing) {
    checks[name.toLowerCase()] = { ok: false }
  }

  const status = missing.length === 0
    ? 'healthy'
    : missing.length <= 2
      ? 'degraded'
      : 'unhealthy'

  return NextResponse.json({
    status,
    checks,
    missing,
    timestamp: new Date().toISOString(),
  })
}
