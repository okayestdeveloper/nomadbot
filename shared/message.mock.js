/**
 * @class MockMessage
 * Mocks the Discord.js Message class for our tests.
 */
class MockMessage {
  reply(str) {
    return Promise.resolve(str);
  }
}

module.exports = MockMessage;
