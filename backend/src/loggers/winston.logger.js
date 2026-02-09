import winston from "winston";

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

const isProduction = process.env.NODE_ENV === "production";

/**
 * Custom log format for development
 */
const devFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  return `${timestamp} [${level}]: ${stack || message} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ""
  }`;
});

const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  format: combine(
    timestamp(),
    errors({ stack: true }),
    isProduction ? json() : devFormat,
  ),
  transports: [
    new winston.transports.Console({
      format: isProduction
        ? json()
        : combine(colorize(), timestamp(), devFormat),
    }),

    // error logs (production)
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // all logs (production)
    new winston.transports.File({
      filename: "logs/app.log",
    }),
  ],
  exitOnError: false,
});

export default logger;
