import bffB2Request from './bff-b2-request';
import * as AuthUtils from '../auth/auth-utils';

jest.mock('../../bff-utils/auth/auth-utils');

const mockJson = jest.fn();
let mockStatus: any;

describe('bffB2Request', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: mockJson,
        status: mockStatus
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    mockStatus = null;
    jest.resetAllMocks();
  });

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return the fetched data when %s request succeeds',
    async (method: string) => {
      const data = { data: 123 };
      mockJson.mockResolvedValue({ data });

      const res = await bffB2Request({
        path: '/foo/bar',
        options: { method }
      });
      expect(res.data).toEqual(data);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should not call refresh when %s request succeeds',
    async (method: string) => {
      const data = { data: 123 };
      mockJson.mockResolvedValue({ data });

      await bffB2Request({
        path: '/foo/bar',
        options: { method }
      });
      expect(AuthUtils.refresh).not.toHaveBeenCalled();
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should call fetch once when %s request succeeds',
    async (method: string) => {
      const data = { data: 123 };
      mockJson.mockResolvedValue({ data });

      await bffB2Request({
        path: '/foo/bar',
        options: { method }
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return the errors when %s request fails',
    async (method: string) => {
      const errors = ['error1', 'error2'];
      mockJson.mockResolvedValue({ errors });
      mockStatus = 400;

      jest.spyOn(console, 'error').mockImplementation(() => {});

      const res = await bffB2Request({
        path: '/foo/bar',
        options: { method }
      });
      expect(res.errors).toEqual(errors);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should attempt to refresh tokens once when %s request fails with 401 status',
    async (method: string) => {
      mockJson.mockResolvedValue({ errors: ['error1'] });
      mockStatus = 401;

      jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(console, 'log').mockImplementation(() => {});

      await bffB2Request({
        path: '/foo/bar',
        options: { method }
      });
      expect(AuthUtils.refresh).toHaveBeenCalledTimes(1);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should call fetch 2 times when %s request fails with 401 status',
    async (method: string) => {
      mockJson.mockResolvedValue({ errors: ['error1'] });
      mockStatus = 401;

      jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(console, 'log').mockImplementation(() => {});

      await bffB2Request({
        path: '/foo/bar',
        options: { method }
      });
      expect(global.fetch).toHaveBeenCalledTimes(2);
    }
  );
});
