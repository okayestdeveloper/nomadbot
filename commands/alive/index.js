const fs = require('fs');
const path = require('path');

function handler({ message }) {
  const filepath = path.resolve(__dirname, 'stillalive.md');
  const msgText = `\n` + fs.readFileSync(filepath);

  if (msgText && msgText.length > 1) {
    return message.reply(msgText);
  }
  return Promise.reject('Could not load lyrics.');
}

module.exports = handler;
