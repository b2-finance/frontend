import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextField from './text-field';
import userEvent from '@testing-library/user-event';

describe(TextField.name, () => {
  it('should render an input field with expected placeholder', () => {
    const placeholder = 'test-placeholder';
    render(<TextField type={'text'} placeholder={placeholder} />);
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  it('should render the expected icon', () => {
    const iconText = 'Hello';
    render(<TextField type={'text'} startIcon={<div>{iconText}</div>} />);
    const icon = screen.getByText(iconText);
    expect(icon).toBeInTheDocument();
  });

  it('should call the expected handleChange function', async () => {
    const user = userEvent.setup();
    const placeholder = 'test-placeholder';
    const userInput = 'Hello World!';
    const handleChangeOutput = 'Goodbye World!';
    const handleChange = (event: any) =>
      (event.target.value = handleChangeOutput);

    render(
      <TextField
        type={'text'}
        placeholder={placeholder}
        handleChange={handleChange}
      />
    );
    const input = screen.getByPlaceholderText(placeholder) as HTMLInputElement;

    await user.type(input, userInput);
    expect(input.value).toEqual(handleChangeOutput);
  });
});
