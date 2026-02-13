import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { ACCESS_TOKEN_EXPIRATION } from '../constants/constants.js';

// generate accessToken by user _id and email

const generateAccessToken = async ({ userId = null, email = null }) => {
  return jwt.sign({ id: userId, email }, config.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
};

export default generateAccessToken;
