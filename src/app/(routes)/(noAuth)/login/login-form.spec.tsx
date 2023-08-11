import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './login-form';
import { SignInDto } from '@/utils/types';
import routes from '@/utils/routes';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

let mockFieldState = {
  username: { value: 'username' },
  password: { value: 'password' }
};
let mockHandleFieldChange = jest.fn();
let mockValidateFields = jest.fn();

// See https://stackoverflow.com/questions/65270255/mocking-react-custom-hook-with-jest
jest.mock('../../../components/hooks/use-form-validation', () => ({
  __esModule: true,
  default: () => ({
    fieldState: mockFieldState,
    handleFieldChange: mockHandleFieldChange,
    validateFields: mockValidateFields
  })
}));

const mockLogin = jest.fn();
jest.mock('../../../components/hooks/use-auth', () => ({
  __esModule: true,
  default: () => ({
    login: mockLogin
  })
}));

describe('LoginForm', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it('should render a link to the signup page', () => {
    render(<LoginForm />);
    const link = screen.getByRole('link', { name: 'Create an account' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', routes.signup);
  });

  it('should call useAuth.login when submit clicked', async () => {
    const user = userEvent.setup();
    mockValidateFields.mockReturnValue(null);

    const signInDto: SignInDto = {
      username: mockFieldState.username.value,
      password: mockFieldState.password.value
    };

    render(<LoginForm />);

    const username = screen.getByPlaceholderText('Username');
    const password = screen.getByPlaceholderText('Password');
    const submit = screen.getByRole('button', { name: 'Log In' });

    await user.type(username, signInDto.username);
    await user.type(password, signInDto.password);
    await user.click(submit);

    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  it('should display error when invalid field(s) are submitted', async () => {
    const user = userEvent.setup();
    const errors = ['error1', 'error2'];
    mockValidateFields.mockReturnValue(errors);

    render(<LoginForm />);

    const submit = screen.getByRole('button', { name: 'Log In' });
    await user.click(submit);

    const error1 = screen.getByText(errors[0]);
    const error2 = screen.getByText(errors[1]);

    expect(error1).toBeInTheDocument();
    expect(error2).toBeInTheDocument();
  });
});
