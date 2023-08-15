import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupForm from './signup-form';
import { SignUpDto, signup } from '@/app/bff-utils/auth-utils';
import routes from '@/common/routes';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

let mockFieldState = {
  email: { value: 'email' },
  username: { value: 'username' },
  password: { value: 'password' }
};
let mockHandleFieldChange = jest.fn();
let mockValidateFields = jest.fn();

// See https://stackoverflow.com/questions/65270255/mocking-react-custom-hook-with-jest
jest.mock('../../../../common/forms/use-form-validation', () => ({
  __esModule: true,
  default: () => ({
    fieldState: mockFieldState,
    handleFieldChange: mockHandleFieldChange,
    validateFields: mockValidateFields
  })
}));

jest.mock('../../../../bff-utils/auth-utils', () => ({
  signup: jest.fn()
}));

describe('SignupForm', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it('should render a link to the login page', () => {
    render(<SignupForm />);
    const link = screen.getByRole('link', { name: 'Log In' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', routes.login);
  });

  it('should call signup when submit clicked', async () => {
    const user = userEvent.setup();
    mockValidateFields.mockReturnValue(null);

    const signUpDto: SignUpDto = {
      email: mockFieldState.email.value,
      username: mockFieldState.username.value,
      password: mockFieldState.password.value
    };

    render(<SignupForm />);

    const email = screen.getByPlaceholderText('Email');
    const username = screen.getByPlaceholderText('Username');
    const password = screen.getByPlaceholderText('Password');
    const submit = screen.getByRole('button', { name: 'Create Account' });

    await user.type(email, signUpDto.email);
    await user.type(username, signUpDto.username);
    await user.type(password, signUpDto.password);
    await user.click(submit);

    expect(signup).toHaveBeenCalledTimes(1);
  });

  it('should display error when invalid field(s) are submitted', async () => {
    const user = userEvent.setup();
    const errors = ['error1', 'error2'];
    mockValidateFields.mockReturnValue(errors);

    render(<SignupForm />);

    const submit = screen.getByRole('button', { name: 'Create Account' });
    await user.click(submit);

    const error1 = screen.getByText(errors[0]);
    const error2 = screen.getByText(errors[1]);

    expect(error1).toBeInTheDocument();
    expect(error2).toBeInTheDocument();
  });

  it('should ignore case for email/username and respect case for password', async () => {
    const user = userEvent.setup();
    mockValidateFields.mockReturnValue(null);

    const signUpDto: SignUpDto = {
      email: 'CaseInsensitiveEmail',
      username: 'CaseInsensitiveUserName',
      password: 'CaseSensitivePassWord'
    };
    mockFieldState = {
      email: { value: signUpDto.email },
      username: { value: signUpDto.username },
      password: { value: signUpDto.password }
    };

    render(<SignupForm />);

    const email = screen.getByPlaceholderText('Email');
    const username = screen.getByPlaceholderText('Username');
    const password = screen.getByPlaceholderText('Password');
    const submit = screen.getByRole('button', { name: 'Create Account' });

    await user.type(email, signUpDto.email);
    await user.type(username, signUpDto.username);
    await user.type(password, signUpDto.password);
    await user.click(submit);

    expect(signup).toHaveBeenCalledWith({
      dto: {
        email: signUpDto.email.toLowerCase(),
        username: signUpDto.username.toLowerCase(),
        password: signUpDto.password
      },
      onFail: expect.any(Function),
      onSuccess: expect.any(Function)
    });
  });
});
