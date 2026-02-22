import express from 'express';
import http from 'http';
import config from './src/config/config.js';
import errorMiddleware from './src/middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet'

const app = express();
const httpServer = http.createServer(app);

// middlewares

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: config.frontend_url,
    credentials: true,
  })
);

// rateLimting

// passport config
import passport from './src/config/passport.js';
// import passport from 'passport'
app.use(passport.initialize());

// routes
import authRoutes from './src/modules/auth/auth.route.js';
import userRoutes from './src/modules/user/user.route.js';
import adminRoutes from './src/modules/admin/admin.route.js';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin', adminRoutes);

// simple route for checking server status
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'sucess',
    message: 'Welcome to template-repo',
    environment: config.NODE_ENV,
  });
});

// 404 route handler for undefined routes
app.all('*name', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  ((err.status = 'fail'), next(err));
});

// error middlewares
app.use(errorMiddleware);

export default httpServer;
