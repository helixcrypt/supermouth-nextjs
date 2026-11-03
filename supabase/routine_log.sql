-- Emma routine interview log (SuperMouth). Anonymous: random session ids, no names, emails or IPs.
-- Run once in the Supabase SQL editor. Rows older than 90 days are deleted by the daily job below.

create table if not exists public.routine_sessions (
  id uuid primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  source text,                -- menu, product_page, code_link, starter_chip, typed, link
  device text,                -- mobile or desktop
  page text,                  -- page path where it started
  completed boolean not null default false,
  codes text,                 -- routine codes at the handoff, e.g. 'AFM KNS'
  goal text,
  habit text,
  last_step text,             -- last question shown (drop-off point if not completed)
  answers int not null default 0,
  side_questions int not null default 0,
  unparsed int not null default 0,
  restarts int not null default 0,
  followups int not null default 0,     -- shopper messages to Emma after the handoff (count only)
  expected_systems jsonb,     -- systems the tool picks for these codes
  emma_named jsonb,           -- which of those Emma's reply named
  emma_match boolean          -- true when Emma named every expected system
);

create table if not exists public.routine_events (
  id bigserial primary key,
  session_id uuid not null references public.routine_sessions(id) on delete cascade,
  at timestamptz not null default now(),
  kind text not null,         -- start, resume, question, answer, unparsed, side, restart, handoff, emma_reply, shopper_followup
  step text,
  about text,
  value text,                 -- button label, parsed stages for ages, or code
  state text,                 -- interview state after the event (structured answers, no free text)
  ms int,                     -- time since the previous event
  text text                   -- Emma's reply text only (never shopper text)
);

create index if not exists routine_events_session on public.routine_events(session_id, at);
create index if not exists routine_sessions_created on public.routine_sessions(created_at desc);

-- Only the server (service role) can read or write. No public access.
alter table public.routine_sessions enable row level security;
alter table public.routine_events enable row level security;

-- Tables are not exposed to the public Data API roles; grant only the server role.
revoke all on public.routine_sessions, public.routine_events from anon, authenticated;
grant all on public.routine_sessions, public.routine_events to service_role;
grant usage, select on sequence public.routine_events_id_seq to service_role;

-- Funnel view: where interviews stop.
create or replace view public.routine_dropoff with (security_invoker = true) as
  select last_step, count(*) as sessions, sum(case when completed then 1 else 0 end) as completed
  from public.routine_sessions group by last_step order by sessions desc;
revoke all on public.routine_dropoff from anon, authenticated;
grant select on public.routine_dropoff to service_role;

-- 90-day retention.
create extension if not exists pg_cron;
select cron.schedule('routine-log-retention', '17 9 * * *',
  $$delete from public.routine_sessions where created_at < now() - interval '90 days'$$);
