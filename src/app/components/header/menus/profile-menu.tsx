'use client';

import DropdownMenu from './dropdown-menu';
import useHeaderContext from '../header-context';

/**
 * A dropdown menu featuring the user's profile photo.
 *
 * @returns A JSX Element.
 */
export default function ProfileMenu() {
  const { profileLinks } = useHeaderContext();
  return (
    <DropdownMenu
      links={profileLinks}
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
