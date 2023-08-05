/**
 * Displays a signup form.
 *
 * @returns A JSX element.
 */
export default function SignupForm() {
  return (
    <div className="flex flex-col grow basis-0 justify-center gap-6 p-8 bg-base-100">
      <div className="flex justify-center">
        <h2 className="card-title text-4xl text-base-content text-center">
          Sign Up
        </h2>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered text-base-content"
            />
          </div>
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
      </div>
      <div className="form-control">
        <button className="btn btn-primary">Create Account</button>
      </div>
    </div>
  );
}
