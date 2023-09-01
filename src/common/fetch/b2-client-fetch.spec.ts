import b2ClientFetch from './b2-client-fetch';

jest.mock('./fetch-response-handler');

describe(b2ClientFetch.name, () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([['GET'], ['POST'], ['PATCH'], ['PUT'], ['DELETE']])(
    'should perform %s fetch request',
    async (method: string) => {
      await b2ClientFetch('/foo', { method });
      expect(global.fetch).toHaveBeenCalledTimes(1);
    }
  );
});
