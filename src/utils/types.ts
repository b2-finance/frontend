/**
 * Attributes required to register a new user with the application.
 */
export interface SignUpDto {
  username: string;
  email: string;
  password: string;
}

/**
 * Credentials required to sign into the application.
 */
export interface SignInDto {
  username: string;
  password: string;
}
