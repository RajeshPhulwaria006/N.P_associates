import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('GET /api/v1/health', () => {
  it('should return 200 with healthy status', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('healthy');
    expect(res.body.data.services).toBeDefined();
    expect(res.body.data.environment).toBeDefined();
    // Verify no secret leak
    expect(res.body.data.SESSION_SECRET).toBeUndefined();
    expect(res.body.data.MONGODB_URI).toBeUndefined();
  });

  it('should return 404 for non-existent API routes', async () => {
    const res = await request(app).get('/api/v1/non-existent-route');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
