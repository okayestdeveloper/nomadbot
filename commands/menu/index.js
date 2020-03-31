const { formatBeer } = require('../../shared/formatters');
const db = require('../../shared/firebase')();

function handler({ message, logger, username, args }) {
  const showAll = args.includes('all');

  let query = db.collection('beers');

  if (!showAll) {
    query = query.where('ontap', '==', true);
  }

  query = query.orderBy('name');

  query.get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const msgText = formatBeer(doc.data(), showAll);
        // todo: DM instead of reply

        message.reply(msgText)
          .then(() => logger.info(`Nomadbot replied to ${message.content} from ${username}`))
          .catch((err) => logger.error(err));
      });

    })
    .catch((err) => {
      logger.error('Error getting documents: ', err);
    });
}

module.exports = handler;
