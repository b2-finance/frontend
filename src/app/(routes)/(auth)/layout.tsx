import { ReactNode } from 'react';
import ProtectedRoute from './components/protected-route';
import SkipNav from './components/skip-nav';
import Header from './components/header/header';
import Breadcrumbs from './components/header/breadcrumbs';
import Navbar from './components/navbar/navbar';

export default function AppLayout({ children }: { children: ReactNode }) {
  const mainId = 'main-content';
  return (
    <ProtectedRoute>
      <SkipNav mainId={mainId} />
      <Header>
        <Breadcrumbs />
      </Header>
      <div className="grow basis-0 overflow-hidden flex">
        <Navbar />
        <main id={mainId} className="grow flex flex-col items-center">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
