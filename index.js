const path = require('path');
const envPath = path.join('.', `.env.local`); // todo:
const dotenv = require('dotenv');
dotenv.config({ path: envPath });

const fs = require('fs');

const Discord = require('discord.io');
const logger = require('winston');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.NOMADBOT_TOKEN,
   autorun: true
});

bot.on('ready', (evt) => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});


bot.on('message', (user, userId, channelId, message,evt) => {
  if (message[0] === '!') {
    logger.debug(`Nomadbot: incoming message '${message}' from user ${userId} on channel ${channelId}`);
    const args = message.substring(1).split(' ');
    const command = args.shift().toLocaleLowerCase();

    // read the commands folder list
    const list = fs.readdirSync(path.resolve('commands'));
    const dirs = [];

    for (let key in list) {
      const dir = list[key];
      if (dir !== '.' && dir !== '..') {
        dirs.push(dir);
      }
    }

    logger.debug(`Nomadbot: got command '${command} ${args}'`);

    switch (command) {
      default:
        if (dirs.includes(command)) {
          const handler = require(`./commands/${command}/index.js`);
          handler({bot, channelId, args, logger});
        }
        break;
    }
  }
});
