import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavLinkContainer from './nav-link-container';
import { NavigationLinkProps } from '@/utils/types';
import { HeaderContext } from './header-context';
import { ReactNode } from 'react';

const TestContainer = ({
  navLinks,
  children
}: {
  navLinks: NavigationLinkProps[];
  children: ReactNode;
}) => {
  return (
    <HeaderContext.Provider
      value={{
        navLinks,
        profileLinks: []
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

describe('NavLinkContainer', () => {
  it('should render all links', () => {
    const navLinks: NavigationLinkProps[] = [
      { display: '1', href: '/', authMode: 'both' },
      { display: '2', href: '/', authMode: 'both' }
    ];
    render(
      <TestContainer navLinks={navLinks}>
        <NavLinkContainer />
      </TestContainer>
    );
    const link1 = screen.getByRole('link', {
      name: navLinks[0].display
    });
    const link2 = screen.getByRole('link', {
      name: navLinks[1].display
    });

    expect(link1).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
  });
});
