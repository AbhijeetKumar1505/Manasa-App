import Link from 'next/link';

export default function NewJournalEntryPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-card-dark flex flex-col pb-24">
      {/* Header */}
      <header className="pt-8 pb-4 px-6 flex flex-col items-center gap-2">
        <div className="w-12 h-1 bg-primary/10 rounded-full mb-2"></div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">What&apos;s on your mind?</h1>
        <p className="text-sm text-slate-400 dark:text-slate-500">Your safe space for reflection</p>
      </header>

      {/* Main Writing Space */}
      <main className="flex-1 px-8 py-4 overflow-y-auto hide-scrollbar">
        <textarea
          className="w-full h-full bg-transparent border-none p-0 text-lg leading-relaxed placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none focus:ring-0 outline-none"
          placeholder="Start typing your thoughts..."
        ></textarea>
      </main>

      {/* Tool & Actions Bar */}
      <div className="px-6 pb-2">
        {/* Contextual Toolbar */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-2 flex items-center justify-between mb-4 border border-primary/5">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400">
              <span className="material-icons-round text-lg text-primary">add_reaction</span>
              <span className="text-xs font-medium">Add Mood</span>
            </button>
            <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <button className="p-2 rounded-xl text-slate-400 hover:text-primary transition-colors">
              <span className="material-icons-round text-lg">image</span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 text-primary">
              <span className="material-icons-round text-sm">lock</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Private</span>
            </div>
          </div>
        </div>

        {/* Mood Tag Suggestions */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4">
          {['Calm', 'Stressed', 'Grateful', 'Overwhelmed', 'Hopeful'].map(mood => (
            <span key={mood} className="flex-shrink-0 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50">
              {mood}
            </span>
          ))}
        </div>

        {/* Primary Action */}
        <Link href="/journal" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-6">
          <span className="material-icons-round text-xl">cloud_done</span>
          Save to My Space
        </Link>
      </div>
    </div>
  );
}
