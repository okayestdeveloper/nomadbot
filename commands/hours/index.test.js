const MockMessage = require('../../shared/message.mock');

const fs = require('fs');
jest.mock('fs');

require('../../shared/formatters');
jest.mock('../../shared/formatters');

const handler = require('./index.js');


describe('!hours', () => {
  let message;
  const hours = JSON.stringify([
    {
      day: 'Tuesday',
      start: '4pm',
      end: '7pm'
    },
    {
      day: 'Thursday',
      start: '4pm',
      end: '7pm'
    },
  ]);

  beforeEach(() => {
    message = new MockMessage();
    fs.readFileSync.mockReturnValue(hours);
 });

  it(`should use readFileSync to open the hours.json file`, () => {
    handler({ message });
    expect(fs.readFileSync.mock.calls.length).toBe(1);
    expect(fs.readFileSync.mock.calls[ 0 ][ 0 ]).toMatch(/hours.json$/);
  });

  it('should reject with an error if no hours are returned', () => {
    fs.readFileSync.mockReturnValue(hours);
    handler({ message, args: [] })
      .then(() => expect(false).toEqual(true)) // should not get here
      .catch((error) => {
        expect.any(Error);
        expect(error.message).toEqual('No hours found.')
      });

    fs.readFileSync.mockReturnValue('[]');
    handler({ message, args: [] })
      .then(() => expect(false).toEqual(true)) // should not get here
      .catch((error) => {
        expect(error.message).toEqual('No hours found.')
      });
  });

  describe('called without a day', () => {
    it(`should return a promise that resolves to all the hours`, () => {
      handler({ message, args: [] })
        .then((text) => {
          expect(text).toContain('Tuesday 4pm 7pm');
          expect(text).toContain('Thursday 4pm 7pm');
        })
        .catch(() => expect(false).toEqual(true)); // should not get here
    });
  });

  describe('called with a day', () => {
    it(`should return hours for the day`, () => {
      handler({ message, args: ['Tuesday'] })
        .then((text) => {
          expect(text).toContain('Tuesday 4pm 7pm');
          expect(text).not.toContain('Thursday 4pm 7pm');
        })
        .catch(() => expect(false).toEqual(true)); // should not get here
    });

    it(`should return closed if no hours were found`, () => {
      handler({ message, args: [ 'Monday' ] })
        .then((text) => {
          expect(text).toEqual('Closed');
        })
        .catch(() => expect(false).toEqual(true)); // should not get here
    });
  });

  it(`should reject if there's some error`, () => {
    const errmsg = 'fake error';
    message.reply = jest.fn(() => Promise.reject(errmsg));
    handler({ message })
      .then(() => expect(false).toEqual(true)) // should not get here
      .catch((err) => expect(err).toEqual(errmsg));

  });
});
