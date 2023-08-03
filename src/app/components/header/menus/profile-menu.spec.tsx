import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileMenu from './profile-menu';
import { ExtendedLinkProps } from './dropdown-menu';

describe('ProfileMenu', () => {
  it('should render all dropdown menu links', () => {
    const links: ExtendedLinkProps[] = [
      { display: '1', href: '/' },
      { display: '2', href: '/' }
    ];
    render(<ProfileMenu links={links} />);
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
