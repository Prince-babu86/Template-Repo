import authDao from './auth.dao.js';
import ApiError from '../../utils/AppError.js';


// // phase 1
const registerService = async ({ fullname, email, password }) => {
  const isUserExist = await authDao.findByEmail(email);

  if (isUserExist) {
    throw new ApiError(409, 'User Already exist try another email');
  }

  const userData = {
    fullname,
    email,
    password,
    role: 'USER',
  };
  const newUser = await authDao.createUser(userData);

  if (!newUser) {
    throw new ApiError(404, 'User not found');
  }

  newUser.password = undefined;

  return newUser;
};

//
const loginService = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email and password is required');
  }

  const user = await authDao.findByEmail(email);

  if (!user) {
    throw new ApiError(404, 'Invalid Email try again with another email');
  }

  if (!(await user.comparePassword(password))) {
    throw new ApiError(401, 'Wrong Password');
  }
  user.password = undefined;

  return user;
};

//
const logoutService = async () => {};

// phase 2

const accountLockService = async () => {};

const emailVarificationService = async () => {};

const chnagePasswordService = async ({userId , currentPassword , newPassword}) => {
};

const forgotPasswordService = async () => {};

const resetPasswordService = async () => {};

const loggingAttemptService = async () => {};

// phase 3

const sessionmanagementService = async () => {};

const multiDeviceSessionService = async () => {};

const twoStepVarifacationService = async () => {};

const googleAuthService = async () => {};

const githubAuthService = async () => {};

const loginAlertsService = async () => {};

export default {
  registerService,
  loginService,
  logoutService,
  accountLockService,
  emailVarificationService,
  chnagePasswordService,
  forgotPasswordService,
  resetPasswordService,
  loggingAttemptService,
  sessionmanagementService,
  multiDeviceSessionService,
  twoStepVarifacationService,
  googleAuthService,
  githubAuthService,
  loginAlertsService,
};
