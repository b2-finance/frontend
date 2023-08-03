import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SelfBlurringLink from './self-blurring-link';

describe('SelfBlurringLink', () => {
  it('should render a link', () => {
    render(<SelfBlurringLink href="/">Hello</SelfBlurringLink>);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('should render the child node (text)', () => {
    render(<SelfBlurringLink href="/">Hello</SelfBlurringLink>);
    const text = screen.getByText('Hello');
    expect(text).toBeInTheDocument();
  });

  it('should render the child node (element)', () => {
    render(
      <SelfBlurringLink href="/">
        <button>Hello</button>
      </SelfBlurringLink>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should remove focus form the link after click', async () => {
    const user = userEvent.setup();

    render(<SelfBlurringLink href="">Hello</SelfBlurringLink>);
    const link = screen.getByRole('link');

    await user.click(link);
    await waitFor(() => {
      expect(document.activeElement).not.toBe(link);
    });
  });
});
