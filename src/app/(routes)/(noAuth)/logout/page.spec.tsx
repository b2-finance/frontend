import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogoutPage from './page';
import * as logout from '@/app/api/auth/logout';
import routes from '@/common/routes';

jest.useFakeTimers();

const mockPush = jest.fn();
const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack
  })
}));

jest.mock('../../../api/auth/logout', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe(LogoutPage.name, () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render a thank you message', () => {
    jest.spyOn(logout, 'default').mockResolvedValue({});
    render(<LogoutPage />);
    const heading = screen.getByRole('heading', {
      name: 'Thanks for being square!'
    });
    expect(heading).toBeInTheDocument();
  });

  it('should call logout once', () => {
    jest.spyOn(logout, 'default').mockResolvedValue({});
    render(<LogoutPage />);
    expect(logout.default).toHaveBeenCalledTimes(1);
  });

  it('should redirect to the login page', async () => {
    jest.spyOn(logout, 'default').mockResolvedValue({});
    render(<LogoutPage />);
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith(routes.login), {
      timeout: 8000
    });
  });

  it('should redirect to the previous page if logout fails', async () => {
    jest.spyOn(logout, 'default').mockResolvedValue({ errors: ['error'] });
    render(<LogoutPage />);
    await waitFor(() => expect(mockBack).toHaveBeenCalledTimes(1), {
      timeout: 8000
    });
  });
});
