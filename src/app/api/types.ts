/**
 * The key/name of the session id cookie set by the B2 API.
 */
export const SESSION_ID_COOKIE = 'session_id';

/**
 * Contains the data or errors returned from the B2 request, if any.
 */
export interface B2Response<T> {
  data?: T;
  errors?: string[];
}

/**
 * Attributes required to register a new user with the application.
 */
export interface SignupDto {
  username: string;
  email: string;
  password: string;
}

/**
 * Credentials required to sign in to the application.
 */
export interface LoginDto {
  username: string;
  password: string;
}

/**
 * Represents an application user.
 */
export interface UserDto {
  id: string;
  username: string;
  email: string;
}
