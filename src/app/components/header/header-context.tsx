'use client';

import useAppContext from '@/app/app-context';
import routes from '@/utils/routes';
import { AuthMode, NavigationLinkProps } from '@/utils/types';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const ALL_NAV_LINKS: NavigationLinkProps[] = [
  { display: 'Home', href: routes.home, authMode: 'noAuth' },
  { display: 'Dashboard', href: routes.dashboard, authMode: 'auth' },
  { display: 'Ledger', href: routes.ledger, authMode: 'auth' },
  { display: 'Budget', href: routes.budget, authMode: 'auth' }
];

const ALL_PROFILE_LINKS: NavigationLinkProps[] = [
  { display: 'Profile', href: routes.profile, authMode: 'auth' },
  { display: 'Settings', href: routes.settings, authMode: 'auth' },
  { display: 'Logout', href: routes.logout, authMode: 'auth' }
];

/**
 * Determines if a link should render or not, depending on the user's
 * current authentication state.
 *
 * @param authMode The {@link AuthMode} on which to filter links.
 * @param authenticated True if the user is currently authenticated, or false otherwise.
 * @returns True if the link should render, or false otherwise.
 */
const shouldRender = (authMode: AuthMode, authenticated: boolean) => {
  switch (authMode) {
    case 'auth':
      return authenticated;
    case 'noAuth':
      return !authenticated;
    case 'both':
    default:
      return true;
  }
};

/**
 * Variables provided by {@link HeaderContext}.
 */
export interface HeaderContextType {
  navLinks: NavigationLinkProps[];
  profileLinks: NavigationLinkProps[];
}

/**
 * Context for the app header.
 */
export const HeaderContext = createContext<HeaderContextType>({
  navLinks: ALL_NAV_LINKS,
  profileLinks: ALL_PROFILE_LINKS
});

/**
 * Context provider for the header.
 *
 * @param props Children
 * @returns A context provider.
 */
export function HeaderContextProvider({ children }: { children: ReactNode }) {
  const { authenticated } = useAppContext();

  const [navLinks, setNavLinks] =
    useState<NavigationLinkProps[]>(ALL_NAV_LINKS);

  const [profileLinks, setProfileLinks] =
    useState<NavigationLinkProps[]>(ALL_PROFILE_LINKS);

  useEffect(() => {
    setNavLinks(
      ALL_NAV_LINKS?.filter(({ authMode }) =>
        shouldRender(authMode, authenticated)
      )
    );
    setProfileLinks(
      ALL_PROFILE_LINKS?.filter(({ authMode }) =>
        shouldRender(authMode, authenticated)
      )
    );
  }, [authenticated]);

  return (
    <HeaderContext.Provider value={{ navLinks, profileLinks }}>
      {children}
    </HeaderContext.Provider>
  );
}

/**
 * Returns the current state of {@link HeaderContext}.
 *
 * @returns A {@link HeaderContextType}.
 */
const useHeaderContext = () => useContext(HeaderContext);
export default useHeaderContext;
