import { B2Response } from '@/app/api/types';

/**
 * Handles the returned response from a fetch request.
 *
 * @param res A fetch response.
 * @returns A {@link B2Response}.
 * @throws Error when unable to parse the response data.
 */
export default async function fetchResponseHandler<T>(
  res: Response
): Promise<B2Response<T>> {
  let body: any;

  const contentType = res.headers?.get('content-type');

  if (contentType?.includes('application/json')) body = await res.json();
  else if (contentType?.includes('text')) body = await res.text();
  else {
    const message = `No handler for content-type ${contentType}.`;
    console.error(message);
    throw new Error(message);
  }

  if (!res.ok) {
    const { message } = body;
    return message && message.length
      ? { errors: typeof message === 'string' ? [message] : message }
      : { errors: [`Error fetching url ${res.url}`] };
  } else return { data: body };
}
