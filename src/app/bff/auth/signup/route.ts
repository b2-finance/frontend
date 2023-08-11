import { NextRequest } from 'next/server';
import { authRequest } from '../auth-request';

export async function POST(request: NextRequest) {
  return authRequest({
    path: '/signup',
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: await request.json(),
    defaultErrorMessage: 'Error creating account.'
  });
}
