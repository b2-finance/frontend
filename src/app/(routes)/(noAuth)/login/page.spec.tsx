import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './page';
import routes from '@/utils/routes';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  }),
  usePathname: () => ({})
}));

describe('LoginPage', () => {
  it('should render a logo link to the home page', () => {
    render(<LoginPage />);
    const logo = screen.getByRole('link', { name: 'B2' });
    expect(logo).toHaveAttribute('href', routes.home);
  });

  it('should render a login form', () => {
    render(<LoginPage />);
    const form = screen.getByRole('heading', { name: 'Log In' });
    expect(form).toBeInTheDocument();
  });
});
