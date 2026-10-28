import { env } from '../config/env.js';

export function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || (err.name === 'ValidationError' ? 400 : 500);

  // In production, avoid leaking internal details or stack traces
  const response = {
    success: false,
    error: {
      code: err.code || (statusCode === 500 ? 'INTERNAL_SERVER_ERROR' : 'REQUEST_ERROR'),
      message: statusCode === 500 && env.NODE_ENV === 'production'
        ? 'An unexpected error occurred. Please try again later.'
        : err.message,
    },
  };

  if (err.details) {
    response.error.details = err.details;
  }

  // Only log stack traces in non-production, and never log secrets or personal tokens
  if (statusCode === 500) {
    console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message);
    if (env.NODE_ENV !== 'production' && err.stack) {
      console.error(err.stack);
    }
  }

  res.status(statusCode).json(response);
}
