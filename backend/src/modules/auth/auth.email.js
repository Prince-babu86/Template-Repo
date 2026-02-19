import loginAlertTemplate from '../../templates/login.email.js';
import registerTemplate from '../../templates/register.email.js';
import sendEmail from '../../utils/sendEmail.js';

const registerEmail = async ({ email, fullname }) => {
  const { subject, text, html } = registerTemplate({ fullname });

  await sendEmail({
    to: email,
    subject,
    text,
    html,
  });
};


const loginEmail = async ({email, fullname, ip, device, location, time}) => {
    const { subject, text, html } = loginAlertTemplate({ fullname, ip, device, location, time });
    await sendEmail({
        to: email,
        subject,
        text,
        html,
    });
}

export default {
  registerEmail,
  loginEmail,
};
