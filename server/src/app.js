import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import healthRoutes from './routes/health.routes.js';
import publicRoutes from './routes/public.routes.js';
import { apiLimiter } from './middleware/rateLimiters.js';
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
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Standard parsers with strict size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(cookieParser());

// Rate limit general /api/ requests
app.use('/api/', apiLimiter);

// API v1 routes
app.use('/api/v1', healthRoutes);
app.use('/api/v1', publicRoutes);

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
