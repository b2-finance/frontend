import useAppContext from '@/app/app-context';
import { SignInDto, SignUpDto } from '../types';
import { authApi } from '../api/auth';

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
   * Sends a signup request to the authorization server, then executes the applicable {@link AuthResultHandler} function.
   *
   * @param params {@link SignUpDto} & {@link AuthResultHandler}
   * @returns void
   */
  signup: (params: { dto: SignUpDto } & AuthResultHandler) => Promise<void>;
  /**
   * Sends a login request to the authorization server, then executes the applicable {@link AuthResultHandler} function.
   *
   * @param params {@link SignInDto} & {@link AuthResultHandler}
   * @returns void
   */
  login: (params: { dto: SignInDto } & AuthResultHandler) => Promise<void>;
  /**
   * Sends a logout request to the authorization server, then executes the applicable {@link AuthResultHandler} function.
   *
   * @param params {@link AuthResultHandler}
   * @returns void
   */
  logout: (params: AuthResultHandler) => Promise<void>;
}

/**
 * Provides utility functions for handling authentication flow in the app.
 *
 * @returns An {@link AuthUtils}.
 */
export default function useAuth(): AuthUtils {
  const { setAuthenticated } = useAppContext();

  const signup = async ({
    dto,
    onSuccess,
    onFail
  }: { dto: SignUpDto } & AuthResultHandler): Promise<void> => {
    const { errors } = await authApi.signUp(dto);

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
    const { errors } = await authApi.login(dto);

    if (errors) onFail(errors);
    else {
      setAuthenticated(true);
      onSuccess();
    }
  };

  const logout = async ({
    onSuccess,
    onFail
  }: AuthResultHandler): Promise<void> => {
    const { errors } = await authApi.logout();

    if (errors) onFail(errors);
    else {
      setAuthenticated(false);
      onSuccess();
    }
  };

  return { signup, login, logout };
}
