import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupPage from './page';
import routes from '@/common/routes';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

describe('SignupPage', () => {
  it('should render a logo link to the home page', () => {
    render(<SignupPage />);
    const logo = screen.getByRole('link', { name: 'B2' });
    expect(logo).toHaveAttribute('href', routes.home);
  });

  it('should render a signup form', () => {
    render(<SignupPage />);
    const form = screen.getByRole('heading', { name: 'Sign Up' });
    expect(form).toBeInTheDocument();
  });
});
