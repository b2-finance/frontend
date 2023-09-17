import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar, { NAVBAR_ITEMS } from './navbar';

describe(Navbar.name, () => {
  it('should render all links', () => {
    render(<Navbar />);

    for (const { label, sub } of NAVBAR_ITEMS) {
      if (sub) {
        for (const s of sub) {
          const link = screen.getByRole('link', { name: s.label });
          expect(link).toBeInTheDocument();
        }
      } else {
        const link = screen.getByRole('link', { name: label });
        expect(link).toBeInTheDocument();
      }
    }
  });
});
