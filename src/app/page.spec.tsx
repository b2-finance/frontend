import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';

describe('HomePage', () => {
  it('should render a heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: 'Home'
    });
    expect(heading).toBeInTheDocument();
  });
});
