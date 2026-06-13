-- ============================================================
--  ValeK site — Supabase setup
--  Run this in Supabase → SQL Editor → New query → Run.
-- ============================================================

-- One row per content key ('schedule', 'sponsors'); value is JSON.
create table if not exists public.site_content (
  key   text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- Row Level Security
alter table public.site_content enable row level security;

-- Anyone (anon) can READ the content — needed so visitors see the site.
create policy "public read"
  on public.site_content
  for select
  using (true);

-- Anyone (anon) can WRITE the content.
--   The /admin page is gated by a client-side password only, so the
--   database itself accepts writes from the public anon key. This is
--   convenient but NOT strong security: anyone who extracts the anon key
--   could write too.
--   ▸ To lock this down later: remove the two policies below, turn on
--     Supabase Auth (email), create one admin user, and change these to
--     `to authenticated`. Then switch the admin login to supabase.auth.
create policy "public insert"
  on public.site_content
  for insert
  with check (true);

create policy "public update"
  on public.site_content
  for update
  using (true)
  with check (true);

-- (Optional) keep updated_at fresh on every write.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_touch_updated_at on public.site_content;
create trigger trg_touch_updated_at
  before update on public.site_content
  for each row execute function public.touch_updated_at();

-- ============================================================
--  Contact form messages (Contacts page → read in /admin)
-- ============================================================
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  created_at timestamptz default now()
);

alter table public.contact_messages enable row level security;

-- Anyone can SUBMIT a message (the public contact form).
drop policy if exists "contact insert" on public.contact_messages;
create policy "contact insert"
  on public.contact_messages for insert
  to public
  with check (true);

-- Reading/deleting messages: with the password-gate setup these run under the
-- anon key, so they are open. ⚠️ This means anyone with the anon key could read
-- submitted messages. To make messages private, enable Supabase Auth and change
-- the two policies below to `to authenticated`.
drop policy if exists "contact select" on public.contact_messages;
create policy "contact select"
  on public.contact_messages for select
  to public
  using (true);

drop policy if exists "contact delete" on public.contact_messages;
create policy "contact delete"
  on public.contact_messages for delete
  to public
  using (true);

-- ============================================================
--  Storage bucket for sponsor logo uploads (admin "Choose file")
-- ============================================================

-- Public bucket so visitors can load the logos.
insert into storage.buckets (id, name, public)
values ('sponsor-logos', 'sponsor-logos', true)
on conflict (id) do nothing;

-- Anyone can read the files (bucket is public anyway).
drop policy if exists "sponsor logos public read" on storage.objects;
create policy "sponsor logos public read"
  on storage.objects for select
  to public
  using (bucket_id = 'sponsor-logos');

-- Anyone can upload/replace files in this bucket. Same security note as
-- above: the admin page is password-gated client-side only. To lock down,
-- switch these to `to authenticated` once Supabase Auth is enabled.
drop policy if exists "sponsor logos public insert" on storage.objects;
create policy "sponsor logos public insert"
  on storage.objects for insert
  to public
  with check (bucket_id = 'sponsor-logos');

drop policy if exists "sponsor logos public update" on storage.objects;
create policy "sponsor logos public update"
  on storage.objects for update
  to public
  using (bucket_id = 'sponsor-logos')
  with check (bucket_id = 'sponsor-logos');
