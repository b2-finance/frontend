import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormToggle from './form-toggle';

describe('FormToggle', () => {
  it('should render the closed content by default', () => {
    render(
      <FormToggle
        openForm={<></>}
        closedForm={<></>}
        openContent={{
          title: 'titleOpen',
          content: 'contentOpen',
          buttonText: 'buttonTextOpen'
        }}
        closedContent={{
          title: 'titleClosed',
          content: 'contentClosed',
          buttonText: 'buttonTextClosed'
        }}
      />
    );
    const header = screen.getByRole('heading', { name: 'titleClosed' });
    const content = screen.getByText('contentClosed');
    const button = screen.getByRole('button', { name: 'buttonTextClosed' });
    expect(header).toBeVisible();
    expect(content).toBeVisible();
    expect(button).toBeVisible();
  });

  // TODO: This is not working. Elements are still visible.
  // See this SO: https://stackoverflow.com/questions/71010317/react-testing-library-cant-read-styles-using-tailwind-css-classes
  // it('should hide the open content by default', () => {
  //   customRender(
  //     <FormToggle
  //       openForm={<></>}
  //       closedForm={<></>}
  //       openContent={{
  //         title: 'titleOpen',
  //         content: 'contentOpen',
  //         buttonText: 'buttonTextOpen'
  //       }}
  //       closedContent={{
  //         title: 'titleClosed',
  //         content: 'contentClosed',
  //         buttonText: 'buttonTextClosed'
  //       }}
  //     />
  //   );
  //   const header = screen.getByText('titleOpen');
  //   const content = screen.getByText('contentOpen');
  //   const button = screen.getByText('buttonTextOpen');
  //   expect(header).not.toBeVisible();
  //   expect(content).not.toBeVisible();
  //   expect(button).not.toBeVisible();
  // });
});
