import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogoutPage from './page';
import { logout } from '@/app/bff-utils/auth-utils';

jest.useFakeTimers();

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: jest.fn()
  })
}));

jest.mock('../../../bff-utils/auth-utils', () => ({
  logout: jest.fn()
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

  it('should call logout once', () => {
    render(<LogoutPage />);
    expect(logout).toHaveBeenCalledTimes(1);
  });

  // FIXME: This is not working.
  // it('should redirect to the login page after 5 seconds', async () => {
  //   render(<LogoutPage />);
  //   await waitFor(() => expect(mockPush).toHaveBeenCalledWith(routes.login), {
  //     timeout: 8000
  //   });
  // });
});
