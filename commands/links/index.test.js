const handler = require('./index.js');
const MockMessage = require('../../shared/message.mock');
const fs = require('fs');
jest.mock('fs');

describe('!links', () => {
  let message;

  beforeEach(() => {
    message = new MockMessage();
  });

  it(`should use readFileSync to open the links.md file`, () => {
    handler({ message });
    expect(fs.readFileSync.mock.calls.length).toBe(1);
    expect(fs.readFileSync.mock.calls[0][0]).toMatch(/links.md$/);
  });

  it(`should return a promise that resolves to the links`, () => {
    const linkText = 'fake links';
    fs.readFileSync.mockReturnValue(linkText);
    handler({ message })
      .then((text) => expect(text).toEqual(linkText))
      .catch(() => expect(false).toEqual(true)); // should not get here
  });

  it(`should reject if there's some error`, () => {
    const errmsg = 'fake error';
    message.reply = jest.fn((msg) => Promise.reject(errmsg));
    handler({ message })
      .then(() => expect(false).toEqual(true)) // should not get here
      .catch((err) => expect(err).toEqual(errmsg));

  });
});
