'use client';

import B2Icon from '@/common/icons/b2-icon';
import { logout } from '@/app/bff-utils/auth/auth-utils';
import routes from '@/common/routes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TIMER = 5;

/**
 * Displays a thank you message while logging the user out of the application.
 *
 * @returns A JSX element.
 */
export default function LogoutPage() {
  const router = useRouter();
  const [timer, setTimer] = useState(TIMER);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async function () {
      await logout({
        onSuccess: () => {
          setTimeout(() => router.push(routes.login), TIMER * 1000);
        },
        onFail: () => router.back()
      });
    })();
  }, []);

  return (
    <div className="flex flex-col p-8 items-center text-center">
      <B2Icon color="accent" />
      <h1 className="text-3xl font-bold my-8">Thanks for being square!</h1>
      <p>Redirecting to the login page in...</p>
      <span className="font-mono text-5xl mt-6">
        <span>{timer}</span>
      </span>
    </div>
  );
}
