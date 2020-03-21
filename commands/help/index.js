const fs = require('fs');

function handler(bot, channelId, args) {
  let commands = fs.readFileSync('./commands/help/commands.json');
  if (commands && commands.length >= 0) {
    commands = JSON.parse(commands);
    if (commands && commands.length >= 0) {
      const message = commands.reduce((acc, cur) => {
        return acc + `
- ${cur.name}: ${cur.description}
        `;
      }, '');

      bot.sendMessage({
        to: channelId,
        message,
      });
    }
  }
}

module.exports = handler;