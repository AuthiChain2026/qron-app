#!/usr/bin/env npx ts-node
/**
 * Run once after deploy to register the bot webhook with Telegram.
 *
 *   TELEGRAM_BOT_TOKEN=<token> \
 *   TELEGRAM_WEBHOOK_SECRET=<secret> \
 *   NEXT_PUBLIC_SITE_URL=https://qron.app \
 *   npx ts-node scripts/setup-telegram-webhook.ts
 */

const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET || '';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!token || !siteUrl) {
  console.error('❌  TELEGRAM_BOT_TOKEN and NEXT_PUBLIC_SITE_URL are required.');
  process.exit(1);
}

const webhookUrl = `${siteUrl}/api/telegram`;

async function main() {
  console.log(`🔗 Setting webhook → ${webhookUrl}`);

  const res = await fetch(
    `https://api.telegram.org/bot${token}/setWebhook`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        secret_token: secret,
        allowed_updates: ['message', 'callback_query', 'inline_query'],
        drop_pending_updates: true,
      }),
    }
  );

  const data = await res.json();

  if (data.ok) {
    console.log('✅ Webhook registered successfully.');
  } else {
    console.error('❌ Failed:', data.description);
    process.exit(1);
  }

  // Set bot commands menu
  const cmdRes = await fetch(
    `https://api.telegram.org/bot${token}/setMyCommands`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commands: [
          { command: 'start',    description: 'Welcome & product overview' },
          { command: 'products', description: 'See all plans & pricing' },
          { command: 'demo',     description: 'Try QRON before you buy' },
          { command: 'buy_free', description: 'Start with the Free plan' },
          { command: 'buy_pro',  description: 'Subscribe to Pro ($9.99/mo)' },
          { command: 'contact',  description: 'Talk to sales' },
          { command: 'help',     description: 'Show all commands' },
        ],
      }),
    }
  );

  const cmdData = await cmdRes.json();
  if (cmdData.ok) {
    console.log('✅ Bot command menu set.');
  } else {
    console.warn('⚠️  Command menu failed:', cmdData.description);
  }

  // Enable inline mode
  console.log('\n📋 Next steps:');
  console.log('  1. Open @BotFather on Telegram');
  console.log('  2. Send: /setinline');
  console.log('  3. Select your bot → enter inline placeholder text, e.g.:');
  console.log('     "Search QRON plans..."');
  console.log('\n  This lets users type @YourBot in any chat to share product cards.');
}

main().catch(console.error);
