import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import NavbarSubmenu from './navbar-submenu';

describe(NavbarSubmenu.name, () => {
  it('should render the title', () => {
    const title = 'title';

    render(
      <NavbarSubmenu
        title={title}
        links={[]}
        active={'/'}
        handleClick={() => {}}
      />
    );

    const t = screen.getByText(title);
    expect(t).toBeInTheDocument();
  });

  it('should render all links', () => {
    const links = [
      { href: '/href1', icon: <div>icon1</div>, label: 'label1' },
      { href: '/href2', icon: <div>icon2</div>, label: 'label2' },
      { href: '/href3', icon: <div>icon3</div>, label: 'label3' }
    ];

    render(
      <NavbarSubmenu
        title={'title'}
        links={links}
        active={'/'}
        handleClick={() => {}}
      />
    );

    for (let i = 1; i <= links.length; i++) {
      const link = screen.getByRole('link', { name: `icon${i} label${i}` });
      expect(link).toBeInTheDocument();
    }
  });

  it('should call the handleClick function when link clicked', async () => {
    const mockHandleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <NavbarSubmenu
        title={'title'}
        links={[{ href: '/href', icon: <div>icon</div>, label: 'label' }]}
        active={'/'}
        handleClick={mockHandleClick}
      />
    );

    /*
      The below error occurs because navigation is not implemented in JSDOM.
      This is fine, but I just want to suppress the error message.
      Error: Not implemented: navigation (except hash changes).
    */
    jest.spyOn(global.console, 'error').mockImplementation(() => {});

    const link = screen.getByRole('link');
    await user.click(link);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
