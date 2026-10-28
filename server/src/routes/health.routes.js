import express from 'express';
import { isDbConnected } from '../config/database.js';
import { env } from '../config/env.js';

const router = express.Router();

router.get('/health', (_req, res) => {
  const dbStatus = isDbConnected() ? 'connected' : 'disconnected';

  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      services: {
        database: dbStatus,
      },
    },
  });
});

export default router;
