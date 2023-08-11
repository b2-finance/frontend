import { ReactNode } from 'react';
import SkipNav from '@/app/components/misc/skip-nav';
import Header from '../../components/header/header';

export default function AppLayout({ children }: { children: ReactNode }) {
  const mainId = 'main-content';
  return (
    <>
      <SkipNav mainId={mainId} />
      <Header />
      <main id={mainId} className="flex flex-col items-center">
        {children}
      </main>
    </>
  );
}
