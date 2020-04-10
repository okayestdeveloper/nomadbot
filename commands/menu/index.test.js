const MockMessage = require('../../shared/message.mock');
const { mockBeers } = require('../../shared/mock-beers');

require('../../shared/firebase');
jest.mock('../../shared/firebase');

const formatters = require('../../shared/formatters');
jest.mock('../../shared/formatters');

const handler = require('./index.js');

describe('!menu', () => {
  let message;

  beforeEach(() => {
    message = new MockMessage();
  });

  describe('called without "all" argument', () => {
    it('should call formatBeer for each ontap beer', (done) => {
      const tapCount = mockBeers.filter((b) => b.ontap).length;
      handler({ message, args: [], logger: console })
        .then(() => {
          expect(formatters.formatBeer.mock.calls.length).toEqual(tapCount);
          done();
        })
        .catch(() => expect(false).toEqual(true));
    });

    it('should resolve to a list of beers on tap', () => {
      handler({ message, args: [], logger: console })
        .then((beers) => {
          beers.forEach((beer) => expect(beer.ontap).toEqual(true));
          done();
        })
        .catch(() => expect(false).toEqual(true));
    });
  });

  describe('called with "all" argument', () => {
    it('should resolve to a list of all beers', () => {
      handler({ message, args: [], logger: console })
        .then(() => {
          expect(formatters.formatBeer.mock.calls.length).toEqual(mockBeers.length);
          done();
        })
        .catch(() => expect(false).toEqual(true));
    });
  });

  it(`should reject if there's some message error`, () => {
    const errmsg = 'fake error';
    message.reply = jest.fn((msg) => Promise.reject(errmsg));
    handler({ message, args: [], logger: console })
      .then(() => expect(false).toEqual(true)) // should not get here
      .catch((err) => expect(err).toEqual(errmsg));

  });

    // todo: how to get the query to reject?
  // it('should reject with an error if there is a db error', () => {
  //   expect(false).toEqual(true);
  // });
});
