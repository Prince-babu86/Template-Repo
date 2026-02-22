import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './config.js';
import logger from '../loggers/winston.logger.js';
import userDao from '../modules/user/user.dao.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL:config.NODE_ENV === "production" ? config.callbackURL : "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Try to find user with the googleId

        let user = await userDao.findByGoogleId(profile.id);

        if (!user && profile.emails && profile.emails.length > 0) {
          // If user with the googleId is not found, try finding user with the same email
          user = await userDao.findByEmail(profile.emails[0].value);

          // If user exist with same email but not googleId then update that user with googleId
          if (user) {
            user.googleId = profile.id;
            await user.save();
          }
        }

        if (!user) {
          // if user with googleId not found and also user with same email not found then create new user with googleId
          user = await userDao.createUserWithGoogle({
            fullname: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });

          logger.info('New user created with Google ID:', `${user.fullname} (${user.email})`);
        }

        return done(null, user);
      } catch (error) {
        logger.error('Error in GoogleStrategy:', error);
        return done(error, null);
      }
    }
  )
);

export default passport;
