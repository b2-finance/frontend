import { NextRequest, NextResponse } from 'next/server';
import { authRequest, AuthResponse } from '../auth-request';

export async function POST(
  request: NextRequest
): Promise<NextResponse<AuthResponse>> {
  return authRequest({
    path: '/login',
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: await request.json(),
    defaultErrorMessage: 'Error logging in.'
  });
}
