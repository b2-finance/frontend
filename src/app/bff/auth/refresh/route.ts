export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { authRequest, AuthResponse, REFRESH_TOKEN } from '../auth-request';

export async function GET(
  request: NextRequest
): Promise<NextResponse<AuthResponse>> {
  const refreshToken = request.cookies?.get(REFRESH_TOKEN)?.value;
  return authRequest({
    path: '/refresh',
    method: 'GET',
    headers: { cookie: refreshToken },
    defaultErrorMessage: 'Error refreshing tokens.'
  });
}
