alter table public.diagnoses
  add column before_image_path text,
  add column after_image_path text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'diagnosis-images',
  'diagnosis-images',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Users can view their own diagnosis images"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'diagnosis-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can upload their own diagnosis images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'diagnosis-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can update their own diagnosis images"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'diagnosis-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'diagnosis-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can delete their own diagnosis images"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'diagnosis-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

grant update on table public.diagnoses to authenticated;

create policy "Users can update their own diagnoses"
  on public.diagnoses
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
