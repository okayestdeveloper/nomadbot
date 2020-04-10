module.exports = {
  formatBeer: jest.fn((b) => `${b.name} ${b.ontap ? 'yes' : 'no'} | `),
  formatHours: jest.fn((d) => `${d.day} ${d.start} ${d.end} | `),
  formatHelpText: jest.fn((cmd, text) => text),
};
