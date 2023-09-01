import b2ServerFetch from '@/common/fetch/b2-server-fetch';
import { UserDto } from '@/app/api/types';

/**
 * Displays the first character of the user's username.
 *
 * @returns A JSX element.
 */
export default async function ProfileMenuAvatar() {
  const { data: user } = await b2ServerFetch<UserDto>('/profile');
  return <>{user?.username?.charAt(0)}</>;
}
