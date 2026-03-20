import { mkdir, readFile, appendFile } from 'fs/promises'
import path from 'path'

export type ActivityEvent = {
  type: string
  timestamp: string
  details?: Record<string, unknown>
}

// /tmp is writable in Vercel serverless; fall back to .data/ locally
const DATA_DIR = process.env.VERCEL
  ? '/tmp/qron-data'
  : path.join(process.cwd(), '.data')
const EVENTS_FILE = path.join(DATA_DIR, 'activity-events.jsonl')

export async function writeActivityEvent(event: ActivityEvent): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true })
    await appendFile(EVENTS_FILE, `${JSON.stringify(event)}\n`, 'utf8')
  } catch (err) {
    // Non-fatal — event logging must never break the request path
    console.warn('[activity-store] write failed:', err)
  }
}

export async function readRecentActivityEvents(limit = 100): Promise<ActivityEvent[]> {
  try {
    const raw = await readFile(EVENTS_FILE, 'utf8')
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try { return JSON.parse(line) as ActivityEvent } catch { return null }
      })
      .filter((e): e is ActivityEvent => e !== null)
      .slice(-limit)
      .reverse()
  } catch {
    return []
  }
}
