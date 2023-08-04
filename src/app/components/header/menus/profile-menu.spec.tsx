import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileMenu from './profile-menu';
import { NavigationLinkProps } from '@/utils/types';
import { HeaderContext } from '../header-context';
import { ReactNode } from 'react';

const TestContainer = ({
  profileLinks,
  children
}: {
  profileLinks: NavigationLinkProps[];
  children: ReactNode;
}) => {
  return (
    <HeaderContext.Provider
      value={{
        navLinks: [],
        profileLinks
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

describe('ProfileMenu', () => {
  it('should render all dropdown menu links', () => {
    const profileLinks: NavigationLinkProps[] = [
      { display: '1', href: '/', authMode: 'both' },
      { display: '2', href: '/', authMode: 'both' }
    ];
    render(
      <TestContainer profileLinks={profileLinks}>
        <ProfileMenu />
      </TestContainer>
    );
    const link1 = screen.getByRole('link', {
      name: profileLinks[0].display
    });
    const link2 = screen.getByRole('link', {
      name: profileLinks[1].display
    });

    expect(link1).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
  });
});
