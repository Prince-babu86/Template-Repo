const registerTemplate = ({ fullname }) => {
  return {
    subject: 'Welcome to our platform!',
    text: `Hello ${fullname}, welcome to our platform!`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome, ${fullname} 🎉</h2>
        <p>Thank you for registering with us.</p>
        <p>We're excited to have you on board!</p>

        <hr />

        <p style="font-size: 12px; color: #777;">
          If you did not create this account, please ignore this email.
        </p>
      </div>
    `,
  };
};

export default registerTemplate;
