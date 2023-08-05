import NavMenu from './menus/nav-menu';
import HamburgerMenu from './menus/hamburger-menu';
import ProfileMenu from './menus/profile-menu';
import { HeaderContextProvider } from './header-context';

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
          <div className="navbar-center hidden tablet:inline-flex">
            <NavMenu />
          </div>
          <div className="navbar-end">
            <ProfileMenu />
          </div>
        </nav>
      </header>
    </HeaderContextProvider>
  );
}
