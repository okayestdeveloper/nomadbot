const path = require('path');
const envPath = path.join('.', `.env`);
const dotenv = require('dotenv');
dotenv.config({ path: envPath });
const fs = require('fs');
const moment = require('moment');
const logger = require('./shared/logger');

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
    const channelName = channel ? channel.name || channel.recipient || channel.id : '??';
    const timestamp = moment().format('MM/DD/YY HH:mm:ss');
    logger.debug(`Nomadbot (${timestamp}): incoming message '${content}' from user ${author.username} on channel ${channelName}`);

    const args = content
      .substring(1)
      .split(' ')
      .map((arg) => arg.toLocaleLowerCase());
    const command = args.shift();

    logger.debug(`Nomadbot: got command '${command} ${args}'`);

    // read the commands folder list
    const list = fs.readdirSync(path.resolve('commands'));
    const dirs = list.reduce((allowed, dir) => {
      if (dir !== '.' && dir !== '..') {
        allowed.push(dir);
      }

      return allowed;
    }, []);

    logger.debug(`Nomadbot: known commands: ${dirs.join(', ')}`);

    switch (command) {
      default:
        if (dirs.includes(command)) {
          const commandPath = path.resolve('.', 'commands', command, 'index.js');
          const handler = require(commandPath);

          handler({ message, args, logger, author })
            .then(() => logger.info(`Nomadbot replied to ${message.content} from ${author.username}`))
            .catch((err) => logger.error(err));
        }
        break;
    }
  }
});
