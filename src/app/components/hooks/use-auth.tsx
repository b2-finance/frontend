import useAppContext from '@/app/app-context';
import { SignInDto, SignUpDto } from '../../../utils/types';

/**
 * Functions to execute when an authentication request succeeds/fails.
 */
interface AuthResultHandler {
  onSuccess: () => void;
  onFail: (errors: string[]) => void;
}

/**
 * The return type of the {@link useAuth} hook.
 */
export interface AuthUtils {
  /**
   * Sends a signup request to the BFF server, then executes the applicable {@link AuthResultHandler} function.
   *
   * @param params {@link SignUpDto} & {@link AuthResultHandler}
   * @returns void
   */
  signup: (params: { dto: SignUpDto } & AuthResultHandler) => Promise<void>;
  /**
   * Sends a login request to the BFF server, then executes the applicable {@link AuthResultHandler} function.
   *
   * @param params {@link SignInDto} & {@link AuthResultHandler}
   * @returns void
   */
  login: (params: { dto: SignInDto } & AuthResultHandler) => Promise<void>;
  /**
   * Sends a logout request to the BFF server, then executes the applicable {@link AuthResultHandler} function.
   *
   * @param params {@link AuthResultHandler}
   * @returns void
   */
  logout: (params: AuthResultHandler) => Promise<void>;
  /**
   * Sends a token refresh request to the BFF server, then executes the applicable {@link AuthResultHandler} function.
   *
   * @param params {@link AuthResultHandler}
   * @returns void
   */
  refresh: (params: AuthResultHandler) => Promise<void>;
}

/**
 * Provides utility functions for handling authentication flow in the app.
 *
 * @returns An {@link AuthUtils}.
 */
export default function useAuth(): AuthUtils {
  const { authenticated, setAuthenticated, setUserId } = useAppContext();

  const signup = async ({
    dto,
    onSuccess,
    onFail
  }: { dto: SignUpDto } & AuthResultHandler): Promise<void> => {
    const res = await fetch('/bff/auth/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(dto)
    });
    const { errors } = await res.json();

    if (errors) onFail(errors);
    else {
      setAuthenticated(true);
      onSuccess();
    }
  };

  const login = async ({
    dto,
    onSuccess,
    onFail
  }: { dto: SignInDto } & AuthResultHandler): Promise<void> => {
    const res = await fetch('/bff/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(dto)
    });
    const { errors, userId } = await res.json();

    if (errors) onFail(errors);
    else {
      setUserId(userId);
      setAuthenticated(true);
      onSuccess();
    }
  };

  const logout = async ({
    onSuccess,
    onFail
  }: AuthResultHandler): Promise<void> => {
    const res = await fetch('/bff/api/logout');
    const { errors } = await res.json();

    if (errors) {
      console.log('Received error. Attempting to refresh tokens.');

      await refresh({
        onSuccess: () =>
          console.log('Refresh successful. Reattempting logout.'),

        onFail: (err) => {
          console.error(err);
          onFail(err);
          return;
        }
      });
    }
    setUserId('');
    setAuthenticated(false);
    onSuccess();
  };

  const refresh = async ({
    onSuccess,
    onFail
  }: AuthResultHandler): Promise<void> => {
    const res = await fetch('/bff/auth/refresh');
    const { errors } = await res.json();

    if (errors) onFail(errors);
    else {
      setAuthenticated(true);
      onSuccess();
    }
  };

  return { signup, login, logout, refresh };
}
