const MockMessage = require('../../shared/message.mock');

const fs = require('fs');
jest.mock('fs');

require('../../shared/formatters');
jest.mock('../../shared/formatters');

const handler = require('./index.js');

describe('!facts', () => {
  let message;
  const facts = JSON.stringify([
    'This is a fact',
  ]);

  beforeEach(() => {
    message = new MockMessage();
    fs.readFileSync.mockReturnValue(facts);
  });

  it('should use readFileSync to open the facts.json file', () => {
    handler({ message });
    expect(fs.readFileSync.mock.calls.length).toBe(1);
    expect(fs.readFileSync.mock.calls[ 0 ][ 0 ]).toMatch(/facts.json$/);
  });

  it('should reject with an error if facts file is empty', () => {
    fs.readFileSync.mockReturnValue('');
    return handler({ message, args: [] })
      .then(() => expect(1).toEqual(0))
      .catch((error) => {
        expect.any(Error);
        expect(error.trim()).toEqual('No facts found.')
      });
  });

  it('should reject with an error if no facts are an empty array', () => {
    fs.readFileSync.mockReturnValue('[]');
    return handler({ message, args: [] })
      .then(() => expect(1).toEqual(0))
      .catch((error) => {
        expect(error.trim()).toEqual('No facts found.')
      });
  });

  it('should return some fact', () => {
    return handler({ message })
      .then((text) => {
        expect(text).toEqual(JSON.parse(facts)[ 0 ]);
      });
  });

  it(`should reject if there's some error`, () => {
    const errmsg = 'fake error';
    message.reply = jest.fn(() => Promise.reject(errmsg));
    return handler({ message })
      .then(() => expect(1).toEqual(0))
      .catch((err) => expect(err).toEqual(errmsg));
  });
});
