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

module.exports = {
  formatBeer,
};
