/** @jest-environment node */
// See https://github.com/vercel/next.js/discussions/44270#discussioncomment-6576533

import { authRequest } from './auth-request';

const mockJson = jest.fn();

describe('authRequest', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: mockJson
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([['GET'], ['POST']])(
    'should return empty object when %s request succeeds',
    async (method: string) => {
      mockJson.mockResolvedValue({ statusCode: 200 });

      const res = await authRequest({
        path: '/xyz',
        method: method as 'GET' | 'POST',
        headers: { 'content-type': 'application/json' },
        body: { username: 'joe' },
        defaultErrorMessage: 'Error making request.'
      });

      const json = await res.json();
      expect(json).toEqual({});
    }
  );

  it.each([['GET'], ['POST']])(
    'should return the response status code when %s request succeeds',
    async (method: string) => {
      const statusCode = 399;
      mockJson.mockResolvedValue({ statusCode });

      const res = await authRequest({
        path: '/xyz',
        method: method as 'GET' | 'POST',
        headers: { 'content-type': 'application/json' },
        body: { username: 'joe' },
        defaultErrorMessage: 'Error making request.'
      });

      expect(res.status).toEqual(statusCode);
    }
  );

  it.each([['GET'], ['POST']])(
    'should return the response error message when %s request fails',
    async (method: string) => {
      const statusCode = 400;
      const message = 'Error message.';
      mockJson.mockResolvedValue({ statusCode, message });
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const res = await authRequest({
        path: '/xyz',
        method: method as 'GET' | 'POST',
        headers: { 'content-type': 'application/json' },
        body: { username: 'joe' },
        defaultErrorMessage: 'Error making request.'
      });

      const json = await res.json();
      expect(json).toEqual({ errors: [message] });
    }
  );

  it.each([['GET'], ['POST']])(
    'should return the default error message when %s request fails with no message',
    async (method: string) => {
      const statusCode = 400;
      const defaultErrorMessage = 'Error making request.';
      mockJson.mockResolvedValue({ statusCode });
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const res = await authRequest({
        path: '/xyz',
        method: method as 'GET' | 'POST',
        headers: { 'content-type': 'application/json' },
        body: { username: 'joe' },
        defaultErrorMessage
      });

      const json = await res.json();
      expect(json).toEqual({ errors: [defaultErrorMessage] });
    }
  );

  it.each([['GET'], ['POST']])(
    'should return the response status code when %s request fails',
    async (method: string) => {
      const statusCode = 599;
      mockJson.mockResolvedValue({ statusCode });
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const res = await authRequest({
        path: '/xyz',
        method: method as 'GET' | 'POST',
        headers: { 'content-type': 'application/json' },
        body: { username: 'joe' },
        defaultErrorMessage: 'Error making request.'
      });

      expect(res.status).toEqual(statusCode);
    }
  );
});
