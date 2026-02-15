import User from '../auth/user.model.js';

const getById = async (id) => {
  return await User.findById(id).select('-password');
};

const findByGoogleId = async (googleId) => {
  return await User.findOne({ googleId });
};

const createUserWithGoogle = async ({ fullname, email, googleId }) => {
  const userData = {
    fullname,
    email,
    googleId,
  };
  return await User.create(userData);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

export default {
  getById,
  findByGoogleId,
  createUserWithGoogle,
  findByEmail,
};
