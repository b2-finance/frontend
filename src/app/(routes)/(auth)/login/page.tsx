import FormToggle from './form-toggle';
import LoginForm from './login-form';
import SignupForm from './signup-form';

/**
 * Contains a login and signup form.
 *
 * @returns A JSX element.
 */
export default function LoginPage() {
  return (
    <div className="grow flex flex-col justify-center items-center w-screen tablet:p-8">
      <FormToggle
        closedForm={<LoginForm />}
        openForm={<SignupForm />}
        closedContent={{
          title: 'Hello, Friend!',
          content: 'Give us a try. Sign up today for free.',
          buttonText: 'Create Account'
        }}
        openContent={{
          title: 'Welcome Back!',
          content: 'Log in with your credentials.',
          buttonText: 'Log In'
        }}
      />
    </div>
  );
}
