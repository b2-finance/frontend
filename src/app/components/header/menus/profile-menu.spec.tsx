import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileMenu from './profile-menu';
import { NavigationLinkProps } from '@/utils/types';
import { HeaderContext } from '../header-context';
import { ReactNode } from 'react';
import { AppContext } from '@/app/app-context';

const TestContainer = ({
  authenticated,
  profileLinks,
  children
}: {
  authenticated: boolean;
  profileLinks: NavigationLinkProps[];
  children: ReactNode;
}) => {
  return (
    <AppContext.Provider
      value={{
        userId: '',
        setUserId: () => {},
        access: { token: '', expiresAt: new Date(0) },
        setAccess: () => {},
        authenticated,
        setAuthenticated: () => {}
      }}
    >
      <HeaderContext.Provider
        value={{
          navLinks: [],
          profileLinks
        }}
      >
        {children}
      </HeaderContext.Provider>
    </AppContext.Provider>
  );
};

describe('ProfileMenu', () => {
  it('should render all dropdown menu links', () => {
    const profileLinks: NavigationLinkProps[] = [
      { display: '1', href: '/', authMode: 'both' },
      { display: '2', href: '/', authMode: 'both' }
    ];
    render(
      <TestContainer authenticated={true} profileLinks={profileLinks}>
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

  it.each([
    ['should render when user is logged in', true],
    ['should not render when user is logged out', false]
  ])('%s', (_: string, authenticated: boolean) => {
    const profileLinks: NavigationLinkProps[] = [
      { display: '1', href: '/', authMode: 'both' },
      { display: '2', href: '/', authMode: 'both' }
    ];
    render(
      <TestContainer authenticated={authenticated} profileLinks={profileLinks}>
        <ProfileMenu />
      </TestContainer>
    );
    const initials = screen.queryByText('JP');

    if (authenticated) expect(initials).toBeInTheDocument();
    else expect(initials).toBeNull();
  });
});
