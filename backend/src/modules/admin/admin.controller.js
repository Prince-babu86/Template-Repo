import ApiError from '../../utils/AppError.js';
import asyncHandler from '../../utils/asyncHandler.js';
import adminService from './admin.service.js';

// phase 1

const createUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!req.user || !req.user.id || !req.user.role) {
    throw new ApiError(401, 'Unauthorized');
  }

  if (req.user.role !== 'SUPER_ADMIN') {
    throw new ApiError(403, 'Only SUPER_ADMIN can create new admin users');
  }

  const admin = await adminService.createAdminService({
    fullname,
    email,
    password,
    role: 'ADMIN',
  });

  res.status(201).json({
    status: 'success',
    data: {
      admin,
    },
  });
});

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
  createUser,
};
