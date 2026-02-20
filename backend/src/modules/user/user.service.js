// phase 1

import logger from '../../loggers/winston.logger.js';
import ApiError from '../../utils/AppError.js';
import { generateOTP, hashOTP } from '../../utils/otp.js';
import userDao from './user.dao.js';
import userEmail from './user.email.js';

const getMeService = async (id) => {
  if (!id) {
    throw new ApiError(404, 'Id not found');
  }

  const user = await userDao.getById(id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

const sendVerificationEmailService = async (email) => {
  // check if email exists in db
  const user = await userDao.findByEmail(email);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.isEmailVerified) {
    throw new ApiError(400, 'Email already verified');
  }

  // sent after every 2 minutes
  if (user.emailVerificationSentAt && Date.now() - user.emailVerificationSentAt < 2 * 60 * 1000) {
    throw new ApiError(429, 'Verification email already sent. Please try again later.');
  }

  if (user.emailVerificationAttempts >= 5) {
    throw new ApiError(429, 'Too many verification attempts. Please try again later.');
  }

  // generate verification token

  const { otp, hashedOTP, expiresAt } = generateOTP();

  if (!otp || !hashedOTP || !expiresAt) {
    throw new ApiError(500, 'Failed to generate OTP. Please try again.');
  }

  // saved hashed otp and expiry time in db against user
  user.emailVerificationToken = hashedOTP;
  user.emailVerificationSentAt = Date.now();
  user.emailVerificationExpiresAt = expiresAt;
  user.emailVerificationAttempts = 0;

  user.emailVerificationAttempts = (user.emailResendCount || 0) + 1;

  await user.save();

  // send email to user with otp
  userEmail
    .emailVarificationToken({
      fullname: user.fullname,
      email: user.email,
      otp,
    })
    .catch((err) => {
      logger.error('Failed to send verification email:', err);
    });
};

const verifyEmailService = async ({ otp, email }) => {
  const user = await userDao.findByEmail(email);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.isEmailVerified) {
    throw new ApiError(400, 'Email already verified');
  }

  if (!user.emailVerificationToken || !user.emailVerificationExpiresAt) {
    throw new ApiError(400, 'No verification token found. Please request a new one.');
  }

  if (user.emailVerificationExpiresAt < Date.now()) {
    throw new ApiError(400, 'Verification token expired. Please request a new one.');
  }

  if (user.emailVerificationAttempts >= 5) {
    throw new ApiError(429, 'Too many verification attempts. Please request a new token.');
  }

  if (user.emailVerificationToken !== hashOTP(otp)) {
    throw new ApiError(400, 'Invalid OTP. please check and try again.');
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationSentAt = undefined;
  user.emailVerificationExpiresAt = undefined;
  user.emailVerificationAttempts = 0;

  userEmail
    .emailVerificationSuccess({
      fullname: user.fullname,
      email: user.email,
    })
    .catch((err) => {
      logger.error('Failed to send email verification success email:', err);
    });

  await user.save();

  return;
};

const updateProfileService = async () => {};

const updateProfilePicService = async () => {};

const changePasswordService = async () => {};

const sofeDeleteAccountService = async () => {};

// phase 2

const emailChangeWithVarificationService = async () => {};

const profilePrivacyService = async () => {};

const accountStatusService = async () => {};

const activitylogsService = async () => {};

// phase 3 advanced

export default {
  getMeService,
  updateProfileService,
  updateProfilePicService,
  changePasswordService,
  sofeDeleteAccountService,
  emailChangeWithVarificationService,
  profilePrivacyService,
  accountStatusService,
  activitylogsService,
  sendVerificationEmailService,
  verifyEmailService,
};
