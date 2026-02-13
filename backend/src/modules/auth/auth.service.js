// phase 1

import authDao from './auth.dao.js';
import ApiError from '../../utils/AppError.js';

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

const loginService = async () => {};

const logoutService = async () => {};

// phase 2

const accountLockService = async () => {};

const emailVarificationService = async () => {};

const chnagePasswordService = async () => {};

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
