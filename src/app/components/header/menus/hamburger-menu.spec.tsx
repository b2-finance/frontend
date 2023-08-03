import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HamburgerMenu from './hamburger-menu';
import { ExtendedLinkProps } from './dropdown-menu';

describe('HamburgerMenu', () => {
  it('should render all dropdown menu links', () => {
    const links: ExtendedLinkProps[] = [
      { display: '1', href: '/' },
      { display: '2', href: '/' }
    ];
    render(<HamburgerMenu links={links} />);
    const link1 = screen.getByRole('link', {
      name: links[0].display
    });
    const link2 = screen.getByRole('link', {
      name: links[1].display
    });

    expect(link1).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
  });
});
