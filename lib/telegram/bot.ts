import { Bot, InlineKeyboard, webhookCallback } from 'grammy';
import { PLANS } from '@/lib/plans';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://qron.app';
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;

// Lead tracking (in-memory cache, Supabase persists)
const leadCache = new Set<number>();

export function createBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error('TELEGRAM_BOT_TOKEN is not set');

  const bot = new Bot(token);

  // ── /start ─────────────────────────────────────────────────────────────────
  bot.command('start', async (ctx) => {
    const name = ctx.from?.first_name || 'there';
    await trackLead(ctx.from?.id, ctx.from?.username);

    const keyboard = new InlineKeyboard()
      .text('🏷 View Products', 'products').row()
      .text('🚀 Start Free', 'buy_free')
      .text('⚡ Go Pro – $9.99/mo', 'buy_pro').row()
      .text('🤝 Talk to Sales', 'contact').row()
      .url('🌐 Open App', BASE_URL);

    await ctx.reply(
      `👋 Hey ${name}! Welcome to *QRON*.\n\n` +
      `We turn any URL into a *stunning, AI-generated QR code* that actually gets scanned.\n\n` +
      `🔐 *Blockchain-verified* authenticity\n` +
      `🎨 *AI-styled* artwork baked into the code\n` +
      `📊 *Real-time scan analytics*\n` +
      `🏢 *White-label & API* for enterprises\n\n` +
      `Pick a plan and generate your first QR in 60 seconds 👇`,
      { parse_mode: 'Markdown', reply_markup: keyboard }
    );
  });

  // ── /products ───────────────────────────────────────────────────────────────
  bot.command('products', async (ctx) => {
    await ctx.reply(buildProductsMessage(), {
      parse_mode: 'Markdown',
      reply_markup: buildProductsKeyboard(),
    });
  });

  bot.callbackQuery('products', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(buildProductsMessage(), {
      parse_mode: 'Markdown',
      reply_markup: buildProductsKeyboard(),
    });
  });

  // ── Buy handlers ────────────────────────────────────────────────────────────
  for (const plan of PLANS) {
    const callbackId = `buy_${plan.id}`;

    bot.command(`buy_${plan.id}`, async (ctx) => {
      await sendBuyMessage(ctx, plan);
    });

    bot.callbackQuery(callbackId, async (ctx) => {
      await ctx.answerCallbackQuery();
      await sendBuyMessage(ctx, plan);
    });
  }

  // ── /demo ───────────────────────────────────────────────────────────────────
  bot.command('demo', async (ctx) => {
    const keyboard = new InlineKeyboard()
      .url('▶️ Try Demo', `${BASE_URL}/demo`).row()
      .text('💳 Buy Now', 'products');

    await ctx.reply(
      `🎬 *See QRON in action*\n\n` +
      `Generate a live AI QR code for any URL — no sign-up required.\n\n` +
      `After the demo, come back and pick a plan to unlock unlimited generations.`,
      { parse_mode: 'Markdown', reply_markup: keyboard }
    );
  });

  // ── /contact ─────────────────────────────────────────────────────────────
  bot.command('contact', async (ctx) => {
    await sendContactMessage(ctx);
  });

  bot.callbackQuery('contact', async (ctx) => {
    await ctx.answerCallbackQuery();
    await sendContactMessage(ctx);
  });

  // ── /help ───────────────────────────────────────────────────────────────────
  bot.command('help', async (ctx) => {
    await ctx.reply(
      `*QRON Bot Commands*\n\n` +
      `/start – Welcome & product overview\n` +
      `/products – See all plans & pricing\n` +
      `/buy\\_free – Start with the Free plan\n` +
      `/buy\\_pro – Subscribe to Pro ($9.99/mo)\n` +
      `/demo – Try before you buy\n` +
      `/contact – Talk to a human\n` +
      `/help – This message`,
      { parse_mode: 'Markdown' }
    );
  });

  // ── /broadcast (admin only) ──────────────────────────────────────────────
  bot.command('broadcast', async (ctx) => {
    if (!ADMIN_CHAT_ID || String(ctx.from?.id) !== ADMIN_CHAT_ID) {
      return ctx.reply('⛔ Unauthorized');
    }

    const text = ctx.message?.text?.replace('/broadcast', '').trim();
    if (!text) return ctx.reply('Usage: /broadcast <message>');

    const leads = await getLeads();
    let sent = 0;

    for (const chatId of leads) {
      try {
        await bot.api.sendMessage(chatId, text, { parse_mode: 'Markdown' });
        sent++;
      } catch {
        // User blocked bot or chat unavailable — skip
      }
    }

    await ctx.reply(`✅ Broadcast sent to ${sent} users.`);
  });

  // ── Inline mode – share product cards in any chat ────────────────────────
  bot.on('inline_query', async (ctx) => {
    const results = PLANS.map((plan, i) => ({
      type: 'article' as const,
      id: String(i),
      title: `${plan.name} – ${plan.price === 0 ? 'Free' : `$${plan.price}${plan.price_suffix || ''}`}`,
      description: plan.features.join(' · '),
      input_message_content: {
        message_text:
          `🔖 *QRON ${plan.name} Plan*\n\n` +
          plan.features.map((f) => `✅ ${f}`).join('\n') +
          `\n\n💳 ${plan.price === 0 ? 'Free forever' : `$${plan.price}${plan.price_suffix || ''}`}\n` +
          `👉 ${BASE_URL}`,
        parse_mode: 'Markdown' as const,
      },
      reply_markup: new InlineKeyboard().url(
        plan.price === 0 ? '🚀 Get Started Free' : `💳 Subscribe – $${plan.price}`,
        `${BASE_URL}/#pricing`
      ),
    }));

    await ctx.answerInlineQuery(results, { cache_time: 30 });
  });

  // ── Catch-all: nudge unrecognized messages toward buying ─────────────────
  bot.on('message', async (ctx) => {
    await trackLead(ctx.from?.id, ctx.from?.username);

    const keyboard = new InlineKeyboard()
      .text('🏷 See Plans', 'products')
      .text('🤝 Contact Sales', 'contact');

    await ctx.reply(
      `I didn't catch that — but I'm here to help you get started with QRON! 👇`,
      { reply_markup: keyboard }
    );
  });

  return bot;
}

// ── Webhook callback for Next.js ─────────────────────────────────────────────
let _bot: Bot | null = null;

export function getBotWebhookCallback() {
  if (!_bot) _bot = createBot();
  return webhookCallback(_bot, 'std/http');
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function buildProductsMessage() {
  return (
    `*QRON Plans & Pricing*\n\n` +
    PLANS.map((p) => {
      const price =
        p.price === 0 ? '🆓 Free forever' : `💳 $${p.price}${p.price_suffix || ''}`;
      const features = p.features.map((f) => `  • ${f}`).join('\n');
      return `*${p.name}*  ${price}\n${features}`;
    }).join('\n\n')
  );
}

function buildProductsKeyboard() {
  const kb = new InlineKeyboard();
  for (const plan of PLANS) {
    const label =
      plan.price === 0
        ? `🚀 ${plan.name} – Free`
        : `💳 ${plan.name} – $${plan.price}${plan.price_suffix || ''}`;
    kb.text(label, `buy_${plan.id}`).row();
  }
  kb.url('🌐 Full Pricing Page', `${BASE_URL}/#pricing`);
  return kb;
}

async function sendBuyMessage(ctx: { reply: Function; from?: { first_name?: string } }, plan: typeof PLANS[number]) {
  if (plan.id === 'enterprise') {
    await sendContactMessage(ctx);
    return;
  }

  const checkoutUrl = `${BASE_URL}/checkout?plan=${plan.id}`;
  const keyboard = new InlineKeyboard()
    .url(plan.cta, checkoutUrl).row()
    .text('← Back to Plans', 'products');

  const price =
    plan.price === 0 ? 'completely free' : `$${plan.price}${plan.price_suffix || ''}`;

  await ctx.reply(
    `🛒 *${plan.name} Plan*\n\n` +
    plan.features.map((f) => `✅ ${f}`).join('\n') +
    `\n\n💰 *${price}*\n\n` +
    `Tap the button below to complete your order. Takes less than a minute.`,
    { parse_mode: 'Markdown', reply_markup: keyboard }
  );
}

async function sendContactMessage(ctx: { reply: Function }) {
  const keyboard = new InlineKeyboard()
    .url('📧 Email Sales', 'mailto:sales@qron.app').row()
    .url('🌐 Book a Call', `${BASE_URL}/contact`);

  await ctx.reply(
    `🤝 *Talk to our sales team*\n\n` +
    `We offer custom pricing for:\n` +
    `  • High-volume QR generation\n` +
    `  • White-label / API integration\n` +
    `  • Multi-brand or reseller setups\n\n` +
    `Reach out and we'll reply within 24 hours.`,
    { parse_mode: 'Markdown', reply_markup: keyboard }
  );
}

// Lead persistence via Supabase (best-effort)
async function trackLead(userId?: number, username?: string) {
  if (!userId || leadCache.has(userId)) return;
  leadCache.add(userId);

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) return;

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from('telegram_leads').upsert(
      { chat_id: userId, username: username || null, last_seen: new Date().toISOString() },
      { onConflict: 'chat_id' }
    );
  } catch {
    // Non-fatal – bot still works without DB
  }
}

async function getLeads(): Promise<number[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) return [...leadCache];

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data } = await supabase.from('telegram_leads').select('chat_id');
    return (data || []).map((r: { chat_id: number }) => r.chat_id);
  } catch {
    return [...leadCache];
  }
}
