import express from 'express';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware.authenticate, authMiddleware.restrictTo('USER'), (req, res) => {
  res.send(req.user);
  console.log(req.user.role);
});

export default router;
