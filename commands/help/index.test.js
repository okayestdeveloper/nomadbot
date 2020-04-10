const MockMessage = require('../../shared/message.mock');

const fs = require('fs');
jest.mock('fs');

const path = require('path');
jest.mock('path');

require('../../shared/formatters');
jest.mock('../../shared/formatters');

const handler = require('./index.js');

describe('!help', () => {
  let message;
  const dirs = [
    '.',
    '..',
    'links',
  ];

  beforeEach(() => {
    message = new MockMessage();
    fs.readdirSync.mockReturnValue(dirs);
    fs.openSync.mockReturnValue(1);

    fs.fstatSync.mockReturnValue({
      isDirectory: jest.fn(() => true),
    });

    path.resolve.mockReturnValue('/');
  });

  it(`should use readdirSync to get a list of directories`, () => {
    handler({ message });
    expect(fs.readdirSync.mock.calls.length).toBe(1);
  });

  it(`should return a promise that resolves to the help text`, () => {
    const helpText = 'help text';
    fs.readFileSync.mockReturnValue(helpText);
    handler({ message })
      .then((text) => expect(text).toEqual(helpText))
      .catch(() => expect(false).toEqual(true)); // should not get here
  });

  it(`should reject if there's some error`, () => {
    const errmsg = 'fake error';
    message.reply = jest.fn(() => Promise.reject(errmsg));
    handler({ message })
      .then(() => expect(false).toEqual(true)) // should not get here
      .catch((err) => expect(err).toEqual(errmsg));

  });
});
