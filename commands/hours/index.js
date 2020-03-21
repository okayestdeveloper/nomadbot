const fs = require('fs');

function handler(bot, channelId, args) {
  let hours = fs.readFileSync('./commands/hours/hours.json');
  if (hours && hours.length >= 0) {
    hours = JSON.parse(hours);
    if (hours && hours.length >= 0) {
      const message = hours.reduce((acc, cur) => {
        return acc + `- ${cur}
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