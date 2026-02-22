import httpServer from './app.js';
import config from './src/config/config.js';
import connectDb from './src/config/db.js';
import logger from './src/loggers/winston.logger.js';

// Handle unhandled promise rejections
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}`, { stack: error.stack });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

// connect to database
connectDb();
console.log(config);
// listen server
const server = httpServer.listen(config.PORT, () => {
  logger.info(`server is running on ${config.PORT}`);
  logger.debug(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

