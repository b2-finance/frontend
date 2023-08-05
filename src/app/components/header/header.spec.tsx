import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './header';

describe('Header', () => {
  it('should render a header element', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should render a nav element', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  // TODO: Implement this.
  // it('should hide the nav-menu when screen size < 640px', () => {});

  // TODO: Implement this.
  // it('should hide hamburger-menu in screen sizes >= 640px', () => {});
});
