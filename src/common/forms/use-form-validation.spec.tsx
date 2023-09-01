import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import useFormValidation, { FieldValidations } from './use-form-validation';
import { useState } from 'react';

function TestComponent({ props }: { props: FieldValidations }) {
  const { fieldState, handleFieldChange, validateFields } =
    useFormValidation(props);

  const [errors, setErrors] = useState<string[] | null>(null);

  return (
    <>
      {Object.keys(props).map((key, i) => (
        <input
          type="text"
          key={key}
          name={key}
          value={fieldState[key]?.value ?? ''}
          placeholder={'input' + (i + 1)}
          onChange={handleFieldChange}
        />
      ))}
      <button onClick={() => setErrors(validateFields())}>Validate</button>
      {errors?.map((err, i) => <div key={i}>{err}</div>)}
    </>
  );
}

describe(useFormValidation.name, () => {
  describe('fieldState/handleFieldChange', () => {
    it('should update the field state when user types', async () => {
      const user = userEvent.setup();

      render(
        <TestComponent
          props={{
            input1: {},
            input2: {}
          }}
        />
      );
      const input1 = screen.getByPlaceholderText('input1') as HTMLInputElement;
      const input2 = screen.getByPlaceholderText('input2') as HTMLInputElement;

      const userInput1 = 'abc';
      const userInput2 = 'xyz';

      await user.type(input1, userInput1);
      await user.type(input2, userInput2);

      expect(input1.value).toBe(userInput1);
      expect(input2.value).toBe(userInput2);
    });
  });

  describe('validateFields', () => {
    it.each([
      [/^[0-9]+$/, '', true],
      [/^[0-9]+$/, ' ', true],
      [/^[0-9]+$/, 'x', true],
      [/^[0-9]+$/, 'x1', true],
      [/^[0-9]+$/, '1x', true],
      [/^[0-9]+$/, '1', false],
      [/^[0-9]+$/, '123', false],
      [/^[0-9]+$/, '123 456', true],
      [/^[^\s]+$/, '', true],
      [/^[^\s]+$/, ' ', true],
      [/^[^\s]+$/, 'abc', false],
      [/^[^\s]+$/, 'abc xyz', true],
      [/^.*$/, '', false],
      [/^.*$/, ' ', false],
      [/^.*$/, 'x', false]
    ])(
      'should return expected errors/no errors when input fails/passes regex',
      async (regex: RegExp, userInput: string, hasErrors: boolean) => {
        const user = userEvent.setup();
        const error = 'Invalid input!';

        render(<TestComponent props={{ input1: { regex, error } }} />);

        const input = screen.getByPlaceholderText('input1') as HTMLInputElement;
        const button = screen.getByRole('button');

        userInput && (await user.type(input, userInput));
        await user.click(button);

        await waitFor(() => {
          const errors = screen.queryByText(error);
          if (hasErrors) expect(errors).toBeInTheDocument();
          else expect(errors).not.toBeInTheDocument();
        });
      }
    );
  });
});
