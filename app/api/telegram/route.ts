import { getBotWebhookCallback } from '@/lib/telegram/bot';

export const runtime = 'nodejs';

// Verify the request comes from Telegram using the secret token
function verifySecret(request: Request): boolean {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret) return true; // skip check if not configured
  const header = request.headers.get('x-telegram-bot-api-secret-token');
  return header === secret;
}

export async function POST(request: Request) {
  if (!verifySecret(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const handler = getBotWebhookCallback();
    return handler(request);
  } catch (err) {
    console.error('Telegram webhook error:', err);
    return new Response('Internal error', { status: 500 });
  }
}
