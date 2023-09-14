import { ReactNode } from 'react';
import ProtectedRoute from './components/protected-route';
import SkipNav from './components/skip-nav';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';

export default function AppLayout({ children }: { children: ReactNode }) {
  const mainId = 'main-content';
  return (
    <ProtectedRoute>
      <SkipNav mainId={mainId} />
      <Header />
      <div className="grow basis-0 overflow-hidden flex">
        <Sidebar />
        <main id={mainId} className="grow flex flex-col items-center">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
