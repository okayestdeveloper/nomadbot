const fs = require('fs');
const path = require('path');

function handler(bot, channelId, args) {
  const filepath = path.resolve(__dirname, 'commands.md');
  const message = fs.readFileSync(filepath);

  if (message && message.length >= 0) {
    bot.sendMessage({
      to: channelId,
      message,
    });
  }
}

module.exports = handler;