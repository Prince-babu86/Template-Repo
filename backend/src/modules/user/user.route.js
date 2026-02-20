import express from 'express';
import authMiddleware from '../../middlewares/auth.middleware.js';
import authController from '../auth/auth.controller.js';
import userController from './user.controller.js';
import userRateLimter from './user.rateLimter.js';
const router = express.Router();

router.get('/', authMiddleware.authenticate, authMiddleware.restrictTo('USER'), (req, res) => {
  res.send(req.user);
  console.log(req.user.role);
});

// phase 1
// verify emaail ,
// change password ,
// update profile ,
// update profile pic ,
// soft delete account

// verify email
router
  .route('/send-verification-email')
  .post(authMiddleware.authenticate,
    userRateLimter.otpRateLimiter,
    userController.sendVerificationEmail);

router.route('/verify-email')
.post(
  authMiddleware.authenticate,
  userRateLimter.otpVerificationLimiter,
  userController.verifyEmail);

export default router;
