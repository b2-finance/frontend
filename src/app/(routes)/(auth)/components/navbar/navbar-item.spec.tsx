import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavbarItem from './navbar-item';

describe(NavbarItem.name, () => {
  const itemContent = 'icon_content';
  const icon = <div id="item">{itemContent}</div>;
  const label = 'link_label';
  const baseUrl = 'http://localhost';

  let item: JSX.Element;

  describe('with href', () => {
    let href: string;

    beforeEach(() => {
      href = '/foo/bar';
      item = <NavbarItem href={href} icon={icon} label={label} active={true} />;
    });

    it('should render the icon', () => {
      render(item);
      const icon = screen.getByText(itemContent);
      expect(icon).toBeInTheDocument();
    });

    it('should render a link', () => {
      render(item);
      const link = screen.getByRole('link') as HTMLAnchorElement;
      expect(link).toBeInTheDocument();
      expect(link.href).toEqual(baseUrl + href);
    });

    /*
      TODO: Tailwind classes do not seem to be working. Tried this:
      https://stackoverflow.com/questions/71010317/react-testing-library-cant-read-styles-using-tailwind-css-classes
      but that didn't work.
    */
    // it('should render a tooltip on hover', async () => {});
    // it('should hide the tooltip when not hovering', async () => {});
  });

  describe('without href', () => {
    beforeEach(() => {
      item = <NavbarItem icon={icon} label={label} active={true} />;
    });

    it('should render the icon', () => {
      render(item);
      const icon = screen.getByText(itemContent);
      expect(icon).toBeInTheDocument();
    });

    it('should not render a link', () => {
      render(item);
      const link = screen.queryByRole('link');
      expect(link).not.toBeInTheDocument();
    });
  });
});
