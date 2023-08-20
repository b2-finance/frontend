'use client';

import useUserContext from '../../user-context';
import { useEffect, useState } from 'react';
import userUtils from '@/app/bff-utils/b2/user-utils';

/**
 * Displays the first character of the user's username.
 *
 * @returns A JSX element.
 */
export default function ProfileMenuAvatar() {
  const { userId } = useUserContext();
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    const abort = new AbortController();

    (async function () {
      const { username } = await userUtils.getOne(userId, abort.signal);
      username && setUserInitial(username?.charAt(0));
    })();

    return () => abort.abort();
  }, [userId]);

  return <>{userInitial}</>;
}
