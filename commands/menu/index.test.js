const { mockBeers } = require('../../shared/mock-beers');
const author = require('../../shared/user.mock');

require('../../shared/firebase');
jest.mock('../../shared/firebase');

const formatters = require('../../shared/formatters');
jest.mock('../../shared/formatters');

const handler = require('./index.js');

describe('!menu', () => {

  describe('called without "all" argument', () => {
    it('should call formatBeer for each ontap beer', () => {
      const tapCount = mockBeers.docs.filter((b) => b.ontap).length;
      return handler({ author, args: [], logger: console })
        .then(() => {
          expect(formatters.formatBeer.mock.calls.length).toEqual(tapCount);
        });
    });

    it('should resolve to a list of beers on tap', () => {
      return handler({ author, args: [], logger: console })
        .then((beers) => {
          beers.forEach((beer) => {
            expect(beer.includes('no')).toBeFalsy();
          });
        });
    });
  });

  describe('called with "all" argument', () => {
    it('should resolve to a list of all beers', () => {
      return handler({ author, args: ['all'], logger: console })
        .then(() => {
          expect(formatters.formatBeer.mock.calls.length).toEqual(mockBeers.length);
        });
    });
  });

  xit(`should reject if there's some message error`, () => {
    const errmsg = 'fake error';
    author.dmChannel.send = jest.fn(() => Promise.reject(errmsg));
    return handler({ author, args: [], logger: console })
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
