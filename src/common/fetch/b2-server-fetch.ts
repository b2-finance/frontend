/** @jest-environment node */
// See https://github.com/vercel/next.js/discussions/44270#discussioncomment-6576533

import fetchResponseHandler from './fetch-response-handler';
import { B2Response } from '@/app/api/types';
import { cookies } from 'next/headers';

/**
 * Performs a server-side fetch request to the B2 API.
 *
 * @param path The path after the B2 base url.
 * @param options {@link RequestInit}
 * @returns A {@link B2Response}.
 */
export default async function b2ServerFetch<T>(
  path: string,
  options?: RequestInit
): Promise<B2Response<T>> {
  const { headers, ...rest } = options ?? {};

  const res = await fetch(process.env.B2_ENDPOINT + path, {
    headers: {
      cookie: cookies().toString(),
      ...headers
    },
    ...rest
  });
  return await fetchResponseHandler<T>(res);
}
