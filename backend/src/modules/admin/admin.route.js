import express, { Router } from 'express';
import adminController from './admin.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
const router = express.Router();

import { validate } from '../../middlewares/validate.middleware.js';
import adminValidator from './admin.validator.js';

router.route('/').get(adminController.getAllUsers);

// phase 1

// create admin user - only SUPER_ADMIN can create new admin users
router
  .route('/create-admin')
  .post(
    authMiddleware.authenticate,
    authMiddleware.restrictTo('SUPER_ADMIN'),
    validate(adminValidator.createAdminValidation),
    adminController.createUser
  );

export default router;
