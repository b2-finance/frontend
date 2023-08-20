import { bffB2Url } from '@/app/bff/api/b2/utils';
import { refresh } from '../auth/auth-utils';

/**
 * Contains the data or errors returned from the B2 BFF request, if any.
 */
export interface BffResponse {
  data?: any;
  errors?: string[];
}

/**
 * Parameters for the {@link bffB2Request} function.
 */
export interface BffRequestParams {
  /**
   * The url segment following the base url.
   *
   * @example Everything after `.com/` is the path: `https://www.example.com/this/is/the/path/with?query=params`
   */
  path: string;
  /**
   * Options passed to the fetch request.
   */
  options?: RequestInit;
}

/**
 * Sends an HTTP request to the BFF B2 endpoint. If the API returns a 401
 * unauthorized response, a second attempt will be made after first attempting
 * to refresh the access token.
 *
 * @param props {@link BffRequestParams}
 * @returns A {@link BffResponse}.
 */
export default async function bffB2Request({
  path,
  options
}: BffRequestParams): Promise<BffResponse> {
  const { body } = options ?? {};
  let response: BffResponse = {};
  let attempts = 2;

  while (attempts-- > 0) {
    const res = await fetch(bffB2Url(path), {
      ...options,
      ...(body && { body: JSON.stringify(body) })
    });

    const { data, errors } = await res.json();

    if (errors) {
      console.error('B2 request error:', errors);

      if (attempts > 0 && res.status === 401) {
        console.log('Attempting to refresh tokens.');

        await refresh({
          onSuccess: () =>
            console.log('Tokens refreshed. Resubmitting request.'),
          onFail: () => {
            console.log('Failed to refresh tokens.');
            attempts = 0;
          }
        });
      } else {
        response = { errors };
        break;
      }
    } else {
      response = { data };
      break;
    }
  }
  return response;
}
