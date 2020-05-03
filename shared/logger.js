// Configure logger settings
const winston = require('winston');
require('winston-daily-rotate-file');

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'nomadbot-%DATE%.log.json',
      zippedArchive: true,
      level: 'debug',
      dirname: '/opt/nomadbot/logs',
      maxFiles: '7d',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.remove(winston.transports.Console);
  logger.add(new winston.transports.Console(), {
    colorize: true,
    level: 'debug',
  });
}

module.exports = logger;
