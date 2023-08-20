import { NextRequest } from 'next/server';
import { b2Request } from './b2-request';

export async function POST(request: NextRequest) {
  return await b2Request({ request });
}

export async function GET(request: NextRequest) {
  return await b2Request({ request });
}

export async function PATCH(request: NextRequest) {
  return await b2Request({ request });
}

export async function DELETE(request: NextRequest) {
  return await b2Request({ request });
}
