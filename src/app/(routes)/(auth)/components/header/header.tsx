import NavMenu from './menus/nav-menu';
import HamburgerMenu from './menus/hamburger-menu';
import ProfileMenu from './menus/profile-menu';
import { AuthMode, NavigationLinkProps } from './types';
import routes from '@/common/routes';
import isLoggedInServer from '../functions/is-logged-in-server';

export const ALL_NAV_LINKS: NavigationLinkProps[] = [
  { display: 'Home', href: routes.home, authMode: 'noAuth' },
  { display: 'Dashboard', href: routes.dashboard, authMode: 'auth' },
  { display: 'Ledger', href: routes.ledger, authMode: 'auth' },
  { display: 'Budget', href: routes.budget, authMode: 'auth' },
  { display: 'Log In', href: routes.login, authMode: 'noAuth' }
];

export const ALL_PROFILE_LINKS: NavigationLinkProps[] = [
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
 * The header bar of the application. Contains the navbar, profile, settings,
 * and a hamburger menu that is visible only in mobile screens.
 *
 * @returns A JSX Element.
 */
export default function Header() {
  const isAuthenticated = isLoggedInServer();

  const navLinks = ALL_NAV_LINKS.filter(({ authMode }) =>
    shouldRender(authMode, isAuthenticated)
  );
  const profileLinks = ALL_PROFILE_LINKS.filter(({ authMode }) =>
    shouldRender(authMode, isAuthenticated)
  );

  return (
    <header className="bg-primary">
      <nav className="navbar">
        <div className="navbar-start">
          <div className="tablet:hidden">
            <HamburgerMenu links={navLinks} />
          </div>
        </div>
        <div className="navbar-center hidden tablet:inline-flex">
          <NavMenu links={navLinks} />
        </div>
        <div className="navbar-end">
          <ProfileMenu links={profileLinks} />
        </div>
      </nav>
    </header>
  );
}
