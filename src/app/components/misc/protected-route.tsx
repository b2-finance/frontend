'use client';

import { ReactNode } from 'react';
import useAppContext from '@/app/app-context';
import { default as LoginPage } from '@/app/(routes)/(noAuth)/login/page';

/**
 * A wrapper component that displays the login page when user accesses
 * a protected route while not logged in.
 *
 * @param props Children
 * @returns A JSX element.
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { authenticated } = useAppContext();

  if (!authenticated) return <LoginPage />;
  else return <>{children}</>;
}
