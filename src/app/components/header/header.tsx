import routes from '@/utils/routes';
import HamburgerMenu from './menus/hamburger-menu';
import ProfileMenu from './menus/profile-menu';
import { HeaderContextProvider } from './header-context';
import NavLinkContainer from './nav-link-container';

/**
 * The header bar of the application. Contains the navbar, profile, settings,
 * and a hamburger menu that is visible only in mobile screens.
 *
 * @returns A JSX Element.
 */
export default function Header() {
  return (
    <HeaderContextProvider>
      <header className="bg-primary">
        <nav className="navbar">
          <div className="navbar-start">
            <div className="tablet:hidden">
              <HamburgerMenu />
            </div>
          </div>
          <div className="navbar-center">
            <NavLinkContainer />
          </div>
          <div className="navbar-end">
            <ProfileMenu />
          </div>
        </nav>
      </header>
    </HeaderContextProvider>
  );
}
