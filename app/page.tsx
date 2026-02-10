import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative h-screen w-full max-w-[430px] mx-auto overflow-hidden flex flex-col justify-between px-8 py-12 calm-gradient bg-background-light dark:bg-background-dark">
      {/* Top Decorative Element */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

      {/* Central Branding Area */}
      <div className="flex flex-col items-center justify-center flex-grow text-center z-10">
        <div className="relative mb-10 group">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-125"></div>
          <div className="relative w-32 h-32 bg-white dark:bg-card-dark rounded-full flex items-center justify-center shadow-xl shadow-primary/10">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="material-icons text-primary text-5xl">spa</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Manasa
          </h1>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
            A quiet space for your mind.
          </p>
        </div>
      </div>

      {/* Bottom Action & Footer Area */}
      <div className="w-full space-y-8 flex flex-col items-center z-10">
        <Link
          href="/home"
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] text-lg text-center"
        >
          Get Started
        </Link>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3 text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            <span>Private</span>
            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full"></span>
            <span>Anonymous</span>
            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full"></span>
            <span>Safe</span>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
    </div>
  );
}
