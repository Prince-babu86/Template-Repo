const verifyEmailTemplate = ({ fullname, otp }) => {
  return {
    subject: 'Verify Your Email Address',

    text: `Hello ${fullname},
Your OTP for email verification is ${otp}.
This OTP is valid for 5 minutes.
If you did not request this, please ignore this email.`,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 500px; margin: auto;">
        
        <h2 style="color: #333;">Email Verification 🔐</h2>
        
        <p>Hello <strong>${fullname}</strong>,</p>
        
        <p>Use the OTP below to verify your email address:</p>
        
        <div style="
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 4px;
          background: #f4f4f4;
          padding: 12px;
          text-align: center;
          border-radius: 6px;
          margin: 20px 0;
        ">
          ${otp}
        </div>

        <p>This OTP is valid for <strong>5 minutes</strong>.</p>

        <p>If you did not request this, you can safely ignore this email.</p>

        <hr />

        <p style="font-size: 12px; color: #777;">
          For security reasons, do not share this OTP with anyone.
        </p>

      </div>
    `,
  };
};

export default verifyEmailTemplate;
