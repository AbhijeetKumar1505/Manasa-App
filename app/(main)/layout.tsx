import BottomNav from '@/components/BottomNav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <main className="flex-1 max-w-[430px] mx-auto w-full relative">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
