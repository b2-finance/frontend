import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './page';

describe(HomePage.name, () => {
  it('should render a heading', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', {
      name: 'Home'
    });
    expect(heading).toBeInTheDocument();
  });
});
