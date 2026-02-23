import logger from '../../loggers/winston.logger.js';
import ApiError from '../../utils/AppError.js';
import asyncHandler from '../../utils/asyncHandler.js';
import userService from './user.service.js';

// phase 1

const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  logger.info(`${user.fullname} with ${user.email} thats role is ${user.role}`)

  return res.status(200).json({
    sucess: true,
    user,
  });
});

const updateProfile = asyncHandler(async (req, res) => {});

const updateProfilePic = asyncHandler(async (req, res) => {});

const changePassword = asyncHandler(async (req, res) => {});

const sofeDeleteAccount = asyncHandler(async (req, res) => {});

const sendVerificationEmail = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.email) {
    throw new ApiError(400, 'unauthenticated user or email not found');
  }

  const email = req.user.email;

  if (!email) {
    throw new ApiError(400, 'Email not found');
  }

  await userService.sendVerificationEmailService(email);

  logger.info(`Verification email sent to ${email}`);

  res.status(200).json({
    status: 'success',
    message: 'Verification email sent successfully',
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.email) {
    throw new ApiError(400, 'unauthenticated user or email not found');
  }
  const { otp } = req.body;
  const email = req.user.email;

  if (!otp || typeof otp !== 'string' || otp.trim() === '' || otp.length > 6) {
    throw new ApiError(400, 'Invalid OTP');
  }

  // verify otp and update email verification status in db

  await userService.verifyEmailService({ otp, email });

  logger.info(`Email verified for ${email}`);

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully',
  });
});

// phase 2

const emailChangeWithVarification = asyncHandler(async (req, res) => {});

const profilePrivacy = asyncHandler(async (req, res) => {});

const accountStatus = asyncHandler(async (req, res) => {});

const activitylogs = asyncHandler(async (req, res) => {});

// phase 3 advanced

export default {
  getMe,
  updateProfile,
  updateProfilePic,
  changePassword,
  sofeDeleteAccount,
  emailChangeWithVarification,
  profilePrivacy,
  accountStatus,
  activitylogs,

  sendVerificationEmail,
  verifyEmail,
};
