import fetchResponseHandler from './fetch-response-handler';
import { B2Response } from '@/app/api/types';

/**
 * Performs a client-side fetch request to the B2 API.
 *
 * @param path The path after the B2 base url.
 * @param options {@link RequestInit}
 * @returns A {@link B2Response}.
 */
export default async function b2ClientFetch<T>(
  path: string,
  options?: RequestInit
): Promise<B2Response<T>> {
  const res = await fetch('/api' + path, options);
  return await fetchResponseHandler<T>(res);
}
