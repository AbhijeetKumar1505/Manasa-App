import Link from 'next/link';
import { getEntries } from '@/app/actions/journal';

interface JournalEntry {
  id: string;
  created_at: string;
  mood_tag: string | null;
  title: string | null;
  content: string | null;
}

export default async function JournalPage() {
  const entries = await getEntries() as JournalEntry[];

  return (
    <div className="min-h-screen pt-4 pb-32 px-5 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="mb-6 pt-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Journal</h1>
        {/* Search Bar */}
        <div className="relative group">
          <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input
            className="w-full bg-white dark:bg-slate-800/50 border-none rounded-xl py-3.5 pl-12 pr-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-400 text-slate-700 dark:text-slate-200"
            placeholder="Search your thoughts..."
            type="text"
          />
        </div>
      </header>

      {/* Journal List */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <p>No entries yet. Start writing!</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="bg-white dark:bg-card-dark p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {new Date(entry.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
                <span className="text-2xl">{entry.mood_tag || '📝'}</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-1">{entry.title || 'Untitled'}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
                {entry.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <Link href="/journal/new" className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40">
        <span className="material-icons text-3xl">add</span>
      </Link>
    </div>
  );
}
