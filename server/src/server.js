import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/database.js';

async function startServer() {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    console.log(`[Server] N.P Associates API listening on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });

  const shutdown = async (signal) => {
    console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log('[Server] HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

startServer().catch((err) => {
  console.error('[Server] Failed to start server:', err);
  process.exit(1);
});
