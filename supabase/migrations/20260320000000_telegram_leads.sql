-- Telegram lead tracking for bot sales funnel
create table if not exists telegram_leads (
  chat_id   bigint primary key,
  username  text,
  last_seen timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Allow service role full access
alter table telegram_leads enable row level security;

create policy "service role full access"
  on telegram_leads
  for all
  using (true)
  with check (true);
