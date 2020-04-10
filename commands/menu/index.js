const { formatBeer } = require('../../shared/formatters');
const db = require('../../shared/firebase')

function handler({ message, logger, args }) {
  const showAll = args.includes('all');

  let query = db.collection('beers');

  if (!showAll) {
    query = query.where('ontap', '==', true);
  }

  query = query.orderBy('name');

  return query.get()
    .then((snapshot) => {
      const promises = [];
      snapshot.forEach((doc) => {
        const msgText = formatBeer(doc.data(), showAll);
        // todo: DM instead of reply
        promises.push(message.reply(msgText));
      });

      return Promise.all(promises);
    })
    .catch((err) => {
      logger.error('Error getting documents: ', err);
    });
}

module.exports = handler;
