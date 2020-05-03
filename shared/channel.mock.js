/**
 * @class MockDMChannel
 * Mocks the Discord.js DMChannel class for our tests.
 */
class MockDMChannel {
  send(str) {
    return Promise.resolve(str);
  }
}

module.exports = MockDMChannel;
