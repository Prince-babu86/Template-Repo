const emailVerifiedTemplate = ({ fullname }) => {
  return {
    subject: 'Your Email Has Been Verified ✅',

    text: `Hello ${fullname},
Your email has been successfully verified.
You can now access all features of our platform.

If this was not you, please contact support immediately.`,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 500px; margin: auto;">
        
        <h2 style="color: #28a745;">Email Verified Successfully 🎉</h2>
        
        <p>Hello <strong>${fullname}</strong>,</p>
        
        <p>Your email has been successfully verified.</p>
        
        <p>You now have full access to your account and all features.</p>

        <div style="
          margin: 20px 0;
          padding: 15px;
          background-color: #f4f4f4;
          border-radius: 6px;
          text-align: center;
        ">
          ✅ Your account is now fully active
        </div>

        <p>If this wasn't you, please contact our support team immediately.</p>

        <hr />

        <p style="font-size: 12px; color: #777;">
          Thank you for choosing our platform.
        </p>

      </div>
    `,
  };
};

export default emailVerifiedTemplate;
