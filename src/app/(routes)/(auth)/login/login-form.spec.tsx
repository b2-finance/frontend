import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './login-form';
import routes from '@/utils/routes';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

// FIXME: This is not working
// @see https://stackoverflow.com/questions/65270255/mocking-react-custom-hook-with-jest
// jest.mock('../../../../utils/hooks/use-form-validation', () => ({
//   useFormValidation: () => ({
//     __esModule: true,
//     default: () => ({
//       fieldState: {},
//       handleFieldChange: () => {},
//       validateFields: () => {}
//     })
//   })
// }));

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

  it('should render a link to the signup page', () => {
    render(<LoginForm />);
    const link = screen.getByRole('link', { name: 'Create an account' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', routes.signup);
  });

  // FIXME: This is not working. Having trouble mocking the use-form-validation hook
  // it('should call apiAuth.login with expected arguments when submit clicked', async () => {
  //   const signUpMock = jest.spyOn(authApi, 'login').mockResolvedValue({});
  //   const user = userEvent.setup();

  //   const signInDto: SignInDto = {
  //     username: 'abc',
  //     password: 'Abcdefghij1!'
  //   };

  //   render(<LoginForm />);

  //   const submit = screen.getByRole('button', { name: 'Log In' });
  //   const username = screen.getByPlaceholderText('Username');
  //   const password = screen.getByPlaceholderText('Password');

  //   await user.type(username, signInDto.username);
  //   await user.type(password, signInDto.password);
  //   await user.click(submit);

  //   expect(signUpMock).toHaveBeenCalledWith(signInDto);
  // });

  // TODO: Implement these (user it.each to test multiple combinations in one test)
  // it('should display error when empty username is submitted', () => {});
  // it('should display error when empty password is submitted', () => {});
  // it('should display error when empty username & password is submitted', () => {});
  // it('should display error when API returns an error', () => {});
});
