function handler({ message, logger, username }) {
  const msgText = 'Fuck those fucking fuckers with a nailbat in the ass.';
  message.reply(msgText)
    .then(() => logger.info(`Nomadbot replied to ${message.content} from ${username}`))
    .catch((err) => logger.error(err));
}

module.exports = handler;