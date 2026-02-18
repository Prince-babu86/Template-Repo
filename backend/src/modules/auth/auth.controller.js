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
    sameSite: 'lax',
    maxAge: refreshExpirySecs * 1000, // Convert to milliseconds for cookie maxAge
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production
    sameSite: 'lax',
    maxAge: accessExpirySecs * 1000, // Convert to milliseconds for cookie maxAge
  });

  res.status(201).json({
    sucess: true,
    message: 'User created sucessfully',
    refreshToken,
    accessToken,
    user,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginService({ email, password });

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
    sameSite: 'lax',
    maxAge: refreshExpirySecs * 1000, // Convert to milliseconds for cookie maxAge
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production
    sameSite: 'lax',
    maxAge: accessExpirySecs * 1000, // Convert to milliseconds for cookie maxAge
  });

  res.status(201).json({
    sucess: true,
    message: 'User created sucessfully',
    refreshToken,
    accessToken,
    user,
  });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

// phase 2

const accountLock = asyncHandler(async (req, res) => {});

const emailVarification = asyncHandler(async (req, res) => {});

const chnagePassword = asyncHandler(async (req, res) => {

 
});

const forgotPassword = asyncHandler(async (req, res) => {});

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
    sameSite: 'lax',
    maxAge: refreshExpirySecs * 1000, // Convert to milliseconds for cookie maxAge
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production
    sameSite: 'lax',
    maxAge: accessExpirySecs * 1000, // Convert to milliseconds for cookie maxAge
  });

  res.status(200).json({
    success: true,
    message: 'User authenticated with Google successfully',
    refreshToken, // remove after testing
    accessToken, // remove after testing
    user, // remove after testing
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
