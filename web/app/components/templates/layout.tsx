import type { ReactElement } from 'react';
import { Header } from '~/components/organisms/header';

interface LayoutProps {
  children: ReactElement | ReactElement[];
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={`bg-white dark:bg-black flex flex-col min-h-screen`}>
      <Header />
      <main className="h-full">{children}</main>
      <footer className="mt-auto py-2 lg:py-6">
        <p className="text-slate-600 dark:text-slate-400 text-center font-heading text-xs">
          <>© Copyright {new Date().getFullYear()} Max Karlsson</>
        </p>
      </footer>
    </div>
  );
}
