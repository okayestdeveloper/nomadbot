function handler({ bot, channelId }) {
  bot.sendMessage({
    to: channelId,
    message: `Totally.`,
  });
}

module.exports = handler;