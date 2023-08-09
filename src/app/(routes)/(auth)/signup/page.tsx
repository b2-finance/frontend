import Link from 'next/link';
import B2Icon from '../../../components/icons/b2-icon';
import SignupForm from './signup-form';
import routes from '@/utils/routes';

/**
 * Displays a signup form.
 *
 * @returns A JSX element.
 */
export default function SignupPage() {
  return (
    <div className="flex flex-col w-screen h-screen items-center">
      <Link className="mt-8" href={routes.home}>
        <B2Icon color="primary" />
      </Link>
      <div className="w-full max-w-[24rem]">
        <SignupForm />
      </div>
    </div>
  );
}
