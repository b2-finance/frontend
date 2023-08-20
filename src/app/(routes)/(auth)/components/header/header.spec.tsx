import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header, { ALL_NAV_LINKS, ALL_PROFILE_LINKS } from './header';
import * as isLoggedInServer from '../functions/is-logged-in-server';
import { NavigationLinkProps } from './types';

jest.mock('../functions/is-logged-in-server', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('./menus/profile-menu-avatar', () => () => {
  return <div />;
});

describe('Header', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render all expected links when user is logged in', async () => {
    const countLinks = (links: NavigationLinkProps[]) =>
      links.reduce(
        (a, b) => a + (['auth', 'both'].includes(b.authMode) ? 1 : 0),
        0
      );

    // ALL_NAV_LINKS are displayed twice, on hamburger menu and nav menu.
    const expectedLinkCount =
      countLinks(ALL_NAV_LINKS) * 2 + countLinks(ALL_PROFILE_LINKS);

    jest.spyOn(isLoggedInServer, 'default').mockReturnValue(true);

    render(<Header />);

    const links = await screen.findAllByRole('link');
    expect(links.length).toEqual(expectedLinkCount);
  });

  it('should render all expected links when user is logged out', async () => {
    const countLinks = (links: NavigationLinkProps[]) =>
      links.reduce(
        (a, b) => a + (['noAuth', 'both'].includes(b.authMode) ? 1 : 0),
        0
      );

    // ALL_NAV_LINKS are displayed twice, on hamburger menu and nav menu.
    const expectedLinkCount =
      countLinks(ALL_NAV_LINKS) * 2 + countLinks(ALL_PROFILE_LINKS);

    jest.spyOn(isLoggedInServer, 'default').mockReturnValue(false);

    render(<Header />);

    const links = await screen.findAllByRole('link');
    expect(links.length).toEqual(expectedLinkCount);
  });

  // TODO: Implement these.
  // it('should hide the hamburger menu when screen size is >= tablet size', () => {});
  // it('should show the hamburger menu when screen size is < tablet size', () => {});
  // it('should hide the nav menu when screen size is < tablet size', () => {});
  // it('should show the nav menu when screen size is >= tablet size', () => {});
});
