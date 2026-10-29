import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { env } from './config/env.js';
import healthRoutes from './routes/health.routes.js';
import publicRoutes from './routes/public.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { apiLimiter } from './middleware/rateLimiters.js';
import { csrfProtection } from './middleware/csrf.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security headers
app.use(helmet());

// Explicit CORS policy - never wildcard with credentials
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token'],
  })
);

// Standard parsers with strict size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(cookieParser());

// Server-side Session Management
// Uses MongoStore if MONGODB_URI is provided and connected; otherwise MemoryStore for test/offline
const sessionOptions = {
  name: 'np_session',
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 8 * 60 * 60 * 1000, // 8 hours session expiry
  },
};

if (env.MONGODB_URI && env.NODE_ENV === 'production') {
  sessionOptions.store = MongoStore.create({
    mongoUrl: env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 8 * 60 * 60,
  });
}

app.use(session(sessionOptions));

// Double Submit Cookie CSRF protection
app.use(csrfProtection);

// Rate limit general /api/ requests
app.use('/api/', apiLimiter);

// API v1 routes
app.use('/api/v1', healthRoutes);
app.use('/api/v1', publicRoutes);
app.use('/api/v1/admin', adminRoutes);

// 404 handler for unknown routes
app.use('/api/*', (_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'API route not found',
    },
  });
});

// Centralized error handler
app.use(errorHandler);

export default app;
