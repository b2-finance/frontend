'use client';
import Link, { LinkProps } from 'next/link';

export type ExtendedLinkProps = LinkProps & { display: string };

/**
 * Props for the {@link DropdownMenu} component.
 */
export interface DropdownMenuProps {
  /**
   * Navigation links.
   */
  links: ExtendedLinkProps[];
}

/**
 * The content of a dropdown menu.
 *
 * @param props {@link DropdownMenuProps}
 * @returns A JSX Element.
 */
export default function DropdownMenu({ links }: DropdownMenuProps) {
  return (
    <ul className="dropdown-content z-[1] menu menu-sm mt-3 p-2 shadow bg-base-100 rounded-box">
      {links?.map(({ display, href }) => (
        <li key={display}>
          <Link
            tabIndex={0}
            id={`${display}-link`}
            href={href}
            /*
              FIXME: After clicking the link, since the page does not refresh, focus remains on the link.
              This function removes focus, but makes this component a client component. Need to find a
              more elegant way of removing the focus and preserve server side rendering.
            */
            onClick={(event) =>
              document.getElementById(event.currentTarget.id)?.blur()
            }
          >
            {display}
          </Link>
        </li>
      ))}
    </ul>
  );
}
