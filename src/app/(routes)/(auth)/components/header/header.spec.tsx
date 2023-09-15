import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header, { PROFILE_LINKS } from './header';
import * as isLoggedInServer from '../functions/is-logged-in-server';
import { HeaderLinkProps } from './types';

jest.mock('../functions/is-logged-in-server', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('./menus/profile-menu-avatar', () => () => {
  return <div />;
});

describe(Header.name, () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render all expected links when user is logged in', () => {
    const countLinks = (links: HeaderLinkProps[]) =>
      links.reduce(
        (a, b) => a + (['auth', 'both'].includes(b.authMode) ? 1 : 0),
        0
      );

    const expectedLinkCount = countLinks(PROFILE_LINKS);

    jest.spyOn(isLoggedInServer, 'default').mockReturnValue(true);

    render(<Header />);

    const links = screen.queryAllByRole('link');
    expect(links.length).toEqual(expectedLinkCount);
  });

  it('should render all expected links when user is logged out', () => {
    const countLinks = (links: HeaderLinkProps[]) =>
      links.reduce(
        (a, b) => a + (['noAuth', 'both'].includes(b.authMode) ? 1 : 0),
        0
      );

    const expectedLinkCount = countLinks(PROFILE_LINKS);

    jest.spyOn(isLoggedInServer, 'default').mockReturnValue(false);

    render(<Header />);

    const links = screen.queryAllByRole('link');
    expect(links.length).toEqual(expectedLinkCount);
  });

  it('should render its children prop', () => {
    const childText = 'Hello world!';

    render(
      <Header>
        <>{childText}</>
      </Header>
    );

    const child = screen.getByText(childText);
    expect(child).toBeInTheDocument();
  });
});
