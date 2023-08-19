/** @jest-environment node */
// See https://github.com/vercel/next.js/discussions/44270#discussioncomment-6576533

import { USER_ID } from '@/app/bff/auth/auth-request';
import { cookies } from 'next/headers';

/**
 * A server side function for checking if the user is logged in.
 *
 * @returns True if the user is logged in, or false otherwise.
 */
export default function isLoggedInServer() {
  return cookies().has(USER_ID);
}
