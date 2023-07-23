import DropdownMenu, { ExtendedLinkProps } from './dropdown-menu';

/**
 * Props for the {@link ProfileMenu} component.
 */
export interface ProfileMenuProps {
  /**
   * Navigation links.
   */
  links: ExtendedLinkProps[];
}

/**
 * A dropdown menu featuring the user's profile photo.
 *
 * @param props {@link ProfileMenuProps}
 * @returns A JSX Element.
 */
export default function ProfileMenu({ links }: ProfileMenuProps) {
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar placeholder"
      >
        <div className="h-10 bg-neutral rounded-full">
          {/* TODO: Make this dynamic. Need to fetch user data (including profile photo) from this component. */}
          <span className="text-neutral-content">JP</span>
        </div>
      </label>
      <DropdownMenu links={links} />
    </div>
  );
}
