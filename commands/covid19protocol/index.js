function handler({ message, logger, username }) {
  const msgText = `Hide yo kids, hide yo wife. Cause they rapin' errbody up in here. Also wash yo hands.`;
  message.reply(msgText)
    .then(() => logger.info(`Nomadbot replied to ${message.content} from ${username}`))
    .catch((err) => logger.error(err));
}

module.exports = handler;