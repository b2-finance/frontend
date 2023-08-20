import { login, logout, refresh, signup } from './auth-utils';

const mockJson = jest.fn();

describe('AuthUtils', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: mockJson
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('signup', () => {
    it.each([
      ['succeeds', {}],
      ['fails', { errors: ['Error!'] }]
    ])(
      'should call the appropriate callback function when signup %s',
      async (_: string, res: any) => {
        mockJson.mockResolvedValue(res);

        const onSuccessSpy = jest.fn();
        const onFailSpy = jest.fn();

        await signup({
          dto: {
            username: 'username',
            email: 'username@email.com',
            password: 'password'
          },
          onSuccess: onSuccessSpy,
          onFail: onFailSpy
        });
        expect(res.errors ? onFailSpy : onSuccessSpy).toHaveBeenCalledTimes(1);
      }
    );
  });

  describe('login', () => {
    it.each([
      ['succeeds', {}],
      ['fails', { errors: ['Error!'] }]
    ])(
      'should call the appropriate callback function when login %s',
      async (_: string, res: any) => {
        mockJson.mockResolvedValue(res);

        const onSuccessSpy = jest.fn();
        const onFailSpy = jest.fn();

        await login({
          dto: {
            username: 'username',
            password: 'password'
          },
          onSuccess: onSuccessSpy,
          onFail: onFailSpy
        });
        expect(res.errors ? onFailSpy : onSuccessSpy).toHaveBeenCalledTimes(1);
      }
    );
  });

  describe('logout', () => {
    it('should call onSuccess callback when logout succeeds', async () => {
      mockJson.mockResolvedValue({});

      const onSuccessSpy = jest.fn();
      const onFailSpy = jest.fn();

      await logout({
        onSuccess: onSuccessSpy,
        onFail: onFailSpy
      });
      expect(onSuccessSpy).toHaveBeenCalledTimes(1);
    });

    // TODO: Implement these.

    // FIXME: This is not working.
    // See https://stackoverflow.com/questions/59312671/mock-only-one-function-from-module-but-leave-rest-with-original-functionality
    // it('should call refresh once when logout fails', async () => {
    //   mockJson.mockResolvedValue({});

    //   const onSuccessSpy = jest.fn();
    //   const onFailSpy = jest.fn();

    //   await logout({
    //     onSuccess: onSuccessSpy,
    //     onFail: onFailSpy
    //   });
    //   expect(refresh).toHaveBeenCalledTimes(1);
    // });

    // it('should attempt logout 2 times when initial logout fails and refresh succeeds', () => {});
    // it('should call onSuccess callback when 2nd logout attempt succeeds', () => {});
    // it('should call onFail callback when refresh fails', () => {});
    // it('should call onFail callback when refresh succeeds and 2nd logout attempts fails', () => {});
  });

  describe('refresh', () => {
    it.each([
      ['succeeds', {}],
      ['fails', { errors: ['Error!'] }]
    ])(
      'should call the appropriate callback function when login %s',
      async (_: string, res: any) => {
        mockJson.mockResolvedValue(res);

        const onSuccessSpy = jest.fn();
        const onFailSpy = jest.fn();

        await refresh({
          onSuccess: onSuccessSpy,
          onFail: onFailSpy
        });
        expect(res.errors ? onFailSpy : onSuccessSpy).toHaveBeenCalledTimes(1);
      }
    );
  });
});
