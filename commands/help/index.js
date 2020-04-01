const fs = require('fs');
const path = require('path');
const { formatHelpText } = require('../../shared/formatters');

/**
 * Return true if the given path is a directory
 * @param {string} path
 * @returns {boolean}
 */
function isDir(path) {
  const fd = fs.openSync(path, 'r', 0o666);
  const stat = fs.fstatSync(fd);
  fs.close(fd, () => { });
  return stat.isDirectory();
}

/**
 * Take a list of files and concatenate their contents into a formatted string
 * @param {string} msg accumlator for the output string
 * @param {string} command the command that was given, aka the folder where the help text is
 * @returns {string}
 */
const filesReducer = (msg, command) => {
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
}

function handler({ message }) {
  const commandDir = path.resolve(__dirname, '..');
  const files = fs.readdirSync(commandDir);
  const msgText = `\n` + files.reduce(filesReducer, []);

  if (msgText && msgText.length >= 0) {
    return message.reply(msgText);
  }
}

module.exports = handler;
