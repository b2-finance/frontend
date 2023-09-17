import DropdownMenu from './dropdown-menu';
import { HeaderLinkProps } from '../types';
import ProfileMenuAvatar from './profile-menu-avatar';

/**
 * Props for the {@link ProfileMenu} component.
 */
export interface ProfileMenuProps {
  links: HeaderLinkProps[];
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
      button={
        <div className="h-10 bg-neutral rounded-full">
          <span className="text-neutral-content">
            <ProfileMenuAvatar />
          </span>
        </div>
      }
    />
  );
}
