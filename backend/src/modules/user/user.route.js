import express from 'express'
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/" , authMiddleware.authenticate ,  (req , res) => {
    res.send(req.user)
})


export default router