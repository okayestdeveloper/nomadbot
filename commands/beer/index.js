const { formatBeer } = require('../../shared/formatters');
const db = require('../../shared/firebase')();

function handler({ message, logger, username, args }) {

  db.collection('beers').get()
    .then((snapshot) => {
      const index = Math.floor(Math.random() * Math.floor(snapshot.size));
      const doc = snapshot.docs[ index ];
      const msgText = formatBeer(doc.data(), true);
      // todo: DM instead of reply

      message.reply(msgText)
        .then(() => logger.info(`Nomadbot replied to ${message.content} from ${username}`))
        .catch((err) => logger.error(err));
    })
    .catch((err) => {
      logger.error('Error getting documents: ', err);
    });
}

module.exports = handler;
