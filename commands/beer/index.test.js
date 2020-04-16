const MockMessage = require('../../shared/message.mock');

require('../../shared/firebase');
jest.mock('../../shared/firebase');

const formatters = require('../../shared/formatters');
jest.mock('../../shared/formatters');

const handler = require('./index.js');

describe('!beer', () => {
  let message;

  beforeEach(() => {
    message = new MockMessage();
  });

  it('should format a beer', () => {
    return handler({ message, logger: console })
      .then(() => {
        expect(formatters.formatBeer.mock.calls.length).toEqual(1);
      });
  });

  it('should resolve to a beer', () => {
    return handler({ message, logger: console })
      .then((beer) => {
        const matches = beer.match(/(beer)/g);
        expect(matches.length).toEqual(1)
      });
  });

});
