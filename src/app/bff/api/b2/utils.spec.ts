import { NextURL } from 'next/dist/server/web/next-url';
import { b2Url, bffB2Url } from './utils';
import { BFF_API_B2 } from '../../paths';

describe('b2/utils', () => {
  const OLD_ENV = process.env;

  afterEach(() => {
    jest.restoreAllMocks();
    process.env = OLD_ENV;
  });

  describe('b2Url', () => {
    it.each([
      ['http://localhost:8080', '', 'http://localhost:8080'],
      ['http://localhost:8080/', '', 'http://localhost:8080'],
      [
        'http://localhost:8080',
        '?path=%2Fusers%2F1234-5678',
        'http://localhost:8080/users/1234-5678'
      ],
      [
        'http://localhost:8080',
        '?path=%2Fusers%2F1234-5678%3F',
        'http://localhost:8080/users/1234-5678?'
      ],
      [
        'http://localhost:8080',
        '?path=%2Fusers%2F1234-5678%3Ffoo%3Dbar',
        'http://localhost:8080/users/1234-5678?foo=bar'
      ],
      [
        'http://localhost:8080',
        '?path=%2Fusers%2F1234-5678%3Ffoo%3Dbar%26baz%3Dbat',
        'http://localhost:8080/users/1234-5678?foo=bar&baz=bat'
      ],
      [
        'http://localhost:8080/',
        '?path=users%2F1234-5678%3Ffoo%3Dbar%26baz%3Dbat',
        'http://localhost:8080/users/1234-5678?foo=bar&baz=bat'
      ],
      [
        'http://localhost:8080/',
        '?path=%2Fusers%2F1234-5678%3Ffoo%3Dbar%26baz%3Dbat',
        'http://localhost:8080/users/1234-5678?foo=bar&baz=bat'
      ]
    ])(
      'should convert a bffB2Url to the expected b2 url',
      (B2_ENDPOINT: string, search: string, expected: string) => {
        process.env = { ...OLD_ENV, B2_ENDPOINT };

        const actual = b2Url({ pathname: BFF_API_B2, search } as NextURL);
        expect(actual).toEqual(expected);
      }
    );
  });

  describe('bffB2Url', () => {
    it.each([
      ['/foo/bar', BFF_API_B2 + '?path=%2Ffoo%2Fbar'],
      ['/foo/bar?baz=bat', BFF_API_B2 + '?path=%2Ffoo%2Fbar%3Fbaz%3Dbat'],
      [
        '/foo/bar?baz=bat&zaz=zat',
        BFF_API_B2 + '?path=%2Ffoo%2Fbar%3Fbaz%3Dbat%26zaz%3Dzat'
      ]
    ])(
      'should convert a relative url to a BFF url',
      (path: string, expected: string) => {
        const actual = bffB2Url(path);
        expect(actual).toEqual(expected);
      }
    );

    it.each([
      ['empty', ''],
      ['null', null],
      ['undefined', undefined]
    ])(
      'should return the BFF base path if path is %s',
      (_: string, path: any) => {
        const actual = bffB2Url(path);
        expect(actual).toEqual(BFF_API_B2);
      }
    );
  });
});
