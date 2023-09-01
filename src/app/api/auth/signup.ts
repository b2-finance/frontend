import b2ClientFetch from '@/common/fetch/b2-client-fetch';
import { B2Response, SignupDto, UserDto } from '../types';

/**
 * Sends a signup request to the B2 API.
 *
 * @param dto {@link SignupDto}
 * @returns A {@link B2Response} containing a {@link UserDto}.
 */
export default async function signup(
  dto: SignupDto
): Promise<B2Response<UserDto>> {
  return await b2ClientFetch<UserDto>('/auth/signup', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(dto)
  });
}
