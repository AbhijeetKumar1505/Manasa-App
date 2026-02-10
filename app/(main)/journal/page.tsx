import Link from 'next/link';

const entries = [
  { id: 1, date: "Today", mood: "🌿", title: "Finding some peace", preview: "Managed to finish the first draft of my project today. It felt good to take a long walk near the park after classes..." },
  { id: 2, date: "Oct 25, 2023", mood: "😴", title: "Exhausted but hopeful", preview: "The prep for final semester exams is kicking in. I felt overwhelmed this morning but talking to Rahul helped a lot..." },
  { id: 3, date: "Oct 23, 2023", mood: "✨", title: "A small win", preview: "I finally started that book I've been eyeing. The first chapter resonates so much with how I've been feeling lately..." },
];

export default function JournalPage() {
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
        {entries.map(entry => (
          <div key={entry.id} className="bg-white dark:bg-card-dark p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${entry.date === 'Today' ? 'text-primary' : 'text-slate-400'}`}>{entry.date}</span>
              <span className="text-2xl">{entry.mood}</span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-1">{entry.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
              {entry.preview}
            </p>
          </div>
        ))}
      </div>

      {/* FAB */}
      <Link href="/journal/new" className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40">
        <span className="material-icons text-3xl">add</span>
      </Link>
    </div>
  );
}
