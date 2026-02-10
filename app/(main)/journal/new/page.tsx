import NewEntryForm from '@/components/journal/NewEntryForm';

export default function NewJournalEntryPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-card-dark flex flex-col pb-24">
      {/* Header */}
      <header className="pt-8 pb-4 px-6 flex flex-col items-center gap-2">
        <div className="w-12 h-1 bg-primary/10 rounded-full mb-2"></div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">What&apos;s on your mind?</h1>
        <p className="text-sm text-slate-400 dark:text-slate-500">Your safe space for reflection</p>
      </header>

      <NewEntryForm />
    </div>
  );
}
