import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkipNav from './skip-nav';

describe(SkipNav.name, () => {
  it('should render an anchor element', () => {
    render(<SkipNav mainId="test-main-id" />);
    const anchor = screen.getByRole('link');
    expect(anchor).toBeInTheDocument();
  });

  it('should render an anchor element with correct text', () => {
    render(<SkipNav mainId="test-main-id" />);

    const anchor = screen.getByRole('link', {
      name: 'Skip to main content'
    });
    expect(anchor).toBeInTheDocument();
  });

  // it('should initially hide the anchor element', () => {
  //   /*
  //     TODO: Implement this. I wanted to use getBoundingClientRect() to check that the bottom
  //     is < 0 (i.e., element if off screen) but getBoundingRect() returns all 0s.
  //   */
  // });

  // TODO: This is not working. document.activeElement is anchor, even after clicking.
  // it('should move focus to main element when clicked', async () => {
  //   const user = userEvent.setup();
  //   const mainId = 'test-main-id';

  //   render(
  //     <div>
  //       <SkipNav mainId={mainId} />
  //       <main tabIndex={0} id={mainId} />
  //     </div>
  //   );
  //   const anchor = screen.getByRole('link', {
  //     name: 'Skip to main content'
  //   });
  //   const main = screen.getByRole('main');

  //   await user.click(anchor);
  //   await waitFor(() => expect(document.activeElement).toEqual(main));
  // });
});
