import { SignInDto, SignUpDto } from '../types';
import { authApi } from './auth';

describe('authApi', () => {
  let mockFetch: any;

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => mockFetch
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('signup', () => {
    let mockSignUpDto: SignUpDto;

    beforeEach(() => {
      mockSignUpDto = {
        email: 'usrname@email.com',
        username: 'username',
        password: 'password'
      };
    });

    it('should return an empty object when signup succeeds', async () => {
      mockFetch = Promise.resolve({ statusCode: 200 });
      const res = await authApi.signup(mockSignUpDto);
      expect(res).toEqual({});
    });

    it('should return the default error message when signup fails with no message', async () => {
      mockFetch = Promise.resolve({ statusCode: 401 });
      const res = await authApi.signup(mockSignUpDto);
      expect(res).toEqual({ errors: ['Error registering new user.'] });
    });

    it('should return the expected error message when signup fails with a message', async () => {
      const message = 'User already exists.';
      mockFetch = Promise.resolve({ statusCode: 401, message });
      const res = await authApi.signup(mockSignUpDto);
      expect(res).toEqual({ errors: [message] });
    });
  });

  describe('login', () => {
    let mockSignInDto: SignInDto;

    beforeEach(() => {
      mockSignInDto = {
        username: 'username',
        password: 'password'
      };
    });

    it('should return an empty object when login succeeds', async () => {
      mockFetch = Promise.resolve({ statusCode: 200 });
      const res = await authApi.login(mockSignInDto);
      expect(res).toEqual({});
    });

    it('should return the default error message when login fails with no message', async () => {
      mockFetch = Promise.resolve({ statusCode: 400 });
      const res = await authApi.login(mockSignInDto);
      expect(res).toEqual({ errors: ['Error logging in.'] });
    });

    it('should return the expected error message when login fails with a message', async () => {
      const message = 'Invalid credentials.';
      mockFetch = Promise.resolve({ statusCode: 400, message });
      const res = await authApi.login(mockSignInDto);
      expect(res).toEqual({ errors: [message] });
    });
  });

  describe('logout', () => {
    it('should return an empty object when logout succeeds', async () => {
      mockFetch = Promise.resolve({ statusCode: 200 });
      const res = await authApi.logout();
      expect(res).toEqual({});
    });

    it('should return the default error message when logout fails with no message', async () => {
      mockFetch = Promise.resolve({ statusCode: 400 });
      const res = await authApi.logout();
      expect(res).toEqual({ errors: ['Error logging out.'] });
    });

    it('should return the expected error message when logout fails with a message', async () => {
      const message = 'Unauthorized.';
      mockFetch = Promise.resolve({ statusCode: 400, message });
      const res = await authApi.logout();
      expect(res).toEqual({ errors: [message] });
    });
  });

  describe('refreshTokens', () => {
    it('should return an empty object when refreshTokens succeeds', async () => {
      mockFetch = Promise.resolve({ statusCode: 200 });
      const res = await authApi.refreshTokens();
      expect(res).toEqual({});
    });

    it('should return the default error message when refreshTokens fails with no message', async () => {
      mockFetch = Promise.resolve({ statusCode: 400 });
      const res = await authApi.refreshTokens();
      expect(res).toEqual({ errors: ['Error refreshing tokens.'] });
    });

    it('should return the expected error message when refreshTokens fails with a message', async () => {
      const message = 'Unauthorized.';
      mockFetch = Promise.resolve({ statusCode: 400, message });
      const res = await authApi.refreshTokens();
      expect(res).toEqual({ errors: [message] });
    });
  });
});
