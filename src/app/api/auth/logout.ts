import b2ClientFetch from '@/common/fetch/b2-client-fetch';
import { B2Response } from '../types';

/**
 * Sends a logout request to the B2 API.
 *
 * @returns A {@link B2Response} containing the result of the logout.
 */
export default async function logout(): Promise<B2Response<boolean>> {
  return await b2ClientFetch<boolean>('/auth/logout', { method: 'POST' });
}
