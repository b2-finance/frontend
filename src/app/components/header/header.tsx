'use client';
import routes from '@/utils/routes';
import Link from 'next/link';
import HamburgerMenu from './menus/hamburger-menu';
import ProfileMenu from './menus/profile-menu';
import { ExtendedLinkProps } from './menus/dropdown-menu';

const navLinks: ExtendedLinkProps[] = [
  { display: 'Home', href: routes.home },
  { display: 'Dashboard', href: routes.dashboard },
  { display: 'Ledger', href: routes.ledger },
  { display: 'Budget', href: routes.budget }
];

const profileLinks: ExtendedLinkProps[] = [
  { display: 'Profile', href: routes.profile },
  { display: 'Settings', href: routes.settings },
  { display: 'Logout', href: routes.logout }
];

/**
 * The header bar of the application. Contains the navbar, profile, settings,
 * and a hamburger menu that is visible only in mobile screens.
 *
 * @returns A JSX Element.
 */
export default function Header() {
  return (
    <header className="bg-primary">
      <nav className="navbar">
        <div className="navbar-start">
          <div className="tablet:hidden">
            <HamburgerMenu links={navLinks} />
          </div>
        </div>
        <div className="navbar-center">
          <ul className="menu hidden tablet:menu-horizontal text-primary-content">
            {navLinks?.map(({ display, href }) => (
              <li key={display}>
                <Link
                  id={`${display}-nav-link`}
                  href={href}
                  onClick={(event) => {
                    document.getElementById(event.currentTarget.id)?.blur();
                  }}
                >
                  {display}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <ProfileMenu links={profileLinks} />
        </div>
      </nav>
    </header>
  );
}
