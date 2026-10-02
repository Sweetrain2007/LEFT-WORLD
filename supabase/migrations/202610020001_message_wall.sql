begin;
-- Run once on a Supabase project. An existing messages table causes an error;
-- do not silently change an unrelated schema.
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  content text not null check (char_length(btrim(content)) between 1 and 500),
  visibility text not null check (visibility in ('public','private')),
  status text not null default 'approved' check (status in ('approved','pending','rejected')),
  created_at timestamptz not null default now(),
  x double precision not null check (x >= 0 and x <= 100),
  y double precision not null check (y >= 0 and y <= 100)
);
alter table public.messages enable row level security;
revoke all on table public.messages from public, anon, authenticated;
grant select on table public.messages to anon, authenticated;
grant insert (id,author_id,content,visibility,x,y) on public.messages to authenticated;
create policy messages_public_read on public.messages for select to anon, authenticated
  using (visibility = 'public' and status = 'approved');
create policy messages_owner_read on public.messages for select to authenticated
  using (author_id = (select auth.uid()));
create policy messages_owner_insert on public.messages for insert to authenticated
  with check (author_id = (select auth.uid()));
-- No UPDATE/DELETE grants or policies for clients. Status/created_at cannot be supplied.
create index messages_public_date_idx on public.messages(created_at desc,id desc)
  where visibility='public' and status='approved';
create index messages_author_date_idx on public.messages(author_id,created_at desc,id desc);

-- Server-only word rules. Empty until the owner supplies actual blocked words.
create schema if not exists message_wall_private;
revoke all on schema message_wall_private from public, anon, authenticated;
create table message_wall_private.blocked_words (
  word text primary key check (length(btrim(word)) > 0),
  enabled boolean not null default true
);
revoke all on message_wall_private.blocked_words from public, anon, authenticated;
create function message_wall_private.check_message() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if exists (select 1 from message_wall_private.blocked_words w
             where w.enabled and strpos(lower(new.content),lower(w.word)) > 0) then
    raise exception 'MESSAGE_BLOCKED' using errcode = 'P0001';
  end if;
  -- Passed current word checks: immediately share public posts. This is not human/AI moderation.
  -- Later moderation can assign pending here; clients cannot set status themselves.
  new.status := 'approved';
  new.created_at := now();
  return new;
end;
$$;
revoke all on function message_wall_private.check_message() from public, anon, authenticated;
create trigger messages_moderation before insert on public.messages
  for each row execute function message_wall_private.check_message();
commit;
