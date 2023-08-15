import { NextURL } from 'next/dist/server/web/next-url';
import { BFF_API_B2 } from '../../paths';

/**
 * Converts a url created by the {@link bffB2Url} function to an actual url to the B2 API.
 *
 * @param nextUrl {@link NextURL}
 * @returns A url to the B2 API.
 */
export const b2Url = (nextUrl: NextURL): string => {
  return (
    process.env.B2_ENDPOINT +
    nextUrl.pathname.replace(BFF_API_B2, '') +
    '/' +
    decodeURIComponent(nextUrl.search.replace('?path=', ''))
  );
};

/**
 * Appends the given path as a query parameter named "path" on a url to the BFF endpoint.
 *
 * @example path: /users/1234 -> https://bff.com?path=/users/1234
 * @param path The target path on the B2 API.
 * @returns A url to the BFF endpoint.
 */
export const bffB2Url = (path: string): string => {
  return BFF_API_B2 + '?path=' + encodeURIComponent(path);
};
