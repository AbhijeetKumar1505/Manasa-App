import Link from 'next/link';
import MoodCheckIn from '@/components/MoodCheckIn';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const { data: profile } = await supabase.from('profiles').select('display_name').eq('id', user.id).single();
  const displayName = profile?.display_name || 'Friend';

  return (
    <div className="pb-24 relative overflow-x-hidden">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-primary/80 dark:text-primary/60 uppercase tracking-wider mb-1">
            Welcome back
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            Hey {displayName}, how are you feeling today?
          </h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-white dark:bg-card-dark flex items-center justify-center shadow-lg shadow-primary/10">
          <span className="material-icons-round text-slate-400">notifications</span>
        </button>
      </header>

      {/* Mood Check-In */}
      <section className="px-6 mb-8">
        <MoodCheckIn />
      </section>

      {/* Today's Support */}
      <section className="px-6 mb-8">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Today’s Support</h2>
        <div className="relative overflow-hidden bg-primary/10 dark:bg-primary/5 rounded-xl border border-primary/20 dark:border-primary/10 p-1">
          <div className="bg-white dark:bg-card-dark rounded-lg p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center text-primary">
              <span className="material-icons-round text-3xl">air</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 dark:text-white">2-minute breathing</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">A quick reset for your mind.</p>
            </div>
            <Link
              href="/hub/breathing"
              className="bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors active:scale-95"
            >
              Start
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Insight / Community Prompt */}
      <section className="px-6 mb-8">
        <div className="bg-midnight-blue rounded-xl p-6 relative overflow-hidden text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-icons-round text-primary text-sm">groups</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Community Whisper</span>
            </div>
            <p className="font-medium leading-relaxed">
              &quot;You are not alone in feeling this way. 42 others checked in as &apos;Meh&apos; today.&quot;
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
        </div>
      </section>

      {/* Gentle Nudge */}
      <section className="px-6 flex flex-col items-center py-4">
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
          <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-700"></span>
          <p className="text-sm italic font-medium">Gentle Nudge</p>
          <span className="w-8 h-[1px] bg-slate-200 dark:bg-slate-700"></span>
        </div>
        <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">Small steps still count.</p>
      </section>

      {/* Abstract Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-40 left-0 w-48 h-48 bg-primary/5 rounded-full -translate-x-1/2 blur-3xl pointer-events-none"></div>
    </div>
  );
}
