const handler = require('./index.js');
const MockMessage = require('../../shared/message.mock');

describe('!ping', () => {
  let message;

  beforeEach(() => {
    message = new MockMessage();
  });

  it(`should reply with "U wot, m8?!"`, () => {
    return handler({ message })
      .then((str) => expect(str).toEqual('U wot, m8?!'));
  });

  it(`should reject if there's some error`, () => {
    const errmsg = 'fake error';
    message.reply = jest.fn((msg) => Promise.reject(errmsg));
    return handler({ message })
      .then(() => expect(1).toEqual(0))
      .catch((err) => expect(err).toEqual(errmsg));
  });
});
