import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import authValidator from './auth.validator.js';
import authController from './auth.controller.js';
const router = express.Router();

router.route('/register').post(validate(authValidator.registerValidator), authController.register);

export default router;
