import fetchResponseHandler from './fetch-response-handler';

const mockHeadersGet = jest.fn();
const mockJson = jest.fn();
const mockText = jest.fn();

describe(fetchResponseHandler.name, () => {
  let mockOk: boolean | undefined;

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: { get: mockHeadersGet },
        json: mockJson,
        text: mockText,
        ok: mockOk
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    mockOk = undefined;
    jest.restoreAllMocks();
  });

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return the fetched json data when %s request succeeds',
    async (method: string) => {
      const data = { data: 123 };
      mockJson.mockResolvedValue(data);
      mockHeadersGet.mockReturnValue('application/json');
      mockOk = true;

      const res = await fetch('/foo', { method });

      const { data: actual } = await fetchResponseHandler(res);
      expect(actual).toEqual(data);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return the fetched text data when %s request succeeds',
    async (method: string) => {
      const data = 'Foo Bar';
      mockText.mockResolvedValue(data);
      mockHeadersGet.mockReturnValue('text/example');
      mockOk = true;

      const res = await fetch('/foo', { method });

      const { data: actual } = await fetchResponseHandler(res);
      expect(actual).toEqual(data);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return an array of errors when %s request fails with array of error messages',
    async (method: string) => {
      const message = ['Error1', 'Error2'];
      mockJson.mockResolvedValue({ message });
      mockHeadersGet.mockReturnValue('application/json');
      mockOk = false;

      const res = await fetch('/foo', { method });
      const { errors } = await fetchResponseHandler(res);

      expect(errors).toEqual(message);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should return an array of errors when %s request fails with a string error message',
    async (method: string) => {
      const message = 'Error';
      mockJson.mockResolvedValue({ message });
      mockHeadersGet.mockReturnValue('application/json');
      mockOk = false;

      const res = await fetch('/foo', { method });
      const { errors } = await fetchResponseHandler(res);

      expect(errors).toEqual([message]);
    }
  );

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should throw an error when unable to parse the data',
    async (method: string) => {
      mockHeadersGet.mockReturnValue('some-other-content-type');
      jest.spyOn(global.console, 'error').mockImplementation(() => {});

      const res = await fetch('/foo', { method });

      expect(async () => await fetchResponseHandler(res)).rejects.toThrow(
        Error
      );
    }
  );
});
