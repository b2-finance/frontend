/** @jest-environment node */
// See https://github.com/vercel/next.js/discussions/44270#discussioncomment-6576533

import { SESSION_ID_COOKIE } from '@/app/api/types';
import isLoggedInServer from './is-logged-in-server';

const mockCookiesHas = jest.fn();
jest.mock('next/headers', () => ({
  cookies: () => ({
    has: mockCookiesHas
  })
}));

describe(isLoggedInServer.name, () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return true if a session_id cookie is present', () => {
    mockCookiesHas.mockImplementation((key) =>
      key === SESSION_ID_COOKIE ? true : undefined
    );
    const isLoggedIn = isLoggedInServer();
    expect(isLoggedIn).toEqual(true);
  });

  it('should return false if a session_id cookie is not present', () => {
    mockCookiesHas.mockImplementation((key) =>
      key === SESSION_ID_COOKIE ? false : undefined
    );
    const isLoggedIn = isLoggedInServer();
    expect(isLoggedIn).toEqual(false);
  });
});
