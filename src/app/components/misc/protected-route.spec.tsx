import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProtectedRoute from './protected-route';
import { ReactNode } from 'react';
import { AppContext } from '@/app/app-context';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  }),
  usePathname: () => ({})
}));

const TestContainer = ({
  authenticated,
  children
}: {
  authenticated: boolean;
  children: ReactNode;
}) => {
  return (
    <AppContext.Provider
      value={{
        userId: '',
        setUserId: () => {},
        authenticated,
        setAuthenticated: () => {}
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

describe('ProtectedRoute', () => {
  it('should render the login page when user is not authenticated', () => {
    render(
      <TestContainer authenticated={false}>
        <ProtectedRoute>
          <h1>Hello</h1>
        </ProtectedRoute>
      </TestContainer>
    );
    const login = screen.getByRole('heading', { name: 'Log In' });
    expect(login).toBeInTheDocument();
  });

  it('should not render the login page when user is authenticated', () => {
    render(
      <TestContainer authenticated={true}>
        <ProtectedRoute>
          <h1>Hello</h1>
        </ProtectedRoute>
      </TestContainer>
    );
    const login = screen.queryByRole('heading', { name: 'Log In' });
    expect(login).not.toBeInTheDocument();
  });

  it('should not render the child component when user is not authenticated', () => {
    const text = 'Hello';
    render(
      <TestContainer authenticated={false}>
        <ProtectedRoute>
          <h1>{text}</h1>
        </ProtectedRoute>
      </TestContainer>
    );
    const child = screen.queryByText(text);
    expect(child).not.toBeInTheDocument();
  });

  it('should render the child component when user is authenticated', () => {
    const text = 'Hello';
    render(
      <TestContainer authenticated={true}>
        <ProtectedRoute>
          <h1>{text}</h1>
        </ProtectedRoute>
      </TestContainer>
    );
    const child = screen.getByText(text);
    expect(child).toBeInTheDocument();
  });
});
