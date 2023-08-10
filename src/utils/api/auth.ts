import { SignInDto, SignUpDto } from '../types';

let access = {
  token: '',
  expiresAt: new Date(0)
};

/**
 * Gets the currently held access token.
 *
 * @returns An access token.
 */
export const getAccessToken = (): string => access.token;

/**
 * Contains the errors returned from the authorization request, if any.
 */
export interface AuthResponse {
  errors?: string[];
  status?: string;
}

/**
 * Parameters for the {@link authRequest} function.
 */
interface AuthRequestParams {
  /**
   * The url segment following the base url.
   *
   * @example Everything after `.com/` is the path: `https://www.example.com/this/is/the/path/with?query=params`
   */
  path: string;
  /**
   * The HTTP method.
   */
  method?: 'GET' | 'POST';
  /**
   * An object containing HTTP headers as keys, and the values of those headers as values.
   *
   * @example { 'Content-Type': 'application/json' }
   */
  headers?: any;
  /**
   * An object passed in the HTTP request body.
   *
   * @example { username: 'Joe', password: 'nun-ya-business' }
   */
  body?: any;
  /**
   * A default message logged if the request throws an error without a message.
   */
  defaultErrorMessage: string;
}

/**
 * Sends an HTTP request to the authorization server at the given path. If an access token
 * is returned in the server response, the corresponding variable is updated.
 *
 * @param params {@link AuthRequestParams}
 * @returns An {@link AuthResponse}.
 */
async function authRequest(params: AuthRequestParams): Promise<AuthResponse> {
  const { path, method, headers, body, defaultErrorMessage } = params;

  const res = await fetch('/auth' + path, {
    cache: 'no-store',
    ...(method && { method }),
    ...(headers && { headers }),
    ...(body && { body: JSON.stringify(body) })
  });

  try {
    const { accessToken, expiresIn, statusCode, message } = await res.json();

    if (statusCode >= 400) {
      return typeof message === 'string'
        ? { errors: [message ?? defaultErrorMessage] }
        : { errors: message.length > 0 ? message : [defaultErrorMessage] };
    }

    if (accessToken) {
      const expiresAt = new Date(new Date().getTime() + expiresIn * 1000);
      access = { token: accessToken, expiresAt };
    }
    return {};
  } catch (error) {
    return res.status < 400 ? {} : { errors: [defaultErrorMessage] };
  }
}

/**
 * Provides an interface to the authorization server.
 */
export const authApi: {
  /**
   * Registers a new user with the application.
   *
   * @param signUpDto {@link SignUpDto}
   * @returns An {@link AuthResponse}.
   */
  signup: (signUpDto: SignUpDto) => Promise<AuthResponse>;

  /**
   * Logs the user into the application.
   *
   * @param signInDto {@link SignInDto}
   * @returns An {@link AuthResponse}.
   */
  login: (signInDto: SignInDto) => Promise<AuthResponse>;

  /**
   * Logs the user out of the application.
   *
   * @returns An {@link AuthResponse}.
   */
  logout: () => Promise<AuthResponse>;

  /**
   * Obtains a new access and refresh token.
   *
   * @returns An {@link AuthResponse}.
   */
  refreshTokens: () => Promise<AuthResponse>;
} = {
  signup: async (signUpDto: SignUpDto): Promise<AuthResponse> => {
    return await authRequest({
      path: '/signup',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: signUpDto,
      defaultErrorMessage: 'Error registering new user.'
    });
  },

  login: async (signInDto: SignInDto): Promise<AuthResponse> => {
    return await authRequest({
      path: '/login',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: signInDto,
      defaultErrorMessage: 'Error logging in.'
    });
  },

  logout: async (): Promise<AuthResponse> => {
    return await authRequest({
      path: '/logout',
      method: 'GET',
      headers: {
        AUTHORIZATION: `Bearer ${access.token}`
      },
      defaultErrorMessage: 'Error signing out.'
    });
  },

  refreshTokens: async (): Promise<AuthResponse> => {
    return await authRequest({
      path: '/refresh',
      method: 'GET',
      defaultErrorMessage: 'Error refreshing tokens.'
    });
  }
};
