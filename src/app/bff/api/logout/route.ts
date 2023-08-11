import { NextRequest } from 'next/server';
import { authRequest, ACCESS_TOKEN_NAME } from '../../auth/auth-request';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies?.get(ACCESS_TOKEN_NAME)?.value;
  return authRequest({
    path: '/logout',
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
    defaultErrorMessage: 'Error logging out.'
  });
}
