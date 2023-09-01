import { ReactNode } from 'react';
import isLoggedInServer from './functions/is-logged-in-server';
import LoginPage from '@/app/(routes)/(noAuth)/login/page';

/**
 * A wrapper component that displays the login page when user accesses
 * a protected route while not logged in.
 *
 * @param props Children
 * @returns A JSX element.
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  return isLoggedInServer() ? <>{children}</> : <LoginPage />;
}
