import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import authValidator from './auth.validator.js';
import authController from './auth.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
import passport from 'passport';
const router = express.Router();

// routes

// 1. register route
router.route('/register').post(validate(authValidator.registerValidator), authController.register);

// 2. login route
router.route('/login').post(validate(authValidator.loginValidator), authController.login);

// 3. logout route
router.route('/logout').get(authMiddleware.authenticate, authController.logout);

// 4. google auth route
// Route to initiate Google OAuth flow
router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route that Google will redirect to after authentication

router
  .route('/google/callback')
  .get(
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    authController.googleAuthCallback
  );

export default router;
