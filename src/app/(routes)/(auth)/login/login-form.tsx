import Link from 'next/link';

/**
 * Displays a login form.
 *
 * @returns A JSX element.
 */
export default function LoginForm() {
  return (
    <div className="flex flex-col grow basis-0 justify-center gap-6 p-8 bg-base-100">
      <div className="flex justify-center">
        <h2 className="card-title text-4xl text-base-content text-center">
          Log In
        </h2>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered text-base-content"
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered text-base-content"
            />
          </div>
        </div>
        <label className="label">
          <Link href="" className="label-text-alt link link-hover">
            Forgot Password?
          </Link>
        </label>
      </div>
      <div className="form-control">
        <button className="btn btn-primary">Log In</button>
      </div>
    </div>
  );
}
