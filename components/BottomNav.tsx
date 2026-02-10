'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/home', icon: 'home', label: 'Home' },
  { href: '/hub', icon: 'grid_view', label: 'Hub' },
  { href: '/journal', icon: 'edit_note', label: 'Journal' },
  { href: '/feed', icon: 'forum', label: 'Talk' },
  { href: '/profile', icon: 'person_outline', label: 'Me' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex justify-between items-center z-50 pb-8">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary'
            }`}
          >
            <span className="material-icons-round text-2xl">{item.icon}</span>
            <span className="text-[10px] font-bold mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
