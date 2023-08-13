import DropdownMenu from './dropdown-menu';
import { NavigationLinkProps } from '../types';

/**
 * Props for the {@link HamburgerMenu} component.
 */
export interface HamburgerMenuProps {
  links: NavigationLinkProps[];
}

/**
 * A hamburger navigation menu.
 *
 * @param props {@link HamburgerMenuProps}
 * @returns A JSX Element.
 */
export default function HamburgerMenu({ links }: HamburgerMenuProps) {
  return (
    <DropdownMenu
      links={links}
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
