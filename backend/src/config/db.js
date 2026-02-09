import mongoose from 'mongoose';
import config from './config.js';
import logger from '../loggers/winston.logger.js';

const connectDb = () => {
  const DB_URI = config.DB_URL;

  // connect to database
  mongoose
    .connect(DB_URI, {})
    .then(() => {
      logger.info('Connected to mongodb'); //
    })
    .catch((error) => {
      logger.error('Error connecting to mongoDb', error); //
    });
};

export default connectDb;
