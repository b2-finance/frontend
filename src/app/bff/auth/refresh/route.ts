import { NextRequest } from 'next/server';
import { authRequest, REFRESH_TOKEN_NAME } from '../auth-request';

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies?.get(REFRESH_TOKEN_NAME)?.value;
  return authRequest({
    path: '/refresh',
    method: 'GET',
    headers: { cookie: refreshToken },
    defaultErrorMessage: 'Error refreshing tokens.'
  });
}
