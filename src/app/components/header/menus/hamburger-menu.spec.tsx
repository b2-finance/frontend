import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HamburgerMenu from './hamburger-menu';
import { NavigationLinkProps } from '../types';

describe('HamburgerMenu', () => {
  it('should render all dropdown menu links', () => {
    const navLinks: NavigationLinkProps[] = [
      { display: '1', href: '/', authMode: 'both' },
      { display: '2', href: '/', authMode: 'both' }
    ];
    render(<HamburgerMenu links={navLinks} />);
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
