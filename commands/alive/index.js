const fs = require('fs');
const path = require('path');

function handler({ bot, channelId }) {
  const filepath = path.resolve(__dirname, 'stillalive.md');
  const message = fs.readFileSync(filepath);

  if (message && message.length >= 0) {
    bot.sendMessage({
      to: channelId,
      message,
    });
  }
}

module.exports = handler;