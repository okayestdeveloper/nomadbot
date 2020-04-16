const { formatBeer } = require('../../shared/formatters');
const db = require('../../shared/firebase');

function handler({ message, logger }) {
  return db.collection('beers').get()
    .then((snapshot) => {
      const index = Math.floor(Math.random() * Math.floor(snapshot.size));
      const doc = snapshot.docs[ index ];
      const msgText = formatBeer(doc.data(), true);
      // todo: DM instead of reply

      return message.reply(msgText);
    })
    .catch((err) => {
      logger.error('Error getting documents: ', err);
    });
}

module.exports = handler;
