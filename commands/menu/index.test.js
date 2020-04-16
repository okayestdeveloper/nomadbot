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
    it('should call formatBeer for each ontap beer', () => {
      const tapCount = mockBeers.filter((b) => b.ontap).length;
      return handler({ message, args: [], logger: console })
        .then(() => {
          expect(formatters.formatBeer.mock.calls.length).toEqual(tapCount);
        });
    });

    it('should resolve to a list of beers on tap', () => {
      return handler({ message, args: [], logger: console })
        .then((beers) => {
          beers.forEach((beer) => {
            expect(beer.includes('no')).toBeFalsy();
          });
        });
    });
  });

  describe('called with "all" argument', () => {
    it('should resolve to a list of all beers', () => {
      return handler({ message, args: ['all'], logger: console })
        .then(() => {
          expect(formatters.formatBeer.mock.calls.length).toEqual(mockBeers.length);
        });
    });
  });

  xit(`should reject if there's some message error`, () => {
    const errmsg = 'fake error';
    message.reply = jest.fn(() => Promise.reject(errmsg));
    return handler({ message, args: [], logger: console })
      .then((msg) => {
        console.log(msg);
        expect(1).toEqual(0);
      })
      .catch((err) => {
        // todo: I guess Promise.all is messing with this
        expect(err.trim()).toEqual(errmsg);
      });

  });

});
