import { useEffect, useState } from 'react';

/**
 * Specifies the initial value and validation conditions of a form field.
 */
export interface FieldValidations {
  /**
   * The name of the field.
   */
  [key: string]: {
    /**
     * The initial value of the field.
     *
     * @default empty string
     */
    initialValue?: string;
    /**
     * A regular expression to validate the value.
     */
    regex?: RegExp;
    /**
     * An error message to display.
     */
    error?: string;
  };
}

/**
 * Contains field names as keys, with their values and error states.
 */
export interface FieldState {
  [key: string]: {
    value: string;
    error: string;
  };
}

/**
 * The return type of the {@link useFormValidation} hook.
 */
export interface FormValidation {
  fieldState: FieldState;
  handleFieldChange: (event: any) => void;
  validateFields: () => string[] | null;
}

/**
 * Handles form validation.
 *
 * @param fields {@link FieldValidations}
 * @returns A {@link FormValidation}.
 */
export default function useFormValidation(fields: FieldValidations) {
  const [fieldState, setFieldState] = useState<FieldState>({});

  // Initialize the field state from props.
  useEffect(() => {
    const fs: FieldState = {};

    for (const [name, { initialValue }] of Object.entries(fields))
      fs[name] = { value: initialValue ?? '', error: '' };

    setFieldState(fs);
  }, []);

  /**
   * Updates the field state when input changes.
   *
   * @param event An HTML input element change event.
   */
  const handleFieldChange = (event: any): void => {
    const { name, value } = event.target;
    setFieldState((prev) => ({
      ...prev,
      [name]: { ...prev[name], value }
    }));
  };

  /**
   * Validates all fields based on the conditions set in the initial {@link FieldValidations}
   * and updates the error attribute of the {@link FieldState}.
   *
   * @returns A list of all errors found, or null if no errors.
   */
  const validateFields = (): string[] | null => {
    const errors: string[] = [];

    for (const [name, { value }] of Object.entries(fieldState)) {
      const { regex, error } = fields[name];
      let hasError: boolean = false;

      if (regex && !regex.test(value)) {
        errors.push(error ?? `Invalid ${name}.`);
        hasError = true;
      }

      setFieldState((prev) => ({
        ...prev,
        [name]: { ...prev[name], ...(hasError && { error }) }
      }));
    }
    return errors.length ? errors : null;
  };

  return {
    fieldState,
    handleFieldChange,
    validateFields
  };
}
