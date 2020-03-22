function handler({ bot, channelId }) {
  bot.sendMessage({
    to: channelId,
    message: 'U wot, m8?!',
  });
}

module.exports = handler;