const MockDMChannel = require('./channel.mock');

/**
 * @class MockUser
 * Mocks the Discord.js User class for our tests.
 */
class MockUser {
  constructor() {
    this.dmChannel = new MockDMChannel();
  }
  createDM() {
    return Promise.resolve(this.dmChannel);
  }
}

module.exports = new MockUser();
