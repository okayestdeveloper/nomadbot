const fs = require('fs');

function handler(bot, channelId, args) {
  let message = fs.readFileSync('./commands/help/commands.md');
  if (message && message.length >= 0) {
    bot.sendMessage({
      to: channelId,
      message,
    });
  }
}

module.exports = handler;