-- Fix handle_new_user for anonymous users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Anonymous'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Fix Foreign Keys to reference profiles instead of auth.users
-- This allows PostgREST to detect relationships for joins

-- Posts
alter table posts drop constraint posts_user_id_fkey;
alter table posts add constraint posts_user_id_fkey
  foreign key (user_id) references public.profiles(id) on delete cascade;

-- Comments
alter table comments drop constraint comments_user_id_fkey;
alter table comments add constraint comments_user_id_fkey
  foreign key (user_id) references public.profiles(id) on delete cascade;

-- Post Likes
alter table post_likes drop constraint post_likes_user_id_fkey;
alter table post_likes add constraint post_likes_user_id_fkey
  foreign key (user_id) references public.profiles(id) on delete cascade;

-- Mood Logs
alter table mood_logs drop constraint mood_logs_user_id_fkey;
alter table mood_logs add constraint mood_logs_user_id_fkey
  foreign key (user_id) references public.profiles(id) on delete cascade;

-- Journal Entries
alter table journal_entries drop constraint journal_entries_user_id_fkey;
alter table journal_entries add constraint journal_entries_user_id_fkey
  foreign key (user_id) references public.profiles(id) on delete cascade;

-- Saved Resources
alter table saved_resources drop constraint saved_resources_user_id_fkey;
alter table saved_resources add constraint saved_resources_user_id_fkey
  foreign key (user_id) references public.profiles(id) on delete cascade;
