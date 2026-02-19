import authDao from './auth.dao.js';
import ApiError from '../../utils/AppError.js';
import authEmail from './auth.email.js';
import logger from '../../loggers/winston.logger.js';

// // phase 1
const registerService = async ({ fullname, email, password  , ip}) => {
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

  authEmail
    .registerEmail({
      email: newUser.email,
      fullname: newUser.fullname,
    })
    .catch((error) => {
      logger.error('Error sending registration email:', error);
    });

  newUser.password = undefined;

  return newUser;
};

//
const loginService = async ({  email, password , ip, device, location, time , }) => {
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

  authEmail.loginEmail({
    email: user.email,
    fullname: user.fullname,
    ip,
    device,
    location,
    time,
  }).catch((error) => {
    logger.error('Error sending login alert email:', error);
  })
  user.password = undefined;

  return user;
};

//
const logoutService = async () => {};

// phase 2

const accountLockService = async () => {};

const emailVarificationService = async () => {};

const chnagePasswordService = async ({ userId, currentPassword, newPassword }) => {
  const user = await authDao.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User Not found');
  }

  // check if current password is correct
  if (!(await user.comparePassword(currentPassword))) {
    throw new ApiError(401, 'Wrong Old Password');
  }

  // check if new password is same as old password
  const isSamePassword = await user.comparePassword(newPassword);

  if (isSamePassword) {
    throw new ApiError(400, 'New password must be different from old password');
  }

  user.password = newPassword;

  await user.save();

  user.password = undefined;
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
