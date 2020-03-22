function handler({ bot, channelId }) {
  bot.sendMessage({
    to: channelId,
    message: 'Fuck those fucking fuckers with a nailbat in the ass.',
  });
}

module.exports = handler;