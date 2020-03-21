function handler(bot, channelId, args) {
  bot.sendMessage({
    to: channelId,
    message: 'http://menu.thirstynomad.beer'
  });
}


module.exports = handler;