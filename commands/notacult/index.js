function handler({ message, logger, username }) {
  const msgText = `Totally.`;
  message.reply(msgText)
    .then(() => logger.info(`Nomadbot replied to ${message.content} from ${username}`))
    .catch((err) => logger.error(err));
}

module.exports = handler;