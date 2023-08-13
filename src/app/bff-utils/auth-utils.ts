'use client';

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
 * Functions to execute when an authentication request succeeds/fails.
 */
export interface AuthResultHandler {
  onSuccess: () => void;
  onFail: (errors: string[]) => void;
}

/**
 * Sends a signup request to the BFF server, then executes the applicable {@link AuthResultHandler} function.
 *
 * @param params {@link SignUpDto} & {@link AuthResultHandler}
 * @returns void
 */
export const signup = async ({
  dto,
  onSuccess,
  onFail
}: { dto: SignUpDto } & AuthResultHandler): Promise<void> => {
  const res = await fetch('/bff/auth/signup', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(dto)
  });
  const { errors } = await res.json();

  if (errors) onFail(errors);
  else onSuccess();
};

/**
 * Sends a login request to the BFF server, then executes the applicable {@link AuthResultHandler} function.
 *
 * @param params {@link SignInDto} & {@link AuthResultHandler}
 * @returns void
 */
export const login = async ({
  dto,
  onSuccess,
  onFail
}: { dto: SignInDto } & AuthResultHandler): Promise<void> => {
  const res = await fetch('/bff/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(dto)
  });
  const { errors } = await res.json();

  if (errors) onFail(errors);
  else onSuccess();
};

/**
 * Sends a logout request to the BFF server, then executes the applicable {@link AuthResultHandler} function.
 *
 * @param params {@link AuthResultHandler}
 * @returns void
 */
export const logout = async ({
  onSuccess,
  onFail
}: AuthResultHandler): Promise<void> => {
  const res = await fetch('/bff/api/logout');
  const { errors } = await res.json();

  if (errors) {
    console.log('Received error. Attempting to refresh tokens.');

    await refresh({
      onSuccess: () => console.log('Refresh successful. Reattempting logout.'),

      onFail: (err) => {
        console.error(err);
        onFail(err);
        return;
      }
    });
  }
  onSuccess();
};

/**
 * Sends a token refresh request to the BFF server, then executes the applicable {@link AuthResultHandler} function.
 *
 * @param params {@link AuthResultHandler}
 * @returns void
 */
export const refresh = async ({
  onSuccess,
  onFail
}: AuthResultHandler): Promise<void> => {
  const res = await fetch('/bff/auth/refresh');
  const { errors } = await res.json();

  if (errors) onFail(errors);
  else onSuccess();
};
