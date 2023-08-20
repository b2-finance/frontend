/** @jest-environment node */
// See https://github.com/vercel/next.js/discussions/44270#discussioncomment-6576533

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from '../../auth/auth-request';
import { b2Url } from './utils';

/**
 * Contains the data or errors returned from the B2 API, if any.
 */
export interface B2Response {
  data?: any;
  errors?: string[];
}

/**
 * Parameters for the {@link b2Request} function.
 */
export interface B2RequestParams {
  /**
   * The incoming request from the client.
   */
  request: NextRequest;
  /**
   * A default message logged if the request throws an error without a message.
   */
  defaultErrorMessage?: string;
}

/**
 * Sends an HTTP request to the B2 API at the given path.
 *
 * @param props {@link B2RequestParams}
 * @returns A {@link B2Response}.
 */
export async function b2Request({
  request,
  defaultErrorMessage = 'Error making request.'
}: B2RequestParams): Promise<NextResponse<B2Response>> {
  const { nextUrl, method, headers, body } = request;
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;

  const res = await fetch(b2Url(nextUrl), {
    cache: 'no-store', // TODO: Delete this, we should be caching data!
    method,
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...(body && { 'content-type': 'application/json' }),
      ...headers
    },
    ...(body && { body: JSON.stringify(await request.json()) })
  });

  let data: any;
  const contentType = res.headers?.get('content-type');

  if (contentType?.includes('application/json')) data = await res.json();
  else if (contentType?.includes('text')) data = await res.text();
  else data = undefined;

  let response: NextResponse<B2Response>;
  const { statusCode, message } = data ?? {};

  if (statusCode >= 400 || res.status >= 400) {
    console.error(message ?? defaultErrorMessage);
    response = NextResponse.json(
      {
        errors:
          typeof message === 'string'
            ? [message ?? defaultErrorMessage]
            : message?.length
            ? message
            : [defaultErrorMessage]
      },
      { status: statusCode ?? res.status }
    );
  } else {
    response = NextResponse.json(
      { data },
      { status: statusCode ?? res.status ?? 200 }
    );
  }
  return response;
}
