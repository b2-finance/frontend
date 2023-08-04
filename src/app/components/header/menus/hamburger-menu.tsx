'use client';

import DropdownMenu from './dropdown-menu';
import useHeaderContext from '../header-context';

/**
 * A hamburger navigation menu.
 *
 * @returns A JSX Element.
 */
export default function HamburgerMenu() {
  const { navLinks } = useHeaderContext();
  return (
    <DropdownMenu
      links={navLinks}
      buttonCss="btn btn-ghost btn-circle text-primary-content"
      button={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      }
    />
  );
}
