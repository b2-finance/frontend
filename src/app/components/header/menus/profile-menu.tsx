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
    <DropdownMenu
      links={links}
      rightAlign
      buttonCss="btn btn-ghost btn-circle avatar placeholder"
      // TODO: Make this dynamic. Need to fetch user data (including profile photo) from this component.
      button={
        <div className="h-10 bg-neutral rounded-full">
          <span className="text-neutral-content">JP</span>
        </div>
      }
    />
  );
}
