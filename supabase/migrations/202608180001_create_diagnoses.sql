create table public.diagnoses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  target_impression text not null check (char_length(target_impression) between 1 and 200),
  overall_progress integer not null check (overall_progress between 0 and 100),
  analysis jsonb not null,
  created_at timestamptz not null default now()
);

create index diagnoses_user_id_created_at_idx
  on public.diagnoses (user_id, created_at desc);

alter table public.diagnoses enable row level security;

create policy "Users can view their own diagnoses"
  on public.diagnoses
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own diagnoses"
  on public.diagnoses
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own diagnoses"
  on public.diagnoses
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on table public.diagnoses from anon;
grant select, insert, delete on table public.diagnoses to authenticated;
