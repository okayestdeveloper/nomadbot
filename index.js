const path = require('path');
const envPath = path.join('.', `.env.local`); // todo:
const dotenv = require('dotenv');
dotenv.config({ path: envPath });

const fs = require('fs');

const logger = require('winston');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';


// Initialize Discord Bot
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  logger.info(`Connected. Logged in as ${client.user.tag}`);
});

client.login(process.env.NOMADBOT_TOKEN);

client.on('message', (message) => {
  const { author, channel, content } = message;
  if (content[0] === '!') {
    const username = author ? author.username || author.id : '??';
    const channelName = channel ? channel.name || channel.recipient || channel.id : '??';
    logger.debug(`Nomadbot: incoming message '${content}' from user ${username} on channel ${channelName}`);

    const args = content.substring(1).split(' ');
    const command = args.shift().toLocaleLowerCase();

    // read the commands folder list
    const list = fs.readdirSync(path.resolve('commands'));
    const dirs = list.reduce((allowed, dir) => {
      if (dir !== '.' && dir !== '..') {
        allowed.push(dir);
      }

      return allowed;
    }, []);

    logger.debug(`Nomadbot: got command '${command} ${args}'`);

    switch (command) {
      default:
        if (dirs.includes(command)) {
          const handler = require(`./commands/${command}/index.js`);
          handler({ message, args, logger, username });
        }
        break;
    }
  }
});
