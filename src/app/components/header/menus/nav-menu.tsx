'use client';

import SelfBlurringLink from './self-blurring-link';
import useHeaderContext from '../header-context';

/**
 * Contains the main navigation links on the app header.
 *
 * @returns A JSX element.
 */
export default function NavMenu() {
  const { navLinks } = useHeaderContext();
  return (
    <ul className="menu menu-horizontal text-primary-content">
      {navLinks?.map(({ display, href }) => (
        <li key={display}>
          <SelfBlurringLink href={href}>{display}</SelfBlurringLink>
        </li>
      ))}
    </ul>
  );
}
