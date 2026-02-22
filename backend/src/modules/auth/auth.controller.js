import config from '../../config/config.js';
import { ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from '../../constants/constants.js';
import ApiError from '../../utils/AppError.js';
import asyncHandler from '../../utils/asyncHandler.js';
import generateAccessToken from '../../utils/generateAccessToken.js';
import generateRefreshToken from '../../utils/generateRefershToken.js';
import { timeStringToSeconds } from '../../utils/timeStringToSeconds.js';
import authService from './auth.service.js';

// phase 1
const register = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  const user = await authService.registerService({ fullname, email, password });

  if (!user) {
    throw new ApiError(404, 'User Not found');
  }

  const accessToken = await generateAccessToken({
    userId: user._id, // generate accessToken with email and _id
    email: user.email,
  });

  const refreshToken = await generateRefreshToken({
    userId: user._id, // generate refershToekn with user onl _id
  });

  const refreshExpirySecs = timeStringToSeconds(REFRESH_TOKEN_EXPIRATION); // convert time to seconds

  const accessExpirySecs = timeStringToSeconds(ACCESS_TOKEN_EXPIRATION); // convert time to seconds

  const isProduction = config.NODE_ENV === 'production';

  // console.log(refreshExpirySecs , accessExpirySecs);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production
    sameSite: 'none',
    maxAge: refreshExpirySecs * 1000, // Convert to milliseconds for cookie maxAge
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production
    sameSite: 'none',
    maxAge: accessExpirySecs * 1000, // Convert to milliseconds for cookie maxAge
  });

  return res.status(201).json({
    sucess: true,
    message: 'User created sucessfully',
    // refreshToken,
    // accessToken,
    // user,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const device = req.headers['user-agent'] || 'Unknown device';
  const location = 'Unknown location'; // You can use a geolocation service to get location from IP
  const time = new Date().toLocaleString();

  const user = await authService.loginService({ email, password, ip, device, location, time });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const accessToken = await generateAccessToken({
    userId: user._id, // generate accessToken with email and _id
    email: user.email,
  });

  const refreshToken = await generateRefreshToken({
    userId: user._id, // generate refershToekn with user onl _id
  });

  const refreshExpirySecs = timeStringToSeconds(REFRESH_TOKEN_EXPIRATION); // convert time to seconds

  const accessExpirySecs = timeStringToSeconds(ACCESS_TOKEN_EXPIRATION); // convert time to seconds

  const isProduction = config.NODE_ENV === 'production';

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production
    sameSite: 'none',
    maxAge: refreshExpirySecs * 1000, // Convert to milliseconds for cookie maxAge
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production
    sameSite: 'none',
    maxAge: accessExpirySecs * 1000, // Convert to milliseconds for cookie maxAge
  });

  return res.status(201).json({
    sucess: true,
    message: 'User Login sucessfully',
    // refreshToken,
    // accessToken,
    // user,
  });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

// phase 2

const accountLock = asyncHandler(async (req, res) => {});

const emailVarification = asyncHandler(async (req, res) => {});

const chnagePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!req.user || !req.user.id) {
    throw new ApiError(401, 'Unauthorized');
  }

  const userEmail = req.user.email;
  const userId = req.user._id;

  await authService.chnagePasswordService({ userId, currentPassword, newPassword });

  res.status(200).json({
    sucess: true,
    message: 'Password changed sucessfully',
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  const user = await authService.forgotPasswordService({ email });

  if (!user) {
    throw new ApiError(404, 'User Not found');
  }

  res.status(200).json({
    sucess: true,
    message: 'Password reset link sent to email',
  });
});

const resetPassword = asyncHandler(async (req, res) => {});

const loggingAttempt = asyncHandler(async (req, res) => {});

// phase 3

const sessionmanagement = asyncHandler(async (req, res) => {});

const multiDeviceSession = asyncHandler(async (req, res) => {});

const twoStepVarifacation = asyncHandler(async (req, res) => {});

const googleAuthCallback = asyncHandler(async (req, res) => {
  // Successful authentication, generate tokens and send response
  const user = req.user;

  if (!user) {
    throw new ApiError(404, 'User Not found');
  }

  const accessToken = await generateAccessToken({
    userId: user._id, // generate accessToken with email and _id
    email: user.email,
  });

  const refreshToken = await generateRefreshToken({
    userId: user._id, // generate refershToekn with user onl _id
  });

  const refreshExpirySecs = timeStringToSeconds(REFRESH_TOKEN_EXPIRATION); // convert time to seconds

  const accessExpirySecs = timeStringToSeconds(ACCESS_TOKEN_EXPIRATION); // convert time to seconds

  const isProduction = config.NODE_ENV === 'production';

  // console.log(refreshExpirySecs , accessExpirySecs);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production
    sameSite: 'none',
    maxAge: refreshExpirySecs * 1000, // Convert to milliseconds for cookie maxAge
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production
    sameSite: 'none',
    maxAge: accessExpirySecs * 1000, // Convert to milliseconds for cookie maxAge
  });

  res.redirect(config.frontend_url);

  res.status(200).json({
    success: true,
    message: 'User authenticated with Google successfully',
    // refreshToken, // remove after testing
    // accessToken, // remove after testing
    // user, // remove after testing
  });
});

const githubAuth = asyncHandler(async (req, res) => {});

const loginAlerts = asyncHandler(async (req, res) => {});

export default {
  register,
  login,
  logout,
  accountLock,
  emailVarification,
  chnagePassword,
  forgotPassword,
  resetPassword,
  loggingAttempt,
  sessionmanagement,
  multiDeviceSession,
  twoStepVarifacation,
  googleAuthCallback,
  githubAuth,
  loginAlerts,
};
