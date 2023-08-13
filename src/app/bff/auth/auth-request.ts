/** @jest-environment node */
// See https://github.com/vercel/next.js/discussions/44270#discussioncomment-6576533

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const ACCESS_TOKEN = 'access_token';
export const ACCESS_TOKEN_PATH = '/bff/api';

export const REFRESH_TOKEN = 'refresh_token';
export const REFRESH_TOKEN_PATH = '/bff/auth/refresh';

export const USER_ID = 'user_id';
export const USER_ID_PATH = '/';

/**
 * Contains the errors returned from the authorization request, if any,
 * and the userId if returned from the server.
 */
export interface AuthResponse {
  errors?: string[];
  userId?: string;
}

/**
 * Parameters for the {@link authRequest} function.
 */
interface AuthRequestParams {
  /**
   * The url segment following the base url.
   *
   * @example Everything after `.com/` is the path: `https://www.example.com/this/is/the/path/with?query=params`
   */
  path: string;
  /**
   * The HTTP method.
   */
  method?: 'GET' | 'POST';
  /**
   * An object containing HTTP headers as keys, and the values of those headers as values.
   *
   * @example { 'Content-Type': 'application/json' }
   */
  headers?: any;
  /**
   * An object passed in the HTTP request body.
   *
   * @example { username: 'Joe', password: 'nun-ya-business' }
   */
  body?: any;
  /**
   * A default message logged if the request throws an error without a message.
   */
  defaultErrorMessage: string;
}

/**
 * Sends an HTTP request to the authorization server at the given path.
 * Access and refresh tokens are set as HTTP only cookies in the client.
 *
 * @param params {@link AuthRequestParams}
 * @returns An {@link AuthResponse}.
 */
export async function authRequest({
  path,
  method,
  headers,
  body,
  defaultErrorMessage
}: AuthRequestParams): Promise<NextResponse<AuthResponse>> {
  const res = await fetch(process.env.AUTH_ENDPOINT + path, {
    cache: 'no-store',
    ...(method && { method }),
    ...(headers && { headers }),
    ...(body && { body: JSON.stringify(body) })
  });
  let response: NextResponse<AuthResponse>;

  const { userId, accessToken, expiresIn, statusCode, message } =
    await res.json();

  if (statusCode >= 400 || res.status >= 400) {
    console.error(message ?? defaultErrorMessage);
    response = NextResponse.json(
      {
        errors:
          typeof message === 'string'
            ? [message ?? defaultErrorMessage]
            : message?.length
            ? message
            : [defaultErrorMessage]
      },
      { status: statusCode ?? res.status }
    );
  } else {
    if (accessToken) {
      setCookie(
        ACCESS_TOKEN,
        accessToken,
        ACCESS_TOKEN_PATH,
        new Date(new Date().getTime() + expiresIn * 1000)
      );
    }

    const refreshToken = res.headers?.get('set-cookie');

    if (refreshToken) {
      const refreshExpires = refreshToken
        .split(';')
        .find((x) => x.toLowerCase().includes('expires='))
        ?.toLowerCase()
        .trim()
        .replace('expires=', '');

      const expires = refreshExpires
        ? new Date(refreshExpires)
        : new Date(new Date().getTime() + expiresIn * 1000);

      setCookie(REFRESH_TOKEN, refreshToken, REFRESH_TOKEN_PATH, expires);
      userId && setCookie(USER_ID, userId, USER_ID_PATH, expires);
    }

    response = NextResponse.json(
      { userId },
      { status: statusCode ?? res.status ?? 200 }
    );
  }
  return response;
}

/**
 * Sets a cookie on the browser with the following attributes:
 * HttpOnly, Secure, SameSite=strict.
 *
 * @param name The name (key) of the cookie.
 * @param value The value of the cookie.
 * @param path The path for which the browser shall send the cookie.
 * @param expires The expiration date of the cookie.
 */
const setCookie = (
  name: string,
  value: string,
  path: string,
  expires: Date
): void => {
  cookies().set({
    name,
    value,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path,
    expires
  });
};
