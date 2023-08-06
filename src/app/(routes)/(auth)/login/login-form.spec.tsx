import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './login-form';

describe('LoginForm', () => {
  it('should render a Log In header', () => {
    render(<LoginForm />);
    const header = screen.getByRole('heading', { name: 'Log In' });
    expect(header).toBeInTheDocument();
  });

  it('should render a username input', () => {
    render(<LoginForm />);
    const input = screen.getByPlaceholderText('Username');
    expect(input).toBeInTheDocument();
  });

  it('should render a password input', () => {
    render(<LoginForm />);
    const input = screen.getByPlaceholderText('Password');
    expect(input).toBeInTheDocument();
  });

  it('should render a Log In button', () => {
    render(<LoginForm />);
    const button = screen.getByRole('button', { name: 'Log In' });
    expect(button).toBeInTheDocument();
  });

  it('should render a Forgot Password link', () => {
    render(<LoginForm />);
    const link = screen.getByRole('link', { name: 'Forgot Password?' });
    expect(link).toBeInTheDocument();
  });
});
