import emailVerifiedTemplate from '../../templates/verifiedEmail.js';
import verifyEmailTemplate from '../../templates/verifyEmail.js';
import sendEmail from '../../utils/sendEmail.js';

const emailVarificationToken = async ({ fullname, email, otp }) => {
  const { subject, text, html } = verifyEmailTemplate({ fullname, otp });

  await sendEmail({
    to: email,
    subject,
    text,
    html,
  });
};

const emailVerificationSuccess = async ({ fullname, email }) => {
  const { subject, text, html } = emailVerifiedTemplate({ fullname });

  await sendEmail({
    to: email,
    subject,
    text,
    html,
  });
};

export default {
  emailVarificationToken,
  emailVerificationSuccess,
};
