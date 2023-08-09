import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupForm from './signup-form';
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

  it('should render a link to the login page', () => {
    render(<SignupForm />);
    const link = screen.getByRole('link', { name: 'Log In' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', routes.login);
  });

  // FIXME: This is not working. Having trouble mocking the use-form-validation hook
  // it('should call apiAuth.signup with expected arguments when submit clicked', async () => {
  //   const signUpMock = jest.spyOn(authApi, 'signUp').mockResolvedValue({});
  //   const user = userEvent.setup();

  //   const signUpDto: SignUpDto = {
  //     email: 'a@email.com',
  //     username: 'abc',
  //     password: 'Abcdefghij1!'
  //   };

  //   render(<SignupForm />);

  //   const submit = screen.getByRole('button', { name: 'Create Account' });
  //   const email = screen.getByPlaceholderText('Email');
  //   const username = screen.getByPlaceholderText('Username');
  //   const password = screen.getByPlaceholderText('Password');

  //   await user.type(email, signUpDto.email);
  //   await user.type(username, signUpDto.username);
  //   await user.type(password, signUpDto.password);
  //   await user.click(submit);

  //   expect(signUpMock).toHaveBeenCalledWith(signUpDto);
  // });

  // TODO: Implement these (user it.each to test multiple combinations in one test)
  // it('should display error when invalid email is submitted', () => {});
  // it('should display error when invalid username is submitted', () => {});
  // it('should display error when invalid password is submitted', () => {});
  // it('should display error when all submitted fields are invalid', () => {});
  // it('should display error when API returns an error', () => {});
});
