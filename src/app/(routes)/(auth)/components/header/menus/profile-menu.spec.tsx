import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileMenu from './profile-menu';
import { HeaderLinkProps } from '../types';

const AVATAR_TEXT = 'XYZ';
jest.mock('./profile-menu-avatar', () => () => {
  return <div>{AVATAR_TEXT}</div>;
});

describe(ProfileMenu.name, () => {
  it('should render all dropdown menu links', () => {
    const profileLinks: HeaderLinkProps[] = [
      { display: '1', href: '/', authMode: 'both' },
      { display: '2', href: '/', authMode: 'both' }
    ];
    render(<ProfileMenu links={profileLinks} />);
    const link1 = screen.getByRole('link', {
      name: profileLinks[0].display
    });
    const link2 = screen.getByRole('link', {
      name: profileLinks[1].display
    });

    expect(link1).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
  });

  it('should render the profile avatar', () => {
    render(<ProfileMenu links={[]} />);
    const avatar = screen.getByText(AVATAR_TEXT);
    expect(avatar).toBeInTheDocument();
  });
});
