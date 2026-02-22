import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/modules/auth/user.model.js';
import config from '../src/config/config.js';
import logger from '../src/loggers/winston.logger.js'

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DB Connected');
  } catch (err) {
    console.error('DB Connection Failed:', err.message);
    process.exit(1);
  }
};

const createSuperAdmin = async () => {
  try {
    await connectDB(); // 🔴 THIS WAS MISSING

    const existing = await User.findOne({ role: 'SUPER_ADMIN' });

    if (existing) {
      console.log('Super admin already exists');
      process.exit();
    }

    await User.create({
      fullname:config.superAdminName,
      email: config.superAdminEmail,
      password:config.superAdminPassword,
      role:config.superAdminRole,
    });

  logger.info('Super admin created successfully');
    // process.exit();

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    logger.error('Error creating super admin:', err);
    process.exit(1);
  }
};

createSuperAdmin().catch((err) => {
  logger.error('Unexpected error:', err);
  process.exit(1);
});
