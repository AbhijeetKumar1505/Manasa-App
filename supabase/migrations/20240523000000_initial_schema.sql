-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Mood Logs table
create table mood_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  mood_rating integer not null, -- 1 to 5 scale or similar
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Journal Entries table
create table journal_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text,
  content text,
  mood_tag text,
  is_private boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Posts table (Community Feed)
create table posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  content text not null,
  is_anonymous boolean default false,
  likes_count integer default 0,
  comments_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Comments table
create table comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Post Likes table
create table post_likes (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(post_id, user_id)
);

-- Saved Resources table
create table saved_resources (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  resource_id text not null, -- ID or URL of the resource
  resource_type text not null, -- 'audio', 'article', etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, resource_id)
);

-- RLS Policies

-- Profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Mood Logs
alter table mood_logs enable row level security;

create policy "Users can view own mood logs."
  on mood_logs for select
  using ( auth.uid() = user_id );

create policy "Users can insert own mood logs."
  on mood_logs for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own mood logs."
  on mood_logs for update
  using ( auth.uid() = user_id );

create policy "Users can delete own mood logs."
  on mood_logs for delete
  using ( auth.uid() = user_id );

-- Journal Entries
alter table journal_entries enable row level security;

create policy "Users can view own journal entries."
  on journal_entries for select
  using ( auth.uid() = user_id );

create policy "Users can insert own journal entries."
  on journal_entries for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own journal entries."
  on journal_entries for update
  using ( auth.uid() = user_id );

create policy "Users can delete own journal entries."
  on journal_entries for delete
  using ( auth.uid() = user_id );

-- Posts
alter table posts enable row level security;

create policy "Posts are viewable by everyone."
  on posts for select
  using ( true );

create policy "Authenticated users can create posts."
  on posts for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own posts."
  on posts for update
  using ( auth.uid() = user_id );

create policy "Users can delete own posts."
  on posts for delete
  using ( auth.uid() = user_id );

-- Comments
alter table comments enable row level security;

create policy "Comments are viewable by everyone."
  on comments for select
  using ( true );

create policy "Authenticated users can create comments."
  on comments for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own comments."
  on comments for update
  using ( auth.uid() = user_id );

create policy "Users can delete own comments."
  on comments for delete
  using ( auth.uid() = user_id );

-- Post Likes
alter table post_likes enable row level security;

create policy "Post likes are viewable by everyone."
  on post_likes for select
  using ( true );

create policy "Authenticated users can toggle likes."
  on post_likes for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can remove own likes."
  on post_likes for delete
  using ( auth.uid() = user_id );

-- Saved Resources
alter table saved_resources enable row level security;

create policy "Users can view own saved resources."
  on saved_resources for select
  using ( auth.uid() = user_id );

create policy "Users can save resources."
  on saved_resources for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete saved resources."
  on saved_resources for delete
  using ( auth.uid() = user_id );

-- Functions and Triggers

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call handle_new_user on signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
