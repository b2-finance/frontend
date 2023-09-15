import { ReactNode } from 'react';
import ProfileMenu from './menus/profile-menu';
import { AuthMode, HeaderLinkProps } from './types';
import routes from '@/common/routes';
import isLoggedInServer from '../functions/is-logged-in-server';

export const PROFILE_LINKS: HeaderLinkProps[] = [
  { display: 'Profile', href: routes.profile, authMode: 'auth' },
  { display: 'Settings', href: routes.settings, authMode: 'auth' },
  { display: 'Log Out', href: routes.logout, authMode: 'auth' }
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
 * The application header bar.
 *
 * @param props Children
 * @returns A JSX element.
 */
export default function Header({ children }: { children?: ReactNode }) {
  const isAuthenticated = isLoggedInServer();

  const profileLinks = PROFILE_LINKS.filter(({ authMode }) =>
    shouldRender(authMode, isAuthenticated)
  );

  return (
    <header className="bg-secondary text-secondary-content shadow">
      <nav className="flex items-center p-2">
        <div className="flex gap-4">
          <div className="text-3xl font-semibold ml-2">B2</div>
          {children}
        </div>
        <div className="ml-auto">
          <ProfileMenu links={profileLinks} />
        </div>
      </nav>
    </header>
  );
}
