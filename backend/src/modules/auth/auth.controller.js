import asyncHandler from '../../utils/asyncHandler.js';

// phase 1
const register = asyncHandler(async (req, res) => {});

const login = asyncHandler(async (req, res) => {});

const logout = asyncHandler(async (req, res) => {});

// phase 2

const accountLock = asyncHandler(async (req, res) => {});

const emailVarification = asyncHandler(async (req, res) => {});

const chnagePassword = asyncHandler(async (req, res) => {});

const forgotPassword = asyncHandler(async (req, res) => {});

const resetPassword = asyncHandler(async (req, res) => {});

const loggingAttempt = asyncHandler(async (req, res) => {});

// phase 3

const sessionmanagement = asyncHandler(async (req, res) => {});

const multiDeviceSession = asyncHandler(async (req, res) => {});

const twoStepVarifacation = asyncHandler(async (req, res) => {});

const googleAuth = asyncHandler(async (req, res) => {});

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
  googleAuth,
  githubAuth,
  loginAlerts,
};
