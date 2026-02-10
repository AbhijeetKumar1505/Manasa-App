import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getPosts } from '@/app/actions/feed';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

interface Post {
  id: string;
  content: string;
  created_at: string;
  likes: number;
  replies: number;
  liked: boolean;
  is_anonymous: boolean;
  profiles: { display_name: string } | null;
}

export default async function FeedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const posts = await getPosts() as Post[];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-5 py-4 flex justify-between items-center border-b border-primary/10">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Safe Space</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">An anonymous community for you</p>
        </div>
        <button className="p-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
          <span className="material-icons-round">tune</span>
        </button>
      </header>

      {/* Feed */}
      <main className="px-4 py-6 space-y-4 pb-32">
        {posts.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <p>No posts yet. Be the first to share!</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              content={post.content}
              timeAgo={new Date(post.created_at).toLocaleDateString()}
              likes={post.likes}
              replies={post.replies}
              liked={post.liked}
              isAnonymous={post.is_anonymous}
              authorName={post.profiles?.display_name}
            />
          ))
        )}
      </main>

      {/* Floating Action Button */}
      <Link href="/feed/create" className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center z-50 hover:scale-105 active:scale-95 transition-transform">
        <span className="material-icons-round text-3xl">add</span>
      </Link>
    </div>
  );
}
