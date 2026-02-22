import nodemailer from 'nodemailer';
import config from '../config/config.js';
import logger from '../loggers/winston.logger.js';

const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: config.emailPort,
  secure: config.emailSecure,
  auth: {
    user: config.emailUser,
    pass: config.emailPassword,
  },
  connectionTimeout: 10000, // 10 sec
  greetingTimeout: 5000,
  socketTimeout: 10000,
});

transporter.verify((error, sucess) => {
  if (error) {
    logger.error('Error connecting to email server:', error);
    // console.log("error ");
  } else {
    logger.info('Email server is ready to send messages');
    // console.log("Email server is ready to send ");
  }
});

export default transporter;
