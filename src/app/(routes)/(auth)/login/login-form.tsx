'use client';

import { useState } from 'react';
import useFormValidation from '@/utils/hooks/use-form-validation';
import TextField from '@/app/components/forms/text-field';
import UserIcon from '../../../components/icons/user-icon';
import LockIcon from '../../../components/icons/lock-icon';
import Link from 'next/link';
import routes from '@/utils/routes';
import { authApi } from '@/utils/api/auth';
import { useRouter } from 'next/navigation';
import AuthFormContainer from '../auth-form-container';

/**
 * Displays a login form.
 *
 * @returns A JSX element.
 */
export default function LoginForm() {
  const { fieldState, handleFieldChange, validateFields } = useFormValidation({
    username: {
      regex: /^[^\s]+$/,
      error: 'Username must not be empty.'
    },
    password: {
      regex: /^[^\s]+$/,
      error: 'Password must not be empty.'
    }
  });

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
      const { username, password } = fieldState;

      const { errors: err } = await authApi.login({
        username: username.value,
        password: password.value
      });

      if (err) {
        setErrors(err);
        setSubmitting(false);
      } else router.push(routes.dashboard);
    }
  };

  return (
    <AuthFormContainer
      title="Log In"
      submit={{
        label: 'Log In',
        action: handleSubmit
      }}
      switchAuthForm={{
        prompt: `New to ${process.env.NEXT_PUBLIC_APP_NAME}?`,
        linkLabel: 'Create an account',
        route: routes.signup
      }}
      errors={errors}
      submitting={submitting}
    >
      <>
        <div className="flex flex-col gap-4">
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
        <label className="label flex justify-end">
          {/* TODO: Add forgot password page route. */}
          <Link href="" className="label-text-alt link link-hover">
            Forgot Password?
          </Link>
        </label>
      </>
    </AuthFormContainer>
  );
}
