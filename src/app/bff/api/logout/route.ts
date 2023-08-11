import { NextRequest, NextResponse } from 'next/server';
import {
  authRequest,
  AuthResponse,
  ACCESS_TOKEN_NAME
} from '../../auth/auth-request';

export async function GET(
  request: NextRequest
): Promise<NextResponse<AuthResponse>> {
  const accessToken = request.cookies?.get(ACCESS_TOKEN_NAME)?.value;
  return authRequest({
    path: '/logout',
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
    defaultErrorMessage: 'Error logging out.'
  });
}
