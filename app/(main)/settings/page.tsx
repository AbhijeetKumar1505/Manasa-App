import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-32">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Link href="/profile" className="p-2 -ml-2 rounded-full hover:bg-primary/10 transition-colors text-slate-600 dark:text-slate-300">
          <span className="material-icons-round text-2xl">arrow_back_ios_new</span>
        </Link>
        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Your Privacy</h1>
        <div className="w-10"></div>
      </header>

      {/* Content */}
      <main className="px-6 py-4">
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
          You’re in control of your data. We ensure your well-being journey remains private and secure.
        </p>

        {/* Identity */}
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 ml-1">Identity</h2>
          <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
            <div className="p-4 flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="font-semibold text-slate-800 dark:text-slate-100">Stay fully anonymous</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Hide your identity across the app</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer-checked:bg-primary transition-colors duration-200"></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-full shadow-sm"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 ml-1">Data Management</h2>
          <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
            <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-icons-round text-primary/70">download</span>
                <span className="font-medium text-slate-800 dark:text-slate-100">Export my mood history</span>
              </div>
              <span className="material-icons-round text-slate-300">chevron_right</span>
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-icons-round text-primary/70">history_edu</span>
                <span className="font-medium text-slate-800 dark:text-slate-100">Download activity log</span>
              </div>
              <span className="material-icons-round text-slate-300">chevron_right</span>
            </button>
          </div>
          <button className="w-full mt-4 p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 group">
            <span className="material-icons-round text-primary text-xl">delete_outline</span>
            <span className="font-semibold text-primary">Clear all data</span>
          </button>
          <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-3 px-4 leading-normal">
            This action is permanent. All your mood logs, notes, and profile settings will be deleted.
          </p>
        </section>

        {/* Security */}
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 ml-1">Security</h2>
          <div className="bg-white dark:bg-card-dark rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-icons-round text-primary text-xl">fingerprint</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">App Lock</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Use Biometric or PIN</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer-checked:bg-primary transition-colors duration-200"></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-full shadow-sm"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Privacy Promise Link */}
        <div className="flex flex-col items-center justify-center gap-2">
          <button className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline decoration-2 underline-offset-4">
            <span className="material-icons-round text-lg">verified_user</span>
            Read our Privacy Promise
          </button>
          <div className="flex items-center gap-1.5 opacity-40 grayscale">
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Manasa Safe</span>
          </div>
        </div>
      </main>
    </div>
  );
}
