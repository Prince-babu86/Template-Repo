import asyncHandler from '../../utils/asyncHandler.js';
import adminService from './admin.service.js';

// phase 1

const getAllUsers = asyncHandler(async (req, res) => {});

const blockUser = asyncHandler(async (req, res) => {});

const unblockUser = asyncHandler(async (req, res) => {});

const deleteUser = asyncHandler(async (req, res) => {});

const viewUser = asyncHandler(async (req, res) => {});

// phase 2

const roleAssign = asyncHandler(async (req, res) => {});

const viewLoginLogs = asyncHandler(async (req, res) => {});

const forcePasswordReset = asyncHandler(async (req, res) => {});

const adminDashBoard = asyncHandler(async (req, res) => {});

export default {
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
  viewUser,
  roleAssign,
  viewLoginLogs,
  forcePasswordReset,
  adminDashBoard,
};
