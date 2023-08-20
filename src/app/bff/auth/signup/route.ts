import { NextRequest, NextResponse } from 'next/server';
import { authRequest, AuthResponse } from '../auth-request';

export async function POST(
  request: NextRequest
): Promise<NextResponse<AuthResponse>> {
  return authRequest({
    path: '/signup',
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: await request.json(),
    defaultErrorMessage: 'Error creating account.'
  });
}
