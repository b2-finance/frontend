'use client';

import { ChangeEventHandler, cloneElement } from 'react';

/**
 * Props for the {@link TextField} component.
 */
export interface TextFieldProps {
  id?: string;
  type: 'text' | 'email' | 'password';
  name?: string;
  placeholder?: string;
  value?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  startIcon?: JSX.Element;
}

/**
 * An input field with an optional icon.
 *
 * @param props {@link TextFieldProps}
 * @returns A JSX element.
 */
export default function TextField({
  id,
  type,
  name,
  value,
  placeholder,
  handleChange,
  startIcon
}: TextFieldProps) {
  return (
    <div className="relative form-control">
      {startIcon && (
        <>
          {cloneElement(startIcon, {
            className:
              'absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4 pointer-events-none'
          })}
        </>
      )}
      <input
        id={id}
        className={
          startIcon
            ? 'input input-bordered text-base-content pl-11'
            : 'input input-bordered text-base-content'
        }
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
