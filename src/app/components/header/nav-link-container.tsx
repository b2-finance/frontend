'use client';

import SelfBlurringLink from './menus/self-blurring-link';
import useHeaderContext from './header-context';

/**
 * Contains the main navigation links on the app header.
 *
 * @returns A JSX element.
 */
export default function NavLinkContainer() {
  const { navLinks } = useHeaderContext();
  return (
    <ul className="menu hidden tablet:menu-horizontal text-primary-content">
      {navLinks?.map(({ display, href }) => (
        <li key={display}>
          <SelfBlurringLink href={href}>{display}</SelfBlurringLink>
        </li>
      ))}
    </ul>
  );
}
