const fs = require('fs');
const path = require('path');

function handler({ message }) {
  const filepath = path.resolve(__dirname, 'links.md');
  const msgText = `\n` + fs.readFileSync(filepath);

  return message.reply(msgText);
}


module.exports = handler;
