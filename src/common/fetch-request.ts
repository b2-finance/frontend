/**
 * Contains the data or errors returned from the fetch request, if any.
 */
export interface FetchResponse {
  data?: any;
  errors?: string[];
  status: number;
  [key: string]: any;
}

/**
 * Parameters passed to the fetch request.
 */
export interface FetchParams {
  url: string;
  options?: RequestInit;
}

/**
 * Performs a fetch request and returns the parsed data or errors.
 *
 * @param props {@link FetchParams}
 * @returns A {@link FetchResponse}.
 */
export default async function fetchRequest({
  url,
  options
}: FetchParams): Promise<FetchResponse> {
  const res = await fetch(url, options);

  const contentType = res.headers?.get('content-type');
  let body: any;

  if (contentType?.includes('application/json')) body = await res.json();
  else if (contentType?.includes('text')) body = await res.text();
  else body = undefined;

  if (typeof body === 'string') {
    return {
      data: body,
      status: res.status
    };
  } else {
    const { data, errors, ...rest } = body ?? {};

    return {
      ...(data && { data }),
      ...(errors && { errors }),
      status: res.status,
      ...rest
    };
  }
}
