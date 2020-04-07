const handler = require('./index.js');
const MockMessage = require('../../shared/message.mock');
const fs = require('fs');
jest.mock('fs');
const path = require('path');
jest.mock('path');


describe('!alive', () => {
  let message;
  const lyrics = 'bla bla bla';

  beforeEach(() => {
    message = new MockMessage();
    path.resolve.mockReturnValue('stillalive.md');
    fs.readFileSync.mockReturnValue(lyrics);
  });

  it(`should use readFileSync to open the stillalive.md file`, () => {
    handler({ message });
    expect(fs.readFileSync.mock.calls.length).toBe(1);
    expect(fs.readFileSync.mock.calls[ 0 ][ 0 ]).toMatch(/stillalive.md$/);
  });

  it('should reject with an error if no text is loaded', () => {
    fs.readFileSync.mockReturnValue(null);
    handler({ message, args: [] })
      .then(() => expect(false).toEqual(true)) // should not get here
      .catch((error) => {
        expect.any(Error);
        expect(error.message).toEqual('No hours found.')
      });

    fs.readFileSync.mockReturnValue('');
    handler({ message, args: [] })
      .then(() => expect(false).toEqual(true)) // should not get here
      .catch((error) => {
        expect(error.message).toEqual('No hours found.')
      });
  });
});
