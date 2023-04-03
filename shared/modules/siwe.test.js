import { isValidSIWEOrigin } from './siwe';

describe('siwe', () => {
  describe('isValidSIWEOrigin', () => {
    const msg = {
      domain: 'example.com',
      address: '0x0',
      statement: '',
      uri: 'https://example.com',
      version: '1',
      chainId: '1',
      nonce: '',
      issuedAt: '',
      expirationTime: null,
      notBefore: null,
      requestId: 'foo',
      resources: [],
    };
    const checks = [
      {
        name: 'identical domain',
        expected: true,
        cases: [
          {
            domain: 'example.com',
            origin: 'https://example.com',
          },
          {
            domain: 'example.com',
            origin: 'https://user:password@example.com',
          },
          /*
          {
            domain: 'example.com',
            origin: 'http://user:password@example.com:8090',
          },
          */
          /*
          {
            domain: 'example.com',
            origin: 'http://example.com:8090',
          },
          */
          {
            domain: 'example.com',
            origin: 'https://example.com:443',
          },
        ],
      },
      {
        name: 'matching domain and port',
        expected: true,
        cases: [
          /*
          {
            domain: 'example.com:443',
            origin: 'https://example.com:443',
          },
          */
          /*
          {
            domain: 'example.com:443',
            origin: 'https://example.com',
          },
          */
          /*
          {
            domain: 'example.com:443',
            origin: 'https://example.com:443',
          },
          */
          /*
          {
            domain: 'example.com:80',
            origin: 'http://example.com',
          },
          */
          /*
          {
            domain: 'example.com:80',
            origin: 'http://example.com:80',
          },
          */
          {
            domain: 'example.com:8090',
            origin: 'http://example.com:8090',
          },
          {
            domain: 'example.com:8080',
            origin: 'https://example.com:8080',
          },
        ],
      },
      {
        name: 'matching userinfo',
        expected: true,
        cases: [
          // TODO: These should pass
          /*
          {
            domain: 'alice@example.com',
            origin: 'https://alice:password@example.com',
          },
          {
            domain: 'alice@example.com',
            origin: 'https://alice@example.com',
          },
          {
            domain: 'alice@example.com:8090',
            origin: 'https://alice@example.com:8090',
          },
          */
        ],
      },
      {
        name: 'mismatching userinfo',
        expected: false,
        cases: [
          {
            domain: 'alice@example.com',
            origin: 'https://bob@example.com',
          },
          {
            domain: 'alice@example.com',
            origin: 'https://example.com',
          },
          {
            domain: 'alice@example.com:8090',
            origin: 'https://bob:alice@example.com:8090',
          },
        ],
      },
      {
        name: 'mismatching domain',
        expected: false,
        cases: [
          {
            domain: 'example.com',
            origin: 'http://www.example.com',
          },
          {
            domain: 'www.example.com',
            origin: 'http://example.com',
          },
          {
            domain: 'localhost',
            origin: 'http://127.0.0.1',
          },
          {
            domain: '127.0.0.1',
            origin: 'http://localhost',
          },
        ],
      },
      {
        name: 'mismatching port',
        expected: false,
        cases: [
          {
            domain: 'www.example.com:8091',
            origin: 'http://www.example.com:8090',
          },
          {
            domain: 'www.example.com:8091',
            origin: 'https://www.example.com:8090',
          },
          {
            domain: 'example.com:8090',
            origin: 'http://example.com',
          },
          {
            domain: '127.0.0.1:8090',
            origin: 'https://127.0.0.1',
          },
          {
            domain: '127.0.0.1:8090',
            origin: 'http://localhost',
          },
        ],
      },
    ];
    for (const { name, expected, cases } of checks) {
      for (const { domain, origin } of cases) {
        it(`should return ${expected} for ${name} ${JSON.stringify({domain,origin})}`, () => {
          const result = isValidSIWEOrigin({
            from: '0x0',
            origin,
            siwe: {
              ...msg,
              domain,
            },
          });
          expect(result).toBe(expected);
        });
      }
    }
  });
});
