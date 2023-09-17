import { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

/**
 * Properties of a link in the {@link NavbarSubmenu}.
 */
export interface NavbarSubmenuLinks {
  href: string;
  icon: ReactNode;
  label: string;
}

/**
 * Props for the {@link NavbarSubmenu} component.
 */
export interface NavbarSubmenuProps {
  title: string;
  links: NavbarSubmenuLinks[];
  active: string;
  handleClick: (href: string) => void;
}

/**
 * A dropdown menu on the navbar.
 *
 * @param props {@link NavbarSubmenuProps}
 * @returns A JSX element.
 */
export default function NavbarSubmenu({
  title,
  links,
  active,
  handleClick
}: NavbarSubmenuProps) {
  return (
    <ul className="p-2 text-sm select-none shadow-lg bg-base-100 text-base-content">
      <li className="py-2 px-4 font-semibold text-secondary">{title}</li>
      {links.map(({ href, icon, label }) => (
        <li
          key={href}
          onClick={() => handleClick(href)}
          className={clsx(
            href === active
              ? 'bg-neutral text-neutral-content'
              : [
                  'hover:bg-base-300',
                  'hover:text-base-content',
                  'active:bg-neutral',
                  'active:text-neutral-content'
                ]
          )}
        >
          <Link href={href} className="flex gap-2 py-2 px-4">
            {icon}
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
