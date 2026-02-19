const loginAlertTemplate = ({ fullname, ip, device, location = 'Unknown location', time }) => {
  return {
    subject: 'New Login Detected 🚨',

    text: `Hello ${fullname},
A new login was detected.

IP: ${ip}
Device: ${device}
Location: ${location}
Time: ${time}

If this wasn't you, please secure your account immediately.`,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>🚨 New Login Detected</h2>

        <p>Hello <strong>${fullname}</strong>,</p>

        <p>We detected a new login to your account.</p>

        <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
          <tr>
            <td><strong>IP Address:</strong></td>
            <td>${ip}</td>
          </tr>
          <tr>
            <td><strong>Device:</strong></td>
            <td>${device}</td>
          </tr>
          <tr>
            <td><strong>Location:</strong></td>
            <td>${location}</td>
          </tr>
          <tr>
            <td><strong>Time:</strong></td>
            <td>${time}</td>
          </tr>
        </table>

        <p style="margin-top: 20px;">
          If this was you, you can safely ignore this email.
        </p>

        <p style="color: red;">
          If this wasn't you, please change your password immediately.
        </p>

        <hr />

        <p style="font-size: 12px; color: #777;">
          Security alert from your application.
        </p>
      </div>
    `,
  };
};

export default loginAlertTemplate;
