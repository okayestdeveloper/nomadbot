const fs = require('fs');
const path = require('path');

function handler({ message, logger, username }) {
  const filepath = path.resolve(__dirname, 'facts.json');
  let facts = fs.readFileSync(filepath);

  if (facts && facts.length >= 0) {
    facts = JSON.parse(facts);

    if (facts && facts.length >= 0) {
      const random = Math.floor(Math.random() * (facts.length - 1)) + 1;
      const msgText = facts[random];

      message.reply(msgText)
        .then(() => logger.info(`Nomadbot replied to ${message.content} from ${username}`))
        .catch((err) => logger.error(err));
    }
  }
}

module.exports = handler;