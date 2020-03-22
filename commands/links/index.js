const fs = require('fs');
const path = require('path');

function handler({ bot, channelId }) {
  const filepath = path.resolve(__dirname, 'links.md');
  const message = fs.readFileSync(filepath);

  bot.sendMessage({
    to: channelId,
    message,
  });
}


module.exports = handler;