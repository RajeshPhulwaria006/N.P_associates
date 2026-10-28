import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(5000),
  CLIENT_ORIGIN: z.string().default('http://localhost:3000'),
  // MONGODB_URI is optional in test/dev so health-check / route testing can run without a live database.
  // In production, it must be provided.
  MONGODB_URI: z.string().optional(),
  SESSION_SECRET: z.string().min(16).default('dev_session_secret_change_in_production_32char_min'),
  BUSINESS_PHONE: z.string().default('To be confirmed'),
  BUSINESS_WHATSAPP: z.string().default('To be confirmed'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.format());
  throw new Error('Environment configuration validation failed');
}

if (parsed.data.NODE_ENV === 'production' && !parsed.data.MONGODB_URI) {
  throw new Error('MONGODB_URI is required in production environment');
}

export const env = parsed.data;
