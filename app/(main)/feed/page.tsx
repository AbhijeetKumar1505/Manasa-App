import PostCard from '@/components/PostCard';

const posts = [
  { id: 1, content: "Does anyone else feel like they're just pretending to know what's going on in lectures? Exam season is coming and the anxiety is peaking. 🫠", timeAgo: "2 hours ago", likes: 24, replies: 8, liked: false },
  { id: 2, content: "Small win: I finally reached out to the student counselor today. It wasn't as scary as I thought it would be. If you're thinking about it, this is your sign. ❤️", timeAgo: "5 hours ago", likes: 156, replies: 12, liked: true },
  { id: 3, content: "Placement season is making me feel like I'm not good enough compared to my peers. How do you all stop comparing yourself to everyone else's LinkedIn updates?", timeAgo: "Yesterday", likes: 89, replies: 32, liked: false },
  { id: 4, content: "It's 3 AM and I'm just staring at the ceiling. Mumbai rains are soothing but my mind won't shut up about tomorrow's presentation.", timeAgo: "Just now", likes: 0, replies: 0, liked: false },
];

export default function FeedPage() {
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
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center z-50 hover:scale-105 active:scale-95 transition-transform">
        <span className="material-icons-round text-3xl">add</span>
      </button>
    </div>
  );
}
