function handler({ message }) {
  const msgText = 'U wot, m8?!';
  return message.reply(msgText);
}

module.exports = handler;
