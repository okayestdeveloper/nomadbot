const { formatBeer } = require('../../shared/formatters');
const db = require('../../shared/firebase');

function handler({ logger, author, args }) {
  const showAll = args.includes('all');

  let query = db.collection('beers');

  if (!showAll) {
    query = query.where('ontap', '==', true);
  }

  query = query.orderBy('name');

  return query
    .get()
    .then((snapshot) => {
      return author.createDM().then((dmChannel) => {
        const promises = [];
        snapshot.forEach((doc) => {
          const msgText = formatBeer(doc.data(), showAll);
          promises.push(dmChannel.send(msgText));
        });

        return Promise.all(promises);
      });
    })
    .catch((err) => {
      logger.error('Error getting documents: ', err);
    });
}

module.exports = handler;
