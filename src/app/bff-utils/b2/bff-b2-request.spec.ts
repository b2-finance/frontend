import bffB2Request from './bff-b2-request';
import * as fetchRequest from '@/common/fetch-request';
import * as AuthUtils from '../../bff-utils/auth-utils';

jest.mock('../../../common/fetch-request');
jest.mock('../../bff-utils/auth-utils');

describe('bffB2Request', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return the fetched data when %s request succeeds',
    async (method: string) => {
      const data = { data: 123 };
      jest
        .spyOn(fetchRequest, 'default')
        .mockResolvedValue({ data, status: 200 });

      const res = await bffB2Request({
        path: '/foo/bar',
        options: { method }
      });
      expect(res.data).toEqual(data);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should call fetchRequest once when %s request succeeds',
    async (method: string) => {
      const data = { data: 123 };
      const fetchRequestSpy = jest
        .spyOn(fetchRequest, 'default')
        .mockResolvedValue({ data, status: 200 });

      await bffB2Request({
        path: '/foo/bar',
        options: { method }
      });
      expect(fetchRequestSpy).toHaveBeenCalledTimes(1);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return the errors when %s request fails',
    async (method: string) => {
      const errors = ['error1', 'error2'];
      jest
        .spyOn(fetchRequest, 'default')
        .mockResolvedValue({ errors, status: 400 });

      jest.spyOn(console, 'error').mockImplementation(() => {});

      const res = await bffB2Request({
        path: '/foo/bar',
        options: { method }
      });
      expect(res.errors).toEqual(errors);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should attempt to refresh tokens once %s request fails with 401 status',
    async (method: string) => {
      jest
        .spyOn(fetchRequest, 'default')
        .mockResolvedValue({ errors: ['error1'], status: 401 });

      jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(console, 'log').mockImplementation(() => {});
      jest.spyOn(AuthUtils, 'refresh').mockImplementation(async () => {});

      await bffB2Request({
        path: '/foo/bar',
        options: { method }
      });
      expect(AuthUtils.refresh).toHaveBeenCalledTimes(1);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should call fetchRequest 2 times when %s request fails with 401 status',
    async (method: string) => {
      const fetchRequestSpy = jest
        .spyOn(fetchRequest, 'default')
        .mockResolvedValue({ errors: ['error1'], status: 401 });

      jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(console, 'log').mockImplementation(() => {});
      jest.spyOn(AuthUtils, 'refresh').mockImplementation(async () => {});

      await bffB2Request({
        path: '/foo/bar',
        options: { method }
      });
      expect(fetchRequestSpy).toHaveBeenCalledTimes(2);
    }
  );
});
