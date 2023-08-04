import { ReactNode } from 'react';
import SelfBlurringLink from './self-blurring-link';
import { NavigationLinkProps } from '@/utils/types';

/**
 * Props for the {@link DropdownMenu} component.
 */
export interface DropdownMenuProps {
  /**
   * The element that opens the dropdown on click (does not need to be a button element).
   */
  button: ReactNode;
  /**
   * A complete string composed of Tailwind CSS classes. The string must exist in the source
   * code as a complete string (i.e., do not use string interpolation or concatenation to
   * dynamically compose a string from multiple parts). Tailwind uses regex to generate CSS,
   * so it will not work if the string does not exist in whole.
   *
   * @example Right: 'btn btn-circle'
   *          Wrong: `btn btn-${shape}`
   *          Wrong: 'btn btn-' + shape
   * @default 'btn btn-ghost btn-circle text-primary-content'
   */
  buttonCss?: string;
  /**
   * Navigation links.
   */
  links?: NavigationLinkProps[];
  /**
   * Aligns the dropdown menu to the right of the button.
   *
   * @default false
   */
  rightAlign?: boolean;
}

/**
 * A dropdown menu.
 *
 * @param props {@link DropdownMenuProps}
 * @returns A JSX Element.
 */
export default function DropdownMenu({
  button,
  buttonCss = 'btn btn-ghost btn-circle text-primary-content',
  links,
  rightAlign = false
}: DropdownMenuProps) {
  let parentCss = rightAlign ? 'dropdown dropdown-end' : 'dropdown';

  return (
    <div className={parentCss}>
      <label tabIndex={0} className={buttonCss}>
        {button}
      </label>
      {links?.length ? (
        <ul className="dropdown-content z-[1] menu menu-sm mt-3 p-2 shadow bg-base-100 rounded-box">
          {links?.map(({ display, href }) => (
            <li key={display}>
              <SelfBlurringLink href={href}>{display}</SelfBlurringLink>
            </li>
          ))}
        </ul>
      ) : undefined}
    </div>
  );
}
