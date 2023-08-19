/** @jest-environment node */
// See https://github.com/vercel/next.js/discussions/44270#discussioncomment-6576533

import { USER_ID } from '@/app/bff/auth/auth-request';
import isLoggedInServer from './is-logged-in-server';

const mockCookiesHas = jest.fn();
jest.mock('next/headers', () => ({
  cookies: () => ({
    has: mockCookiesHas
  })
}));

describe('isLoggedInServer', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return true if a userId cookie is present', () => {
    mockCookiesHas.mockImplementation((key) =>
      key === USER_ID ? true : undefined
    );
    const isLoggedIn = isLoggedInServer();
    expect(isLoggedIn).toEqual(true);
  });

  it('should return false if a userId cookie is not present', () => {
    mockCookiesHas.mockImplementation((key) =>
      key === USER_ID ? false : undefined
    );
    const isLoggedIn = isLoggedInServer();
    expect(isLoggedIn).toEqual(false);
  });
});
