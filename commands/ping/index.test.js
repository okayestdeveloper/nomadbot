const handler = require('./index.js');
const MockMessage = require('../../shared/message.mock');

describe('!ping', () => {
  let message;

  beforeEach(() => {
    message = new MockMessage();
  });

  it(`should reply with "U wot, m8?!"`, () => {
    handler({ message })
      .then((str) => expect(str).toEqual('U wot, m8?!'))
      .catch(() => expect(false).toEqual(true)) // should not get here
  });

  it(`should reject if there's some error`, () => {
    const errmsg = 'fake error';
    message.reply = jest.fn((msg) => Promise.reject(errmsg));
    handler({ message })
      .then(() => expect(false).toEqual(true)) // should not get here
      .catch((err) => expect(err).toEqual(errmsg));

  });
});
