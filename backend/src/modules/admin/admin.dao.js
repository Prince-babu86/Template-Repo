import User from '../auth/user.model.js';

const createAdmin = async (adminData) => {
    return await User.create(adminData);
};

const findOneAdmin = async (query) => {
  return await User.findOne({});
};

const findAdminByEmail = async (email) => {
  return await User.findOne({ email });
};

export default {
  createAdmin,
  findAdminByEmail,
};
