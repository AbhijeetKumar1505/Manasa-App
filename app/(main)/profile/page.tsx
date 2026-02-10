import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-32">
      {/* Header Section */}
      <header className="relative pt-12 pb-8 px-6 overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 mb-6 relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="w-full h-full rounded-full border-4 border-white dark:border-slate-800 shadow-sm bg-slate-200 flex items-center justify-center overflow-hidden">
               <span className="material-icons text-4xl text-slate-400">face</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">QuietPanda</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Student Soul • Joined Oct 2023</p>
          <button className="mt-4 px-4 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-300 shadow-sm flex items-center gap-1">
            <span className="material-icons-round text-sm">edit</span> Change Nickname
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 space-y-8">
        {/* Quick Menu */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1">Settings & Privacy</h2>
          <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <Link href="/journal" className="w-full flex items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-icons-round text-primary">history_edu</span>
                <span className="font-medium text-slate-900 dark:text-white">Mood History</span>
              </div>
              <span className="material-icons-round text-slate-300 text-sm">chevron_right</span>
            </Link>
            <Link href="/settings" className="w-full flex items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-icons-round text-primary">settings</span>
                <span className="font-medium text-slate-900 dark:text-white">App Settings</span>
              </div>
              <span className="material-icons-round text-slate-300 text-sm">chevron_right</span>
            </Link>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-icons-round text-primary">shield</span>
                <span className="font-medium text-slate-900 dark:text-white">Privacy Policy</span>
              </div>
              <span className="material-icons-round text-slate-300 text-sm">chevron_right</span>
            </button>
          </div>
        </section>

        {/* Vertical Mood History */}
        <section className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Recent Moods</h2>
            <button className="text-xs font-bold text-primary hover:opacity-80">View All</button>
          </div>
          <div className="space-y-3">
            <MoodItem label="TODAY" date="Oct 24, Thursday" mood="😌" isToday />
            <MoodItem label="YESTERDAY" date="Oct 23, Wednesday" mood="😔" />
            <MoodItem label="TUESDAY" date="Oct 22, Tuesday" mood="😊" />
            <MoodItem label="MONDAY" date="Oct 21, Monday" mood="😴" />
          </div>
        </section>

        {/* Danger Zone */}
        <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl p-4">
            <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">Data & Privacy</h3>
            <p className="text-xs text-red-500/80 dark:text-red-400/60 mb-4 leading-relaxed">
              You have total control over your data. Deleting your data is permanent and cannot be undone.
            </p>
            <button className="w-full py-2.5 px-4 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              Delete All My Data
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function MoodItem({ label, date, mood, isToday }: { label: string, date: string, mood: string, isToday?: boolean }) {
  return (
    <div className="bg-white dark:bg-card-dark p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm">
      <div className="flex flex-col">
        <span className={`text-xs font-bold mb-0.5 ${isToday ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>{label}</span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{date}</span>
      </div>
      <div className="text-3xl">{mood}</div>
    </div>
  );
}
