const fs = require('fs');
const path = require('path');

function formatHelpText(command, helpText) {
  return `- **!${command}**\n` +
    `    ${helpText}\n`;
}

function isDir(path) {
  const fd = fs.openSync(path);
  const stat = fs.fstatSync(fd);
  fs.close(fd, () => {});
  return stat.isDirectory();
}

function handler({ bot, channelId, logger }) {
  const commandDir = path.resolve(__dirname, '..');
  const files = fs.readdirSync(commandDir);

  const message = files.reduce((msg, command) => {
    if (command !== '.' && command !== '..') {
      const dirPath = path.resolve(commandDir, command);

      if (isDir(dirPath)) {
        try {
          const helpText = fs.readFileSync(path.resolve(dirPath, 'help.md'));
          msg += formatHelpText(command, helpText);
        } catch (ex) {
          if (ex.code !== 'ENOENT') {
            logger.info(`Help command caught exception ${ex}`);
          }
        }
      }
    }

    return msg;
  }, []);


  if (message && message.length >= 0) {
    bot.sendMessage({
      to: channelId,
      message,
    });
  }
}

module.exports = handler;