import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Public Routes API', () => {
  it('GET /api/v1/services returns published services', async () => {
    const res = await request(app).get('/api/v1/services');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(6);

    // Verify all categories exist
    const categories = res.body.data.map((s) => s.category);
    expect(categories).toContain('home-loan');
    expect(categories).toContain('business-loan');
    expect(categories).toContain('personal-loan');
    expect(categories).toContain('vehicle-loan');
    expect(categories).toContain('loan-against-property');
    expect(categories).toContain('other-services');

    // Verify draft status or private fields are not present
    res.body.data.forEach((svc) => {
      expect(svc.status).toBe('published');
      expect(svc.adminNotes).toBeUndefined();
    });
  });

  it('GET /api/v1/services/:slug returns single published service', async () => {
    const res = await request(app).get('/api/v1/services/home-loans');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.slug).toBe('home-loans');
    expect(res.body.data.title.en).toBe('Home Loans');
    expect(res.body.data.title.hi).toBeDefined();
  });

  it('GET /api/v1/services/:slug returns 404 for unknown slug', async () => {
    const res = await request(app).get('/api/v1/services/non-existent-loan-type');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('GET /api/v1/guidelines returns published guidelines', async () => {
    const res = await request(app).get('/api/v1/guidelines');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    res.body.data.forEach((g) => {
      expect(g.status).toBe('published');
    });
  });

  it('GET /api/v1/contact-info returns safe configuration placeholders', async () => {
    const res = await request(app).get('/api/v1/contact-info');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.phone).toBeDefined();
    expect(res.body.data.whatsapp).toBeDefined();
  });

  describe('POST /api/v1/enquiries', () => {
    it('rejects invalid submission with missing required fields', async () => {
      const res = await request(app).post('/api/v1/enquiries').send({
        name: '',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('rejects submission without consent', async () => {
      const res = await request(app).post('/api/v1/enquiries').send({
        name: 'Rahul Sharma',
        phone: '9876543210',
        serviceType: 'home-loan',
        consentGiven: false,
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('rejects honeypot bot submission', async () => {
      const res = await request(app).post('/api/v1/enquiries').send({
        name: 'Spam Bot',
        phone: '9876543210',
        serviceType: 'home-loan',
        consentGiven: true,
        website: 'http://spam-link.com',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('handles database write failure gracefully without reporting false success', async () => {
      // In this test environment, MONGODB_URI is not connected, so isDbConnected() is false
      const res = await request(app).post('/api/v1/enquiries').send({
        name: 'Rahul Sharma',
        phone: '9876543210',
        serviceType: 'home-loan',
        preferredLanguage: 'hi',
        message: 'Looking for advice on home loan documentation',
        consentGiven: true,
      });

      expect(res.status).toBe(503);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('SERVICE_UNAVAILABLE');
      // Verify no false reference ID was returned
      expect(res.body.data).toBeUndefined();
    });
  });
});
