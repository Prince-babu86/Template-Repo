import express from 'express';
import adminController from './admin.controller.js';
const router = express.Router();

router.route('/').get(adminController.getAllUsers);

export default router;
