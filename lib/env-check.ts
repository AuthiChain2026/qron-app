/**
 * Environment variable validation utilities.
 *
 * Used by API routes for consistent error responses and by the
 * /api/admin/health endpoint for a single-glance status check.
 */

const REQUIRED_ENVS = [
  'FAL_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
] as const

export type RequiredEnvName = (typeof REQUIRED_ENVS)[number]

/** Returns the value or throws with a descriptive message. */
export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

/** Checks all required env vars and returns a summary. */
export function checkRequiredEnvs(): {
  missing: string[]
  present: string[]
} {
  const missing: string[] = []
  const present: string[] = []
  for (const name of REQUIRED_ENVS) {
    if (process.env[name]) {
      present.push(name)
    } else {
      missing.push(name)
    }
  }
  return { missing, present }
}
