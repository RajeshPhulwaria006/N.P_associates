import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import app from '../src/app.js';
import { AdminUser } from '../src/models/AdminUser.js';

describe('Admin Authentication & Authorization Security', () => {
  let agent;
  let csrfToken;
  let testAdmin;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 1) {
      await AdminUser.deleteMany({ email: 'testadmin@npassociates.com' });
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('SecureAdminPass123!', salt);
      testAdmin = await AdminUser.create({
        email: 'testadmin@npassociates.com',
        passwordHash,
        role: 'admin',
        active: true,
      });
    }
    agent = request.agent(app);
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1 && testAdmin) {
      await AdminUser.deleteOne({ _id: testAdmin._id });
    }
  });

  it('GET /api/v1/health generates a valid CSRF cookie for clients', async () => {
    const res = await agent.get('/api/v1/health');
    expect(res.status).toBe(200);

    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    const csrfCookie = cookies.find((c) => c.includes('np_csrf_token'));
    expect(csrfCookie).toBeDefined();

    const match = csrfCookie.match(/np_csrf_token=([^;]+)/);
    csrfToken = match ? match[1] : '';
    expect(csrfToken).toBeTruthy();
  });

  it('Protected route rejects unauthenticated requests with 401 Unauthorized', async () => {
    const res = await request(app).get('/api/v1/admin/auth/me');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('Protected dashboard rejects unauthenticated requests with 401', async () => {
    const res = await request(app).get('/api/v1/admin/dashboard');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('Protected enquiries list rejects unauthenticated requests with 401', async () => {
    const res = await request(app).get('/api/v1/admin/enquiries');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('State-changing admin route rejects requests without CSRF token', async () => {
    const res = await request(app)
      .post('/api/v1/admin/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('CSRF_INVALID');
  });

  it('Login rejects invalid email or missing fields with 400', async () => {
    const res = await agent
      .post('/api/v1/admin/auth/login')
      .set('x-csrf-token', csrfToken)
      .send({ email: 'not-an-email', password: '123' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('Login handles disconnected database safely without hanging', async () => {
    // In headless test mode where DB is disconnected:
    const res = await agent
      .post('/api/v1/admin/auth/login')
      .set('x-csrf-token', csrfToken)
      .send({ email: 'admin@npassociates.com', password: 'Password123!' });

    // Expect either 503 (disconnected DB) or 401 (if DB connected and invalid)
    expect([401, 503]).toContain(res.status);
    expect(res.body.success).toBe(false);
    expect(res.body.error.passwordHash).toBeUndefined();
    expect(res.body.error.stack).toBeUndefined();
  });
});
