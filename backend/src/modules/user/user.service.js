// phase 1

import ApiError from '../../utils/AppError.js';
import userDao from './user.dao.js';

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
};
