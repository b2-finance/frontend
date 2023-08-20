'use client';

import { BFF_API, BFF_AUTH } from '../../bff/paths';
import { ResultHandler } from '../utils';

/**
 * Attributes required to register a new user with the application.
 */
export interface SignUpDto {
  username: string;
  email: string;
  password: string;
}

/**
 * Credentials required to sign into the application.
 */
export interface SignInDto {
  username: string;
  password: string;
}

/**
 * Sends a signup request to the BFF server, then executes the applicable {@link ResultHandler} function.
 *
 * @param params {@link SignUpDto} & {@link ResultHandler}
 * @returns void
 */
export const signup = async ({
  dto,
  onSuccess,
  onFail
}: { dto: SignUpDto } & ResultHandler): Promise<void> => {
  const res = await fetch(BFF_AUTH + '/signup', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(dto)
  });
  const { errors } = await res.json();

  if (errors) onFail(errors);
  else onSuccess();
};

/**
 * Sends a login request to the BFF server, then executes the applicable {@link ResultHandler} function.
 *
 * @param params {@link SignInDto} & {@link ResultHandler}
 * @returns void
 */
export const login = async ({
  dto,
  onSuccess,
  onFail
}: { dto: SignInDto } & ResultHandler): Promise<void> => {
  const res = await fetch(BFF_AUTH + '/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(dto)
  });
  const { errors } = await res.json();

  if (errors) onFail(errors);
  else onSuccess();
};

/**
 * Sends a logout request to the BFF server, then executes the applicable {@link ResultHandler} function.
 *
 * @param params {@link ResultHandler}
 * @returns void
 */
export const logout = async ({
  onSuccess,
  onFail
}: ResultHandler): Promise<void> => {
  const attemptLogout = async () => {
    const res = await fetch(BFF_API + '/logout');
    return await res.json();
  };
  const { errors } = await attemptLogout();

  let retry = false;

  if (errors) {
    console.log('Received error. Attempting to refresh tokens.');

    await refresh({
      onSuccess: () => {
        console.log('Refresh successful. Reattempting logout.');
        retry = true;
      },
      onFail: (err) => {
        console.error(err);
        onFail(err);
      }
    });
  } else {
    onSuccess();
    return;
  }

  if (retry) {
    const { errors: err } = await attemptLogout();
    if (err) onFail(err);
    else onSuccess();
  }
};

/**
 * Sends a token refresh request to the BFF server, then executes the applicable {@link ResultHandler} function.
 *
 * @param params {@link ResultHandler}
 * @returns void
 */
export const refresh = async ({
  onSuccess,
  onFail
}: ResultHandler): Promise<void> => {
  const res = await fetch(BFF_AUTH + '/refresh');
  const { errors } = await res.json();

  if (errors) onFail(errors);
  else onSuccess();
};
