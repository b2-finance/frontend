/** @jest-environment node */
// See https://github.com/vercel/next.js/discussions/44270#discussioncomment-6576533

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const REFRESH_TOKEN_NAME = 'refresh_token';
export const ACCESS_TOKEN_NAME = 'access_token';

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

  try {
    const { userId, accessToken, expiresIn, statusCode, message } =
      await res.json();

    if (statusCode >= 400 || res.status >= 400) {
      console.error(message ?? defaultErrorMessage);
      response = NextResponse.json(
        {
          errors:
            typeof message !== 'string' && message?.length
              ? message
              : [message ?? defaultErrorMessage]
        },
        { status: statusCode ?? res.status }
      );
    } else {
      accessToken &&
        cookies().set({
          name: ACCESS_TOKEN_NAME,
          value: accessToken,
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/bff/api',
          expires: new Date(new Date().getTime() + expiresIn * 1000)
        });

      const refreshToken = res.headers?.get('set-cookie');
      refreshToken &&
        cookies().set({
          name: REFRESH_TOKEN_NAME,
          value: refreshToken,
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/bff/auth/refresh'
        });

      response = NextResponse.json(
        { userId },
        { status: statusCode ?? res.status ?? 200 }
      );
    }
  } catch (error) {
    if (res.status < 400)
      response = NextResponse.json({}, { status: res.status });
    else {
      console.error(error);
      response = NextResponse.json(
        { errors: [defaultErrorMessage] },
        { status: res.status ?? 500 }
      );
    }
  }
  return response;
}
