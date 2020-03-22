function handler({ bot, channelId }) {
  bot.sendMessage({
    to: channelId,
    message: `Hide yo kids, hide yo wife. Cause they rapin' errbody up in here. Also wash yo hands.`,
  });
}

module.exports = handler;