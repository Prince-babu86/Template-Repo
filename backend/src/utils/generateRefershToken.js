import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { REFRESH_TOKEN_EXPIRATION } from '../constants/constants.js';

// generate by only user _id

const generateRefreshToken = async (userId = null) => {
  return jwt.sign({ id: userId }, config.JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
};

export default generateRefreshToken;
