import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownMenu from './dropdown-menu';
import { NavigationLinkProps } from '@/utils/types';

describe('DropdownMenu', () => {
  it('should render a list of links', () => {
    const links: NavigationLinkProps[] = [
      { display: '1', href: '/', authMode: 'both' },
      { display: '2', href: '/', authMode: 'both' }
    ];
    render(<DropdownMenu button={<button>Hello</button>} links={links} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should render all links', () => {
    const links: NavigationLinkProps[] = [
      { display: '1', href: '/', authMode: 'both' },
      { display: '2', href: '/', authMode: 'both' }
    ];
    render(<DropdownMenu button={<button>Hello</button>} links={links} />);

    const item1 = screen.getByText(links[0].display);
    const item2 = screen.getByText(links[1].display);

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it('should render the button', () => {
    const links: NavigationLinkProps[] = [
      { display: '1', href: '/', authMode: 'both' },
      { display: '2', href: '/', authMode: 'both' }
    ];
    render(<DropdownMenu button={<button>Hello</button>} links={links} />);

    const button = screen.getByText('Hello');
    expect(button).toBeInTheDocument();
  });
});
