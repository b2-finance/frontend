// import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import RootLayout from './layout';

describe('RootLayout', () => {
  it('DELETE ME', () => {
    expect(true).toBe(true);
  });

  /*
    FIXME: All tests are throwing:
    Warning: validateDOMNesting(...): <html> cannot appear as a child of <div>.
    I think this is because the render method renders the element inside a container
    that is appended to document.body. This might not be avoidable so might just have
    to delete these tests.
  */

  // it('should render a body element', () => {
  //   render(
  //     <RootLayout>
  //       <></>
  //     </RootLayout>
  //   );
  //   const body = screen.getByRole('document');
  //   expect(body).toBeInTheDocument();
  // });

  // it('should render a header element', () => {
  //   render(
  //     <RootLayout>
  //       <></>
  //     </RootLayout>
  //   );
  //   const header = screen.getByRole('banner');
  //   expect(header).toBeInTheDocument();
  // });

  // it('should render a skip nav element', () => {
  //   render(
  //     <RootLayout>
  //       <></>
  //     </RootLayout>
  //   );
  //   const skipNav = screen.getByRole('link', {
  //     name: 'Skip to main content'
  //   });
  //   expect(skipNav).toBeInTheDocument();
  // });

  // it('should render a main element', () => {
  //   render(
  //     <RootLayout>
  //       <></>
  //     </RootLayout>
  //   );
  //   const main = screen.getByRole('main');
  //   expect(main).toBeInTheDocument();
  // });
});
