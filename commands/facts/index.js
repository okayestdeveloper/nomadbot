const fs = require('fs');
const path = require('path');

function handler({ bot, channelId }) {
  const filepath = path.resolve(__dirname, 'facts.json');
  let facts = fs.readFileSync(filepath);

  if (facts && facts.length >= 0) {
    facts = JSON.parse(facts);
    if (facts && facts.length >= 0) {
      const random = Math.floor(Math.random() * (facts.length - 1)) + 1;
      const message = facts[random];
      bot.sendMessage({
        to: channelId,
        message,
      });
    }
  }
}

module.exports = handler;