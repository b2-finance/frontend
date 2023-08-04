'use client';

import { Access } from '@/utils/types';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

/**
 * Variables provided by {@link AppContext}.
 */
export interface AppContextType {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  access: Access;
  setAccess: Dispatch<SetStateAction<Access>>;
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

/**
 * Context for app-wide global state.
 */
export const AppContext = createContext<AppContextType>({
  userId: '',
  setUserId: () => {},
  access: { token: '', expiresAt: new Date(0) },
  setAccess: () => {},
  authenticated: false,
  setAuthenticated: () => {}
});

/**
 * Context provider for all global state.
 *
 * @param props Children
 * @returns A context provider.
 */
export function AppContextProvider({ children }: { children: ReactNode }) {
  const userIdKey = 'userId';
  const [userId, setUserId] = useState<string>('');
  useEffect(() => {
    localStorage.setItem(userIdKey, userId);
  }, [userId]);

  const authenticatedKey = 'authenticated';
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    localStorage.setItem(authenticatedKey, String(authenticated));
  }, [authenticated]);

  const [access, setAccess] = useState<Access>({
    token: '',
    expiresAt: new Date(0)
  });

  /*
    LocalStorage is not defined until page has been mounted on client.
    See https://developer.school/snippets/react/localstorage-is-not-defined-nextjs
  */
  useEffect(() => {
    setUserId(localStorage.getItem(userIdKey) ?? '');
    setAuthenticated(localStorage.getItem(authenticatedKey) === 'true');
  }, []);

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        access,
        setAccess,
        authenticated,
        setAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/**
 * Returns the current state of {@link AppContext}.
 *
 * @returns An {@link AppContextType}.
 */
const useAppContext = () => useContext(AppContext);
export default useAppContext;
