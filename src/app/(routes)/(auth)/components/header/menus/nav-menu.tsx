import SelfBlurringLink from './self-blurring-link';
import { NavigationLinkProps } from '../types';

/**
 * Props for the {@link NavMenu} component.
 */
export interface NavMenuProps {
  links: NavigationLinkProps[];
}

/**
 * Contains the main navigation links on the app header.
 *
 * @param props {@link NavMenuProps}
 * @returns A JSX Element.
 */
export default function NavMenu({ links }: NavMenuProps) {
  return (
    <ul className="menu menu-horizontal text-primary-content">
      {links?.map(({ display, href }) => (
        <li key={display}>
          <SelfBlurringLink href={href}>{display}</SelfBlurringLink>
        </li>
      ))}
    </ul>
  );
}
