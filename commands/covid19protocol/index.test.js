const handler = require('./index.js');
const MockMessage = require('../../shared/message.mock');

describe('!covid19protocol', () => {
  let message;

  beforeEach(() => {
    message = new MockMessage();
  });

  it(`should reply with "Hide yo kids, hide yo wife. Cause they rapin' errbody up in here. Also wash yo hands."`, () => {
    return handler({ message })
      .then((str) => expect(str).toEqual(`Hide yo kids, hide yo wife. Cause they rapin' errbody up in here. Also wash yo hands.`));
  });

  it(`should reject if there's some error`, () => {
    const errmsg = 'fake error';
    message.reply = jest.fn((msg) => Promise.reject(errmsg));
    return handler({ message })
      .then(() => expect(1).toEqual(0))
      .catch((err) => expect(err).toEqual(errmsg));
  });
});
