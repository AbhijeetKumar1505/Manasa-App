import Link from 'next/link';
import CreatePostForm from '@/components/feed/CreatePostForm';

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-card-dark flex flex-col">
      {/* Navigation Bar */}
      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/feed" className="text-slate-500 hover:text-primary transition-colors flex items-center">
          <span className="material-icons text-xl">close</span>
        </Link>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Safe Space</h1>
        <div className="w-6"></div> {/* Spacer for centering */}
      </header>

      <CreatePostForm />
    </div>
  );
}
