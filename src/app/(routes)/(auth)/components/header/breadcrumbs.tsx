'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { UserDto } from '@/app/api/types';
import b2ClientFetch from '@/common/fetch/b2-client-fetch';
import ChevronRightIcon from '@/common/icons/chevron-right-icon';

/**
 * Displays the segments of the current url path.
 *
 * @returns A JSX element.
 */
export default function Breadcrumbs() {
  const [username, setUsername] = useState<string>();
  const pathname = usePathname();

  useEffect(() => {
    const abort = new AbortController();

    (async function () {
      const res = await b2ClientFetch<UserDto>('/profile', {
        signal: abort.signal
      });
      res && res.data && setUsername(res.data.username);
    })();

    return () => abort.abort();
  }, []);

  return (
    <ul className="flex items-center text-xs">
      <li>{username}</li>
      {pathname
        ?.replace(/[-_]/, ' ')
        .split('/')
        .filter((x) => !!x.trim())
        .map((x) => (
          <li key={x} className="flex capitalize">
            <ChevronRightIcon className="w-3 h-3 mx-2 my-auto" />
            {x}
          </li>
        ))}
    </ul>
  );
}
