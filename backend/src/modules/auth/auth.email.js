import logger from '../../loggers/winston.logger.js';
import loginAlertTemplate from '../../templates/login.email.js';
import registerTemplate from '../../templates/register.email.js';
import sendEmail from '../../utils/sendEmail.js';

const registerEmail = async ({ email, fullname }) => {
  const { subject, text, html } = registerTemplate({ fullname });

  try {
    await sendEmail({
      to: email,
      subject,
      text,
      html,
    });
  } catch (error) {
    logger.error('Sending email on register ');
  }
};

const loginEmail = async ({ email, fullname, ip, device, location, time }) => {
  const { subject, text, html } = loginAlertTemplate({ fullname, ip, device, location, time });
  try {
    await sendEmail({
      to: email,
      subject,
      text,
      html,
    });
  } catch (error) {
    logger.error('Sending email on login ');
  }
};

export default {
  registerEmail,
  loginEmail,
};
