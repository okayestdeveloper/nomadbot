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

  it('should reject with an error if hours file is empty', () => {
    fs.readFileSync.mockReturnValue('');
    return handler({ message, args: [] })
      .then(() => expect(1).toEqual(0))
      .catch((error) => {
        expect.any(Error);
        expect(error.trim()).toEqual('No hours found.')
      });
  });

  it('should reject with an error if no hours are an empty array', () => {
    fs.readFileSync.mockReturnValue('[]');
    return handler({ message, args: [] })
      .then(() => expect(1).toEqual(0))
      .catch((error) => {
        expect(error.trim()).toEqual('No hours found.')
      });
  });

  describe('called without a day', () => {
    it(`should return a promise that resolves to all the hours`, () => {
      return handler({ message, args: [] })
        .then((text) => {
          expect(text).toContain('Tuesday 4pm 7pm');
          expect(text).toContain('Thursday 4pm 7pm');
        });
    });
  });

  describe('called with a day', () => {
    it(`should return hours for the day`, () => {
      return handler({ message, args: [ 'Tuesday' ] })
        .then((text) => {
          expect(text).toContain('Tuesday 4pm 7pm');
          expect(text).not.toContain('Thursday 4pm 7pm');
        });
    });

    it(`should return closed if no hours were found`, () => {
      return handler({ message, args: [ 'Monday' ] })
        .then((text) => {
          expect(text.trim()).toEqual('Closed');
        });
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
