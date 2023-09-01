import b2ClientFetch from '@/common/fetch/b2-client-fetch';
import { B2Response, LoginDto, UserDto } from '../types';

/**
 * Sends a login request to the B2 API.
 *
 * @param dto {@link LoginDto}
 * @returns A {@link B2Response} containing a {@link UserDto}.
 */
export default async function login(
  dto: LoginDto
): Promise<B2Response<UserDto>> {
  return await b2ClientFetch<UserDto>('/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(dto)
  });
}
