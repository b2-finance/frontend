import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogoutPage from './page';

jest.useFakeTimers();

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: jest.fn()
  })
}));

const mockLogout = jest.fn();
jest.mock('../../../../utils/hooks/use-auth', () => ({
  __esModule: true,
  default: () => ({
    logout: mockLogout
  })
}));

describe('LogoutPage', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render a thank you message', () => {
    render(<LogoutPage />);
    const heading = screen.getByRole('heading', {
      name: 'Thanks for being square!'
    });
    expect(heading).toBeInTheDocument();
  });

  it('should call useAuth.logout once', () => {
    render(<LogoutPage />);
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  // FIXME: This is not working.
  // it('should redirect to the login page after 5 seconds', async () => {
  //   render(<LogoutPage />);
  //   await waitFor(() => expect(mockPush).toHaveBeenCalledWith(routes.login), {
  //     timeout: 8000
  //   });
  // });
});
