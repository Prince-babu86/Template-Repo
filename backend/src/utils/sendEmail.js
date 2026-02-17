import config from '../config/config.js';
import logger from '../loggers/winston.logger.js';
import transporter from '../middlewares/email.config.js';
import ApiError from './AppError.js';

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"TEMPLATE-REPO" <${transporter.options.auth.user}>`,
      to,
      subject,
      text,
      html,
    });

    logger.info(`Email sent: ${info.messageId}`);
    logger.info(transporter.options.auth.user);
  } catch (error) {
    logger.error('Error sending email:', error);
    throw new ApiError(409, 'Failed to send email');
  }
};

export default sendEmail;
