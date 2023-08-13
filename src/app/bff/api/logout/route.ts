import { NextRequest, NextResponse } from 'next/server';
import {
  AuthResponse,
  ACCESS_TOKEN,
  ACCESS_TOKEN_PATH,
  REFRESH_TOKEN,
  REFRESH_TOKEN_PATH,
  USER_ID,
  USER_ID_PATH
} from '../../auth/auth-request';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest
): Promise<NextResponse<AuthResponse>> {
  const accessToken = request.cookies?.get(ACCESS_TOKEN)?.value;

  const res = await fetch(process.env.AUTH_ENDPOINT + '/logout', {
    cache: 'no-store',
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` }
  });

  if (res.status >= 400) {
    return NextResponse.json(
      { errors: ['Error logging out.'] },
      { status: res.status }
    );
  } else {
    deleteCookie(ACCESS_TOKEN, ACCESS_TOKEN_PATH);
    deleteCookie(REFRESH_TOKEN, REFRESH_TOKEN_PATH);
    deleteCookie(USER_ID, USER_ID_PATH);

    return NextResponse.json({}, { status: res.status });
  }
}

/**
 * Deletes the named cookie at the specified path.
 *
 * @param name The name of the cookie.
 * @param path The path of the cookie.
 */
const deleteCookie = (name: string, path: string): void => {
  cookies().set({
    name,
    value: '',
    path,
    maxAge: -1
  });
};
