const handler = require('./index.js');
const MockMessage = require('../../shared/message.mock');

describe('!covid19protocol', () => {
  let message;

  beforeEach(() => {
    message = new MockMessage();
  });

  it(`should reply with "Hide yo kids, hide yo wife. Cause they rapin' errbody up in here. Also wash yo hands."`, () => {
    handler({ message })
      .then((str) => expect(str).toEqual(`Hide yo kids, hide yo wife. Cause they rapin' errbody up in here. Also wash yo hands.`))
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
