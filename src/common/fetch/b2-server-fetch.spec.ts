/** @jest-environment node */
// See https://github.com/vercel/next.js/discussions/44270#discussioncomment-6576533

import b2ServerFetch from './b2-server-fetch';

const mockCookiesToString = jest.fn();
jest.mock('next/headers', () => ({
  cookies: () => ({
    toString: mockCookiesToString
  })
}));

jest.mock('./fetch-response-handler');

describe(b2ServerFetch.name, () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should add cookies to the %s fetch request',
    async (method: string) => {
      const cookie = 'session_id';
      mockCookiesToString.mockReturnValue(cookie);

      await b2ServerFetch('/foo', { method });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: { cookie },
          method
        })
      );
    }
  );
});
