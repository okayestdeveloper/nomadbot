const fs = require('fs');

function handler(bot, channelId, args) {
  let facts = fs.readFileSync('./commands/bradfacts/facts.json');
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