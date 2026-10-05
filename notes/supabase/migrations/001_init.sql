create extension if not exists pgcrypto;

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  title text not null default 'Nova anotação',
  content text not null default '',
  color text not null default 'yellow',
  status text not null default 'todo' check (status in ('ideas','todo','doing','done')),
  priority text not null default 'Média',
  pinned boolean not null default false,
  completed boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists notes_user_id_idx on public.notes(user_id);
create index if not exists notes_user_status_position_idx on public.notes(user_id, status, position);
create index if not exists notes_user_updated_at_idx on public.notes(user_id, updated_at desc);

alter table public.notes enable row level security;
revoke all on table public.notes from anon;
grant select, insert, update, delete on table public.notes to authenticated;

drop policy if exists "Users can read own notes" on public.notes;
drop policy if exists "Users can insert own notes" on public.notes;
drop policy if exists "Users can update own notes" on public.notes;
drop policy if exists "Users can delete own notes" on public.notes;

create policy "Users can read own notes" on public.notes for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can insert own notes" on public.notes for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users can update own notes" on public.notes for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users can delete own notes" on public.notes for delete to authenticated using ((select auth.uid()) = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end
$$;

revoke all on function public.set_updated_at() from public;
revoke all on function public.set_updated_at() from anon;
revoke all on function public.set_updated_at() from authenticated;

drop trigger if exists notes_updated_at on public.notes;
create trigger notes_updated_at before update on public.notes for each row execute function public.set_updated_at();

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'notes'
  ) then
    alter publication supabase_realtime add table public.notes;
  end if;
end $$;
