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
  // todo: split commands out to separate handlers, but y'know
  if (message[0] === '!') {
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

    switch (command) {
      // non-command directory commands
      case 'ping':
        bot.sendMessage({
          to:channelId,
          message: 'U wot, m8?!'
        });
        break;
      case 'covid19protocol':
        bot.sendMessage({
          to:channelId,
          message: 'Hide yo kids, hide yo wife. Cause they rapin errbody up in here. Also wash yo hands.'
        });
        break;
      case 'fucklegion':
        bot.sendMessage({
          to:channelId,
          message: 'GOD DAMN RIGHT!'
        });
        break;
      case 'greatdivide':
        bot.sendMessage({
          to:channelId,
          message: 'Fuck those fucking fuckers with a nailbat in the ass.'
        });
        break;
      default:
        if (dirs.includes(command)) {
          console.info(`require('./commands/${command}/index.js')`);
          const handler = require(`./commands/${command}/index.js`);
          console.dir(handler);
          handler(bot, channelId, args);
        }
        break;
    }
  }
});
