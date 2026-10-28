import express from 'express';
import { validateBody } from '../middleware/validate.js';
import { enquiryLimiter } from '../middleware/rateLimiters.js';
import { enquirySubmissionSchema } from '../validation/schemas.js';
import {
  getPublishedServices,
  getPublishedServiceBySlug,
  getPublishedGuidelines,
  getPublishedGuidelineBySlug,
} from '../services/content.service.js';
import { createPublicEnquiry } from '../services/enquiry.service.js';
import { env } from '../config/env.js';

const router = express.Router();

// GET /api/v1/services - published only
router.get('/services', async (_req, res, next) => {
  try {
    const services = await getPublishedServices();
    res.json({
      success: true,
      data: services,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/services/:slug - published only
router.get('/services/:slug', async (req, res, next) => {
  try {
    const service = await getPublishedServiceBySlug(req.params.slug);
    if (!service) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Requested loan service not found or not currently published',
        },
      });
    }
    res.json({
      success: true,
      data: service,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/guidelines - published only
router.get('/guidelines', async (_req, res, next) => {
  try {
    const guidelines = await getPublishedGuidelines();
    res.json({
      success: true,
      data: guidelines,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/guidelines/:slug - published only
router.get('/guidelines/:slug', async (req, res, next) => {
  try {
    const guideline = await getPublishedGuidelineBySlug(req.params.slug);
    if (!guideline) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Requested guideline not found or not currently published',
        },
      });
    }
    res.json({
      success: true,
      data: guideline,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/contact-info - verified configuration contact parameters
router.get('/contact-info', (_req, res) => {
  res.json({
    success: true,
    data: {
      phone: env.BUSINESS_PHONE,
      whatsapp: env.BUSINESS_WHATSAPP,
    },
  });
});

// POST /api/v1/enquiries - validated submission with rate limiting and spam check
router.post(
  '/enquiries',
  enquiryLimiter,
  validateBody(enquirySubmissionSchema),
  async (req, res, next) => {
    try {
      const result = await createPublicEnquiry(req.body);
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
