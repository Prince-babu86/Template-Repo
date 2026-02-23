import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import ApiError from '../utils/AppError.js';
import userService from '../modules/user/user.service.js';

const authenticate = async (req, res, next) => {
  try {
    let token;
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    } else if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'You are not logged in. Please log in to get access.');
    }

    const decoded = await jwt.verify(token, config.JWT_SECRET);

    const user = await userService.getMeService(decoded.id);

    if (!user) {
      throw new Error(404, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Unauthorized'));
    }

    // roles is an array form
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden'));
    }

    next();
  };
};

export default {
  authenticate,
  restrictTo,
};
