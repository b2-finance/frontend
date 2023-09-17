import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Breadcrumbs from './breadcrumbs';
import * as b2ClientFetch from '@/common/fetch/b2-client-fetch';

jest.mock('../../../../../common/fetch/b2-client-fetch');

let mockPathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname()
}));

describe(Breadcrumbs.name, () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([['foo'], ['foo', 'bar'], ['foo', 'bar', 'baz']])(
    'should render the expected pathname',
    (...path) => {
      mockPathname.mockReturnValue(path.reduce((a, b) => a + '/' + b, '/'));
      render(<Breadcrumbs />);

      for (const breadcrumb of path) {
        expect(screen.getByText(breadcrumb)).toBeInTheDocument();
      }
    }
  );

  it('should render the username', async () => {
    const username = 'username';
    mockPathname.mockReturnValue('/foo/bar');

    jest
      .spyOn(b2ClientFetch, 'default')
      .mockResolvedValue({ data: { username } });

    render(<Breadcrumbs />);

    const usernameBreadcrumb = await screen.findByText(username);
    expect(usernameBreadcrumb).toBeInTheDocument();
  });
});
