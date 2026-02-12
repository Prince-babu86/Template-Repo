import asyncHandler from '../../utils/asyncHandler.js';
import userService from './user.service.js';

// phase 1

const getMe = asyncHandler(async (req, res) => {});

const updateProfile = asyncHandler(async (req, res) => {});

const updateProfilePic = asyncHandler(async (req, res) => {});

const changePassword = asyncHandler(async (req, res) => {});

const sofeDeleteAccount = asyncHandler(async (req, res) => {});

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
};
