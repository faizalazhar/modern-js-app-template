/**
 * Logger configuration module
 * @module config/logger
 */

import { createLogger, format, transports } from 'winston';
import { config } from './index.js';

const { environment } = config.app;

/**
 * Custom log format
 */
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
);

/**
 * Configure and create Winston logger
 */
export const logger = createLogger({
  level: environment === 'production' ? 'info' : 'debug',
  format: logFormat,
  defaultMeta: { service: config.app.name },
  transports: [
    // Write all logs with importance level 'error' or less to 'error.log'
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    // Write all logs with importance level 'info' or less to 'combined.log'
    new transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

// Add console transport for non-production environments
if (environment !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;
