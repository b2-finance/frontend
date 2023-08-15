import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { USER_ID } from '@/app/bff/auth/auth-request';
import { default as LoginPage } from '@/app/(routes)/(noAuth)/login/page';
import { UserContextProvider } from '../context/user-context';

/**
 * A wrapper component that displays the login page when user accesses
 * a protected route while not logged in.
 *
 * @param props Children
 * @returns A JSX element.
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const userId = cookies().get(USER_ID)?.value;

  return userId ? (
    <UserContextProvider userId={userId}>{children}</UserContextProvider>
  ) : (
    <LoginPage />
  );
}
