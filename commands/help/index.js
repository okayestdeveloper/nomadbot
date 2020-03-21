const fs = require('fs');
const path = require('path');

// todo: add a description.md to public commands and aggregate those instead of putting it all in a commands.md

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