'use client';

import bffB2Request from '@/app/bff-utils/b2/bff-b2-request';
import useUserContext from '../../user-context';
import { useEffect, useState } from 'react';

/**
 * Displays the first character of the user's username.
 *
 * @returns A JSX element.
 */
export default function ProfileMenuAvatar() {
  const { userId } = useUserContext();
  const [username, setUsername] = useState('');

  useEffect(() => {
    (async function () {
      const { data } = await bffB2Request({ path: '/users/' + userId });
      data && setUsername(data.username);
    })();
  }, [userId]);

  return <>{username?.charAt(0)}</>;
}
