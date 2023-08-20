import fetchRequest from './fetch-request';

const mockJson = jest.fn();
const mockText = jest.fn();
const mockHeadersGet = jest.fn();

describe('fetchRequest', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: {
          get: mockHeadersGet
        },
        json: mockJson,
        text: mockText
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return the fetched json data when %s request succeeds',
    async (method: string) => {
      const data = { data: 123 };
      mockJson.mockResolvedValue(data);
      mockHeadersGet.mockReturnValue('application/json');

      const res = await fetchRequest({
        url: 'http://foo.com',
        options: { method }
      });
      expect(res).toEqual(data);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return the fetched text data when %s request succeeds',
    async (method: string) => {
      const data = 'Foo Bar';
      mockText.mockResolvedValue(data);
      mockHeadersGet.mockReturnValue('text/example');

      const res = await fetchRequest({
        url: 'http://foo.com',
        options: { method }
      });
      expect(res).toEqual({ data });
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return the errors when %s request fails',
    async (method: string) => {
      const errors = { errors: ['Error!', 'More errors!'] };
      mockJson.mockResolvedValue(errors);
      mockHeadersGet.mockReturnValue('application/json');

      const res = await fetchRequest({
        url: 'http://foo.com',
        options: { method }
      });
      expect(res).toEqual(errors);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return the status code when %s request returns',
    async (method: string) => {
      const status = { status: 399 };
      mockJson.mockResolvedValue(status);
      mockHeadersGet.mockReturnValue('application/json');

      const res = await fetchRequest({
        url: 'http://foo.com',
        options: { method }
      });
      expect(res).toEqual(status);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return all other properties in the response object',
    async (method: string) => {
      const response = { data: ['1', '2'], foo: 'abc', bar: 123 };
      mockJson.mockResolvedValue(response);
      mockHeadersGet.mockReturnValue('application/json');

      const res = await fetchRequest({
        url: 'http://foo.com',
        options: { method }
      });
      expect(res).toEqual(response);
    }
  );
});
