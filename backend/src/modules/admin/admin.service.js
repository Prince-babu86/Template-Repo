import ApiError from '../../utils/AppError.js';
import asyncHandler from '../../utils/asyncHandler.js';
import adminDao from './admin.dao.js';
import logger from '../../loggers/winston.logger.js';

// phase 1

const createAdminService = async ({ fullname, email, password, role }) => {
  const isExistingAdmin = await adminDao.findAdminByEmail(email);

  if (isExistingAdmin) {
    throw new ApiError(400, 'User with this email already exists');
  }

  if (role !== 'ADMIN') {
    throw new ApiError(400, 'Invalid role specified');
  }

  const newAdmin = await adminDao.createAdmin({
    fullname,
    email,
    password,
    role,
  });

  logger.info(`New admin created: ${newAdmin.email} by SUPER_ADMIN`);

  newAdmin.password = undefined;

  return newAdmin;
};

const getAllUsersService = async () => {};

const blockUserService = async () => {};

const unblockUserService = async () => {};

const deleteUserService = async () => {};

const viewUserService = async () => {};

// phase 2

const roleAssignService = async () => {};

const viewLoginLogsService = async () => {};

const forcePasswordResetService = async () => {};

const adminDashBoardService = async () => {};

export default {
  createAdminService,
  getAllUsersService,
  blockUserService,
  unblockUserService,
  deleteUserService,
  viewUserService,
  roleAssignService,
  viewLoginLogsService,
  forcePasswordResetService,
  adminDashBoardService,
};
