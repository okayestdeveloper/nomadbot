/**
 * Format all our help text in a consistent way
 * @param {string} command
 * @param {string} helpText
 * @returns {string}
 */
function formatHelpText(command, helpText) {
  return `- **!${command}**\n` +
    `    ${helpText}\n`;
}

// todo: do a JSDOC for the beer type
/*
beer
{
  abv: number;
  name: string;
  description: string;
  style: string;
  ontap: boolean;
  hashtag: string;
}
*/

/**
 * Format a firebase beer doc to a string in a standard format.
 * @param {object} beer beer object
 * @param {boolean} showOnTap whether or not to show an "On tap: " bit
 * @returns {string}
 */
function formatBeer(beer, showOnTap) {
  const {
    abv = 0,
    name = '',
    description = '',
    style = '',
    ontap = false,
    hashtag = '',
  } = beer;

  let msg = `**${name}** - **${style}** - **${abv.toFixed(1)}%**\n`
    + `${description} #${hashtag}\n`;

  if (showOnTap) {
    msg += `On tap: ${ontap ? 'yes' : 'no'}\n`;
  }

  return msg;
}

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

module.exports = {
  formatBeer,
  formatHours,
  formatHelpText,
};
