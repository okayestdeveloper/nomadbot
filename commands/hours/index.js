const fs = require('fs');
const path = require('path');
const chrono = require('chrono-node');
const moment = require('moment');

// 1. todo: add an arg option for "today" and "tomorrow"...maybe some kind of processing. e.g. "Next Saturday"
// Import moment to figure out day of week.
// then give hours for that day
// break the hours up into something like this to facilitate
/*
{
  day: string - name of the day of the week.
  open: string - when we open
  close: string - when we close
  exceptions: string[] -- list of YYYY-MM-DD that we're closed on
}
*/

/**
 * Process the hours object (right now a string) into a standard format.
 * @param {{day: string, start: string, end: string}} hoursObj
 * @returns {string}
 */
function formatHours(hoursObj) {
  return `- **${hoursObj.day}**: ${hoursObj.start} - ${hoursObj.end}\n`;
}

function handler({ message, args, logger, username }) {
  const filepath = path.resolve(__dirname, 'hours.json');
  let hours = fs.readFileSync(filepath);

  let day;
  if (args && args.length) {
    const m = moment(chrono.parseDate(args.join(' ')), moment.ISO_8601);
    if (m.isValid()) {
      day = m.format('dddd');
    }
  }

  if (hours && hours.length >= 0) {
    hours = JSON.parse(hours);

    if (hours && hours.length >= 0) {

      const msgText = hours
        .filter((hourObj) => !day || hourObj.day === day)
        .reduce((acc, cur) => acc + formatHours(cur), '') || `Closed`;


      message.reply(`\n${msgText}`)
        .then(() => logger.info(`Nomadbot replied to ${message.content} from ${username}`))
        .catch((err) => logger.error(err));
    }
  }
}

module.exports = handler;

