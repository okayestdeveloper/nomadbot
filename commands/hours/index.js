const fs = require('fs');
const path = require('path');

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
 * @param hoursObj
 * @returns {string}
 */
function formatHours(hoursObj) {
  return `- ${hoursObj}
`;
}

function handler({ bot, channelId }) {
  const filepath = path.resolve(__dirname, 'hours.json');
  let hours = fs.readFileSync(filepath);

  if (hours && hours.length >= 0) {
    hours = JSON.parse(hours);

    if (hours && hours.length >= 0) {
      const message = hours.reduce((acc, cur) => acc + formatHours(cur), '');

      bot.sendMessage({
        to: channelId,
        message,
      });
    }
  }
}

module.exports = handler;