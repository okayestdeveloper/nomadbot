const fs = require('fs');
const path = require('path');

function handler({ message }) {
  const filepath = path.resolve(__dirname, 'facts.json');
  let facts = fs.readFileSync(filepath);

  if (facts) {
    facts = JSON.parse(facts);

    if (facts && facts.length > 0) {
      const random = Math.floor(Math.random() * (facts.length - 1));
      const msgText = facts[random];

      return message.reply(msgText);
    }
  }

  return Promise.reject('No facts found.');
}

module.exports = handler;
