'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

/**
 * Props for the {@link SelfBlurringLink} component.
 */
export interface SelfBlurringLinkProps extends LinkProps {
  /**
   * The content of the link (e.g., a display name).
   */
  children: ReactNode;
}

/**
 * A link which blurs (removes focus from itself) after it is clicked.
 *
 * The problem this component fixes is the following:
 * By default, after clicking a link, since the page does not refresh, focus remains on the link.
 * This looks strange from a UI perspective if there are focus styles applied to the element.
 *
 * @param props {@link SelfBlurringLinkProps}
 * @returns A JSX Element
 */
export default function SelfBlurringLink({
  children,
  href
}: SelfBlurringLinkProps) {
  return (
    <Link
      tabIndex={0}
      href={href}
      onClick={(event) => event.currentTarget?.blur()}
    >
      {children}
    </Link>
  );
}
