'use client';

import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';

/**
 * Props for the {@link AuthFormContainer} component.
 */
export interface AuthFormContainerProps {
  /**
   * The form title.
   */
  title: string;
  /**
   * Props for the form submit button.
   */
  submit: {
    /**
     * The submit button label.
     */
    label: string;
    /**
     * The action to perform on submit.
     */
    action: MouseEventHandler<HTMLButtonElement>;
  };
  /**
   * A link to another auth form.
   */
  switchAuthForm?: {
    /**
     * A question/message prompting the user to switch forms.
     */
    prompt: string;
    /**
     * The label of the link to the other auth form.
     */
    linkLabel: string;
    /**
     * The route to the other auth form.
     */
    route: string;
  };
  /**
   * Errors on the form.
   */
  errors?: string[];
  /**
   * True when the form is in the process of submitting.
   */
  submitting?: boolean;
  /**
   * The fields of the form.
   */
  children: ReactNode;
}

/**
 * A container for standardizing the auth form pages.
 *
 * @param props {@link AuthFormContainerProps}
 * @returns A JSX element.
 */
export default function AuthFormContainer({
  title,
  submit,
  switchAuthForm,
  errors,
  submitting = false,
  children
}: AuthFormContainerProps) {
  return (
    <div className={submitting ? 'pointer-events-none' : ''}>
      <div className="flex flex-col grow basis-0 justify-center gap-6 p-8">
        <div className="flex justify-center">
          <h2 className="text-4xl font-bold text-base-content text-center">
            {title}
          </h2>
        </div>
        {errors && (
          <div className="alert flex flex-col gap-2 rounded-lg">
            {errors.map((e) => (
              <div key={e} className="text-error text-left text-xs">
                {e}
              </div>
            ))}
          </div>
        )}
        {switchAuthForm && (
          <div className="flex justify-center label-text-alt">
            {switchAuthForm.prompt}&nbsp;
            <Link
              href={switchAuthForm.route}
              className="label-text-alt link link-hover text-secondary"
            >
              {switchAuthForm.linkLabel}
            </Link>
          </div>
        )}
        <div>{children}</div>
        <div className="form-control">
          <button
            className={
              submitting ? 'btn btn-primary disabled' : 'btn btn-primary'
            }
            onClick={submit.action}
          >
            {submitting && <span className="loading loading-spinner" />}
            {submit.label}
          </button>
        </div>
      </div>
    </div>
  );
}
