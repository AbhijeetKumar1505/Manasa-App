import Link from 'next/link';

export default function SOSPage() {
  return (
    <div className="min-h-screen pb-32 px-6">
      {/* Header */}
      <header className="flex items-center justify-between py-4">
        <Link href="/home" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">
          <span className="material-icons-round">arrow_back_ios_new</span>
        </Link>
        <button className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm">
          Safety Exit
        </button>
      </header>

      {/* Hero Title */}
      <div className="mt-8 mb-10 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-primary/10 rounded-full">
          <span className="material-icons-round text-primary text-4xl">favorite</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">You&apos;re not alone</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-[280px] mx-auto">
          If you&apos;re in danger, please reach out immediately.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-1 gap-4 mb-10">
        {/* Call Helpline Card */}
        <button className="group relative flex items-center p-6 bg-primary rounded-xl shadow-lg shadow-primary/25 transition-transform active:scale-[0.98]">
          <div className="flex-1 text-left">
            <span className="inline-block px-2 py-0.5 bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider rounded mb-2">Available 24/7</span>
            <h2 className="text-white text-xl font-bold">Call Helpline</h2>
            <p className="text-white/80 text-sm mt-1">Talk to a trained counselor now</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
            <span className="material-icons-round text-3xl">call</span>
          </div>
        </button>

        {/* Text Support Card */}
        <button className="group relative flex items-center p-6 bg-white dark:bg-slate-800/50 border-2 border-primary/20 rounded-xl shadow-sm transition-transform active:scale-[0.98]">
          <div className="flex-1 text-left">
            <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded mb-2">Discreet & Anonymous</span>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold">Text Support</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Chat privately via message</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <span className="material-icons-round text-3xl">chat_bubble</span>
          </div>
        </button>
      </div>

      {/* Local Resources List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Verified Student Helplines</h3>
          <span className="text-xs font-bold text-primary uppercase tracking-widest">India Only</span>
        </div>
        <div className="space-y-4">
          <ResourceItem
            icon="school"
            title="Vandrevala Foundation"
            desc="Free mental health support for students facing academic stress or trauma."
            phone="999-999-9999"
          />
          <ResourceItem
            icon="psychology"
            title="iCall (TISS)"
            desc="Professional counseling by Tata Institute of Social Sciences."
            phone="022-25521111"
          />
          <ResourceItem
            icon="verified_user"
            title="Aasra Helpline"
            desc="24-hour crisis intervention for those in deep distress or contemplating self-harm."
            phone="9820466726"
          />
        </div>
      </div>

      {/* Support Banner */}
      <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
        <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-2">Feeling overwhelmed?</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          It&apos;s okay to feel this way. These services are completely confidential and won&apos;t appear on your phone bill or college records.
        </p>
      </div>
    </div>
  );
}

function ResourceItem({ icon, title, desc, phone }: { icon: string, title: string, desc: string, phone: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
      <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
        <span className="material-icons-round text-primary">{icon}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">{desc}</p>
        <div className="mt-3 flex items-center gap-4">
          <a href={`tel:${phone.replace(/-/g, '')}`} className="text-xs font-bold text-primary flex items-center gap-1">
            <span className="material-icons-round text-[14px]">phone</span> Call {phone}
          </a>
        </div>
      </div>
    </div>
  );
}
