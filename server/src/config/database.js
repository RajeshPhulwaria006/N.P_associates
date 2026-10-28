import mongoose from 'mongoose';
import { env } from './env.js';

let isConnected = false;

export async function connectDB() {
  if (!env.MONGODB_URI) {
    console.warn('[DB] MONGODB_URI not configured. Skipping database connection (test/dev mode).');
    return null;
  }

  if (isConnected) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[DB] Connected to MongoDB: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.error('[DB] Connection error:', error.message);
    if (env.NODE_ENV === 'production') {
      throw error;
    }
    return null;
  }
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
  }
}
