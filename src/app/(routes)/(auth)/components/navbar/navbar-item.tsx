import { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

/**
 * Props for the {@link NavbarItem} component.
 */
export interface NavbarItemProps {
  href?: string;
  icon: ReactNode;
  label: string;
  active: boolean;
}

/**
 * A top level item on the navbar.
 *
 * @param props {@link NavbarItemProps}
 * @returns A JSX element.
 */
export default function NavbarItem({
  href,
  icon,
  label,
  active
}: NavbarItemProps) {
  const content = (
    <div className="relative p-2 cursor-pointer">
      {icon}
      {href && (
        <div
          className={clsx(
            'invisible',
            'opacity-0',
            'group-hover:transition-all',
            'group-hover:visible',
            'group-hover:opacity-100',
            'group-hover:delay-500',
            'group-hover:duration-500',
            'group-focus:visible',
            'group-focus:opacity-100',
            'absolute',
            'left-12', // 40px icon + 8px navbar padding
            '-translate-y-full',
            'shadow-lg',
            'py-1',
            'px-2',
            'text-xs',
            'z-[1]',
            'bg-neutral',
            'text-neutral-content'
          )}
        >
          {label}
        </div>
      )}
    </div>
  );

  return href ? (
    <Link
      href={href}
      className={clsx(
        'group flex',
        active
          ? 'bg-neutral text-neutral-content'
          : [
              'hover:bg-base-300',
              'hover:text-base-content',
              'active:bg-neutral',
              'active:text-neutral-content'
            ]
      )}
    >
      {content}
    </Link>
  ) : (
    <div
      tabIndex={0}
      className={clsx(
        active
          ? 'bg-neutral text-neutral-content'
          : 'hover:bg-base-300 hover:text-base-content'
      )}
    >
      {content}
    </div>
  );
}
