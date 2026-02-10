import Link from 'next/link';

export default function HubPage() {
  return (
    <div className="min-h-screen px-6 pb-32">
      {/* Header */}
      <header className="flex justify-between items-center py-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Self-Help Hub</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Take a moment for yourself, Arjun</p>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <span className="material-icons-round text-primary text-xl">face</span>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background-light dark:border-background-dark rounded-full"></div>
        </div>
      </header>

      {/* Privacy Badge */}
      <div className="flex items-center gap-2 mb-8 bg-slate-100 dark:bg-slate-800/50 w-fit px-3 py-1.5 rounded-full">
        <span className="material-icons-round text-slate-400 text-sm">incognito</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Private Session Active</span>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 mb-8 overflow-x-auto hide-scrollbar">
        <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold flex-shrink-0 shadow-lg shadow-primary/20">All Tools</button>
        <button className="bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-700 px-5 py-2 rounded-full text-sm font-medium flex-shrink-0 text-slate-600 dark:text-slate-300">Quick Relief</button>
        <button className="bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-700 px-5 py-2 rounded-full text-sm font-medium flex-shrink-0 text-slate-600 dark:text-slate-300">Sleep</button>
        <button className="bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-700 px-5 py-2 rounded-full text-sm font-medium flex-shrink-0 text-slate-600 dark:text-slate-300">Focus</button>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Breathe Card */}
        <Link href="/hub/breathing" className="flex flex-col items-center justify-center bg-soft-mint dark:bg-teal-950/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-900/50 transition-transform active:scale-95 text-center col-span-2 md:col-span-1">
          <div className="w-16 h-16 bg-white dark:bg-teal-900/40 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <span className="material-icons-round text-teal-500 text-3xl">air</span>
          </div>
          <h3 className="text-lg font-bold text-teal-900 dark:text-teal-100">Breathe</h3>
          <p className="text-xs text-teal-700/60 dark:text-teal-400/60 mt-1">2-minute reset</p>
        </Link>

        {/* Calm Audio Card */}
        <Link href="/hub/audio" className="flex flex-col items-center justify-center bg-soft-lavender dark:bg-indigo-950/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 transition-transform active:scale-95 text-center">
          <div className="w-14 h-14 bg-white dark:bg-indigo-900/40 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <span className="material-icons-round text-indigo-500 text-2xl">graphic_eq</span>
          </div>
          <h3 className="text-base font-bold text-indigo-900 dark:text-indigo-100">Calm Audio</h3>
          <p className="text-[10px] text-indigo-700/60 dark:text-indigo-400/60 mt-1">Ambient escapes</p>
        </Link>

        {/* Grounding Card */}
        <Link href="/hub/grounding" className="flex flex-col items-center justify-center bg-soft-peach dark:bg-orange-950/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/50 transition-transform active:scale-95 text-center">
          <div className="w-14 h-14 bg-white dark:bg-orange-900/40 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <span className="material-icons-round text-orange-500 text-2xl">spa</span>
          </div>
          <h3 className="text-base font-bold text-orange-900 dark:text-orange-100">Grounding</h3>
          <p className="text-[10px] text-orange-700/60 dark:text-orange-400/60 mt-1">5-4-3-2-1 technique</p>
        </Link>

        {/* Focus Card */}
        <div className="flex flex-col items-center justify-center bg-soft-blue dark:bg-sky-950/20 p-6 rounded-2xl border border-sky-100 dark:border-sky-900/50 transition-transform active:scale-95 text-center col-span-2">
          <div className="flex items-center gap-6 w-full px-2">
            <div className="w-14 h-14 bg-white dark:bg-sky-900/40 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-icons-round text-sky-500 text-2xl">center_focus_strong</span>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-sky-900 dark:text-sky-100">Study Focus</h3>
              <p className="text-sm text-sky-700/60 dark:text-sky-400/60 mt-0.5">Minimize exam anxiety</p>
            </div>
            <div className="ml-auto">
              <span className="material-icons-round text-sky-300">chevron_right</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
