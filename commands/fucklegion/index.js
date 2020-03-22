function handler({ bot, channelId }) {
  bot.sendMessage({
    to: channelId,
    message: 'GOD DAMN RIGHT!',
  });
}

module.exports = handler;