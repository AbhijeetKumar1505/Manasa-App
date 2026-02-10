import Link from 'next/link';

export default function GetStartedButton() {
  return (
    <div className="w-full space-y-4">
      <Link
        href="/signup"
        className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] text-lg text-center"
      >
        Get Started
      </Link>
      <div className="text-center">
        <Link href="/login" className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">
          Already have an account? Login
        </Link>
      </div>
    </div>
  )
}
