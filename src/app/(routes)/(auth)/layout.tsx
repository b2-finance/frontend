import { ReactNode } from 'react';
import ProtectedRoute from './components/protected-route';
import SkipNav from './components/skip-nav';
import Header from './components/header/header';

export default function AppLayout({ children }: { children: ReactNode }) {
  const mainId = 'main-content';
  return (
    <ProtectedRoute>
      <SkipNav mainId={mainId} />
      <Header />
      <main id={mainId} className="flex flex-col items-center">
        {children}
      </main>
    </ProtectedRoute>
  );
}
