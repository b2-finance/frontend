'use client';

import { ReactNode, createContext, useContext } from 'react';

/**
 * Variables provided by {@link UserContext}.
 */
export interface UserContextType {
  userId: string;
  username: string;
}

/**
 * Context for the current user.
 */
export const UserContext = createContext<UserContextType>({
  userId: '',
  username: ''
});

/**
 * Props for the {@link UserContextProvider}.
 */
export interface UserContextProviderProps {
  children: ReactNode;
  userId: string;
}

/**
 * Context provider for the current user.
 *
 * @param props {@link UserContextProviderProps}
 * @returns A context provider.
 */
export function UserContextProvider({
  children,
  userId
}: UserContextProviderProps) {
  const username = ''; // TODO: get username from API

  return (
    <UserContext.Provider value={{ userId, username }}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * Returns the current state of {@link UserContext}.
 *
 * @returns A {@link UserContextType}.
 */
const useUserContext = () => useContext(UserContext);
export default useUserContext;
