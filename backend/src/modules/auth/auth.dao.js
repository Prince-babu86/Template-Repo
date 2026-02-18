import User from './user.model.js';

const createUser = async (userdata) => {
  return await User.create(userdata);
};

const findById = async (userId) => {
  return await User.findById(userId);
};

const findByEmail = async (email) => {
  return await User.findOne({ email }).select('+password');
};

const findOne = async (data) => {
  return await User.findOne({
    email: data.email,
  });
};

export default {
  findById,
  findOne,
  createUser,
  findByEmail,
};
