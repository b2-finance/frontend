import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupForm from './signup-form';

describe('SignupForm', () => {
  it('should render a Sign Up header', () => {
    render(<SignupForm />);
    const header = screen.getByRole('heading', { name: 'Sign Up' });
    expect(header).toBeInTheDocument();
  });

  it('should render an email input', () => {
    render(<SignupForm />);
    const input = screen.getByPlaceholderText('Email');
    expect(input).toBeInTheDocument();
  });

  it('should render a username input', () => {
    render(<SignupForm />);
    const input = screen.getByPlaceholderText('Username');
    expect(input).toBeInTheDocument();
  });

  it('should render a password input', () => {
    render(<SignupForm />);
    const input = screen.getByPlaceholderText('Password');
    expect(input).toBeInTheDocument();
  });

  it('should render a Create Account button', () => {
    render(<SignupForm />);
    const button = screen.getByRole('button', { name: 'Create Account' });
    expect(button).toBeInTheDocument();
  });
});
