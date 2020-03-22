const fs = require('fs');
const path = require('path');

function handler({ message, logger, username }) {
  const filepath = path.resolve(__dirname, 'links.md');
  const msgText = `\n` + fs.readFileSync(filepath);

  message.reply(msgText)
    .then(() => logger.info(`Nomadbot replied to ${message.content} from ${username}`))
    .catch((err) => logger.error(err));
}


module.exports = handler;