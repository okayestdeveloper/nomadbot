const handler = require('./index.js');
const MockMessage = require('../../shared/message.mock');

describe('!notacult', () => {
  let message;

  beforeEach(() => {
    message = new MockMessage();
  });

  it(`should reply with "Totally."`, () => {
    return handler({ message })
      .then((str) => expect(str).toEqual('Totally.'));
  });

  it(`should reject if there's some error`, () => {
    const errmsg = 'fake error';
    message.reply = jest.fn((msg) => Promise.reject(errmsg));
    return handler({ message })
      .then(() => expect(1).toEqual(0))
      .catch((err) => expect(err).toEqual(errmsg));
  });
});
