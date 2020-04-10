const handler = require('./index.js');
const MockMessage = require('../../shared/message.mock');

describe('!greatdivide', () => {
  let message;

  beforeEach(() => {
    message = new MockMessage();
  });

  it(`should reply with quite a long and vulgar sentance.`, () => {
    return handler({ message })
      .then((str) => {
        expect(str).toEqual("Fuck those fucking fuckers with a nailbat in the ass.");
      });
  });

  it(`should reject if there's some error`, () => {
    const errmsg = 'fake error';
    message.reply = jest.fn((msg) => Promise.reject(errmsg));
    return handler({ message })
      .catch((err) => expect(err).toEqual(errmsg));
  });
});
