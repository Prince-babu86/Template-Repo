import express, { Router } from 'express';
import adminController from './admin.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';
const router = express.Router();

router.route('/').get(adminController.getAllUsers);


// phase 1

router.route("/create").post(
    authMiddleware.authenticate,
    authMiddleware.restrictTo('ADMIN'),
    adminController.createUser
)

export default router;
