'use client';

import { useState } from 'react';
import useFormValidation from '@/app/components/hooks/use-form-validation';
import TextField from '@/app/components/forms/text-field';
import UserIcon from '../../../components/icons/user-icon';
import LockIcon from '../../../components/icons/lock-icon';
import MailIcon from '../../../components/icons/mail-icon';
import routes from '@/utils/routes';
import useAuth from '@/app/components/hooks/use-auth';
import { useRouter } from 'next/navigation';
import AuthFormContainer from '../auth-form-container';

/**
 * Displays a signup form.
 *
 * @returns A JSX element.
 */
export default function SignupForm() {
  const { fieldState, handleFieldChange, validateFields } = useFormValidation({
    email: {
      regex: /^([\w.%+\-]+)@([\w\-]+\.)+([\w]{2,})$/i,
      error: 'Email is invalid.'
    },
    username: {
      regex: /^[\w]{3,20}$/i,
      error:
        'Username must be at least 3 characters and contain only letters, numbers, and underscores.'
    },
    // See https://www.ocpsoft.org/tutorials/regular-expressions/password-regular-expression/
    password: {
      regex:
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%\^&(){}\[\]:;<>,.?/~_+\-=|\\]).{12,36}$/,
      error:
        'Password must be 12-36 characters, contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character.'
    }
  });

  const { signup } = useAuth();
  const router = useRouter();
  const [errors, setErrors] = useState<string[] | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const validationErrors = validateFields();

    if (validationErrors) {
      setErrors(validationErrors);
      setSubmitting(false);
    } else {
      const {
        email: { value: email },
        username: { value: username },
        password: { value: password }
      } = fieldState;

      await signup({
        dto: {
          email: email.toLowerCase(),
          username: username.toLowerCase(),
          password
        },
        onSuccess: () => router.push(routes.dashboard),
        onFail: (errors) => {
          setErrors(errors);
          setSubmitting(false);
        }
      });
    }
  };

  return (
    <AuthFormContainer
      title="Sign Up"
      submit={{
        label: 'Create Account',
        action: handleSubmit
      }}
      switchAuthForm={{
        prompt: 'Already have an account?',
        linkLabel: 'Log In',
        route: routes.login
      }}
      errors={errors}
      submitting={submitting}
    >
      <div className="flex flex-col gap-4">
        <TextField
          type="text"
          name="email"
          value={fieldState.email?.value ?? ''}
          placeholder="Email"
          handleChange={handleFieldChange}
          startIcon={<MailIcon />}
        />
        <TextField
          type="text"
          name="username"
          value={fieldState.username?.value ?? ''}
          placeholder="Username"
          handleChange={handleFieldChange}
          startIcon={<UserIcon />}
        />
        <TextField
          type="password"
          name="password"
          value={fieldState.password?.value ?? ''}
          placeholder="Password"
          handleChange={handleFieldChange}
          startIcon={<LockIcon />}
        />
      </div>
    </AuthFormContainer>
  );
}
