const fs = require('fs');
const path = require('path');
const chrono = require('chrono-node');
const moment = require('moment');
const { formatHours } = require('../../shared/formatters');

/**
 * Use moment to parse out a day string from the args if it exists.
 * @param {string[]} args
 * @returns {string | undefined}
 */
function getDay(args) {
  if (args && args.length) {
    const m = moment(chrono.parseDate(args.join(' ')), moment.ISO_8601);
    if (m.isValid()) {
      return m.format('dddd');
    }
  }
  return undefined;
}

function handler({ message, args }) {
  const filepath = path.resolve(__dirname, 'hours.json');
  let hours = fs.readFileSync(filepath);

  const day = getDay(args);

  if (hours) {
    hours = JSON.parse(hours);

    if (hours && hours.length > 0) {
      const msgText = hours
        .filter((hourObj) => !day || hourObj.day === day)
        .reduce((acc, cur) => acc + formatHours(cur), '') || `Closed`;

      return message.reply(`\n${msgText}`);
    }
  }

  return Promise.reject(`No hours found.`);
}

module.exports = handler;

