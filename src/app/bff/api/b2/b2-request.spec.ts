/** @jest-environment node */
// See https://github.com/vercel/next.js/discussions/44270#discussioncomment-6576533

import { NextRequest } from 'next/server';
import { b2Request } from './b2-request';

const BFF_URL = 'http://localhost:3000/bff/api/b2';

jest.mock('next/headers', () => ({
  cookies: () => ({
    get: jest.fn().mockReturnValue({ value: 'access_token' })
  })
}));

describe('b2Request', () => {
  let mockResponseJson: any;
  let mockResponseHeaders: any;

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: {
          get: () => mockResponseHeaders
        },
        json: () => mockResponseJson
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([['GET'], ['POST']])(
    'should return the fetched data when %s request succeeds',
    async (method: string) => {
      const data = 123;
      mockResponseJson = Promise.resolve(data);
      mockResponseHeaders = 'application/json';

      const req = new NextRequest(new Request(BFF_URL, { method }));
      const res = await b2Request({ request: req });

      const json = await res.json();
      expect(json).toEqual({ data });
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['DELETE']])(
    'should return the response status code when %s request succeeds',
    async (method: string) => {
      const data = 123;
      const statusCode = 399;

      mockResponseJson = Promise.resolve({ data, statusCode });
      mockResponseHeaders = 'application/json';

      const req = new NextRequest(new Request(BFF_URL, { method }));
      const res = await b2Request({ request: req });

      expect(res.status).toEqual(statusCode);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['DELETE']])(
    'should return the response status code when %s request fails',
    async (method: string) => {
      const statusCode = 599;

      mockResponseJson = Promise.resolve({ statusCode });
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const req = new NextRequest(new Request(BFF_URL, { method }));
      const res = await b2Request({ request: req });

      expect(res.status).toEqual(statusCode);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['DELETE']])(
    'should return the response error message when %s request fails',
    async (method: string) => {
      const statusCode = 400;
      const message = 'Error!';

      mockResponseJson = Promise.resolve({ statusCode, message });
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const req = new NextRequest(new Request(BFF_URL, { method }));
      const res = await b2Request({ request: req });

      const { errors } = await res.json();
      expect(errors).toEqual([message]);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['DELETE']])(
    'should return the default error message when %s request fails with no message',
    async (method: string) => {
      const statusCode = 400;
      const defaultErrorMessage = 'Default error!';

      mockResponseJson = Promise.resolve({ statusCode });
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const req = new NextRequest(new Request(BFF_URL, { method }));
      const res = await b2Request({ request: req, defaultErrorMessage });

      const { errors } = await res.json();
      expect(errors).toEqual([defaultErrorMessage]);
    }
  );
});
