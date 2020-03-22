function handler({ message, logger, username }) {
  const msgText = 'GOD DAMN RIGHT!';
  message.reply(msgText)
    .then(() => logger.info(`Nomadbot replied to ${message.content} from ${username}`))
    .catch((err) => logger.error(err));
}

module.exports = handler;