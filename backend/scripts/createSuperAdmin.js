import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/modules/auth/user.model.js';

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
      fullname: 'SuperAdmin',
      email: 'superadmin@gmail.com',
      password: 'superadmin123',
      role: 'SUPER_ADMIN',
    });

    console.log('Super admin created successfully');
    // process.exit();

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error creating super admin:', err);
    process.exit(1);
  }
};

createSuperAdmin().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
