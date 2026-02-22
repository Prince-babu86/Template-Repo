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
  emailSecure: process.env.EMAIL_SECURE === 'false',
  frontend_url:process.env.FRONTEND_URL,

  // super-amin

  superAdminEmail:process.env.SUPER_ADMIN_EMAIL,
  superAdminName:process.env.SUPER_ADMIN_NAME,
  superAdminPassword:process.env.SUPER_ADMIN_PASSWORD,
  superAdminRole:process.env.SUPER_ADMIN_ROLE
};

export default config;
