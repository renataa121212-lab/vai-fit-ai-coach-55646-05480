-- Create bucket for evolution photos (private)
insert into storage.buckets (id, name, public)
values ('evolution-photos', 'evolution-photos', false)
on conflict (id) do nothing;

-- Ensure policies for evolution-photos bucket using DO blocks
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'objects' and policyname = 'Users can view their own evolution photos'
  ) then
    create policy "Users can view their own evolution photos"
      on storage.objects for select
      to authenticated
      using (
        bucket_id = 'evolution-photos'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'objects' and policyname = 'Users can upload their own evolution photos'
  ) then
    create policy "Users can upload their own evolution photos"
      on storage.objects for insert
      to authenticated
      with check (
        bucket_id = 'evolution-photos'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'objects' and policyname = 'Users can update their own evolution photos'
  ) then
    create policy "Users can update their own evolution photos"
      on storage.objects for update
      to authenticated
      using (
        bucket_id = 'evolution-photos'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'objects' and policyname = 'Users can delete their own evolution photos'
  ) then
    create policy "Users can delete their own evolution photos"
      on storage.objects for delete
      to authenticated
      using (
        bucket_id = 'evolution-photos'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;

  -- Same for food-images bucket
  if not exists (
    select 1 from pg_policies where tablename = 'objects' and policyname = 'Users can view their own food images'
  ) then
    create policy "Users can view their own food images"
      on storage.objects for select
      to authenticated
      using (
        bucket_id = 'food-images'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'objects' and policyname = 'Users can upload their own food images'
  ) then
    create policy "Users can upload their own food images"
      on storage.objects for insert
      to authenticated
      with check (
        bucket_id = 'food-images'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'objects' and policyname = 'Users can update their own food images'
  ) then
    create policy "Users can update their own food images"
      on storage.objects for update
      to authenticated
      using (
        bucket_id = 'food-images'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'objects' and policyname = 'Users can delete their own food images'
  ) then
    create policy "Users can delete their own food images"
      on storage.objects for delete
      to authenticated
      using (
        bucket_id = 'food-images'
        and auth.uid()::text = (storage.foldername(name))[1]
      );
  end if;
end $$;

-- Create evolution_photos table
create table if not exists public.evolution_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  image_path text not null,
  caption text,
  taken_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.evolution_photos enable row level security;

-- RLS policies for evolution_photos using DO blocks
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'evolution_photos' and policyname = 'Users can view their own evolution photos rows'
  ) then
    create policy "Users can view their own evolution photos rows"
      on public.evolution_photos for select
      to authenticated
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'evolution_photos' and policyname = 'Users can insert their own evolution photos rows'
  ) then
    create policy "Users can insert their own evolution photos rows"
      on public.evolution_photos for insert
      to authenticated
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'evolution_photos' and policyname = 'Users can update their own evolution photos rows'
  ) then
    create policy "Users can update their own evolution photos rows"
      on public.evolution_photos for update
      to authenticated
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'evolution_photos' and policyname = 'Users can delete their own evolution photos rows'
  ) then
    create policy "Users can delete their own evolution photos rows"
      on public.evolution_photos for delete
      to authenticated
      using (auth.uid() = user_id);
  end if;
end $$;

-- Trigger to keep updated_at fresh
do $$
begin
  if not exists (
    select 1 from pg_trigger where tgname = 'evolution_photos_updated_at'
  ) then
    create trigger evolution_photos_updated_at
    before update on public.evolution_photos
    for each row execute function public.update_updated_at_column();
  end if;
end $$;