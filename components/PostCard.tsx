interface PostCardProps {
  content: string;
  timeAgo: string;
  likes: number;
  replies: number;
  liked?: boolean;
}

export default function PostCard({ content, timeAgo, likes, replies, liked }: PostCardProps) {
  return (
    <article className="bg-white dark:bg-card-dark p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all active:scale-[0.98]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <span className="material-icons-round text-slate-400 text-lg">face</span>
          </div>
          <div>
            <span className="text-sm font-semibold block text-slate-900 dark:text-white">Anonymous</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">{timeAgo}</span>
          </div>
        </div>
        <button className="text-slate-400">
          <span className="material-icons-round text-lg">more_horiz</span>
        </button>
      </div>

      <p className="text-[15px] leading-relaxed mb-6 text-slate-700 dark:text-slate-200">
        {content}
      </p>

      <div className="flex items-center gap-6 border-t border-slate-50 dark:border-slate-800 pt-4">
        <button className={`flex items-center gap-1.5 transition-colors ${liked ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}>
          <span className="material-icons-round text-[20px]">{liked ? 'favorite' : 'favorite_border'}</span>
          <span className="text-xs font-medium">{likes}</span>
        </button>
        <button className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
          <span className="material-icons-round text-[20px]">chat_bubble_outline</span>
          <span className="text-xs font-medium">{replies > 0 ? `${replies} Replies` : 'Reply'}</span>
        </button>
      </div>
    </article>
  );
}
