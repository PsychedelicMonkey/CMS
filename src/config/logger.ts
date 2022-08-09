import { createLogger, format, transports } from 'winston';
const { colorize, combine, printf, timestamp } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'errors.log',
      level: 'error',
    }),
    new transports.File({ dirname: 'logs', filename: 'combined.log' }),
  ],
});

logger.add(
  new transports.Console({
    format: combine(colorize(), logFormat),
  })
);

export default logger;
