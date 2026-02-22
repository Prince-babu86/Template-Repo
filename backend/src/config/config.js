import dotenv from 'dotenv';

dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL,

  JWT_SECRET: process.env.JWT_SECRET,

  // google auth
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_callbackURL,
  emailUser: process.env.GOOGLE_EMAIL_USER,
  emailPassword: process.env.GOOGLE_EMAIL_PASSWORD,
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
  emailSecure: process.env.EMAIL_SECURE === 'true',
  frontend_url:process.env.FRONTEND_URL
};

export default config;
