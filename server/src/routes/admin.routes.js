import express from 'express';
import mongoose from 'mongoose';
import { AdminUser } from '../models/AdminUser.js';
import { Enquiry } from '../models/Enquiry.js';
import { LoanService } from '../models/LoanService.js';
import { Guideline } from '../models/Guideline.js';
import { AuditLog } from '../models/AuditLog.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { authLimiter } from '../middleware/rateLimiters.js';
import { validateBody } from '../middleware/validate.js';
import {
  adminLoginSchema,
  updateEnquiryStatusSchema,
  serviceMutationSchema,
  guidelineMutationSchema,
} from '../validation/schemas.js';
import { isDbConnected } from '../config/database.js';
import { logAdminAction } from '../services/audit.service.js';

const router = express.Router();

// ==========================================
// Admin Authentication Routes
// ==========================================

// POST /api/v1/admin/auth/login
router.post('/auth/login', authLimiter, validateBody(adminLoginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        error: { code: 'SERVICE_UNAVAILABLE', message: 'Database service unavailable' },
      });
    }

    const admin = await AdminUser.findOne({ email }).select('+passwordHash');
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
      });
    }

    if (!admin.active) {
      return res.status(403).json({
        success: false,
        error: { code: 'ACCOUNT_INACTIVE', message: 'Account is inactive. Contact administrator.' },
      });
    }

    const isMatch = await admin.verifyPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
      });
    }

    // Regenerate session to prevent session fixation
    req.session.regenerate(async (err) => {
      if (err) return next(err);

      req.session.adminId = admin._id.toString();
      admin.lastLoginAt = new Date();
      await admin.save();

      await logAdminAction({
        actorId: admin._id,
        action: 'LOGIN',
        entityType: 'AdminUser',
        entityId: admin._id,
      });

      res.json({
        success: true,
        data: {
          admin: {
            id: admin._id,
            email: admin.email,
            role: admin.role,
            lastLoginAt: admin.lastLoginAt,
          },
        },
      });
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/admin/auth/logout
router.post('/auth/logout', async (req, res, next) => {
  if (req.session?.adminId) {
    const adminId = req.session.adminId;
    await logAdminAction({
      actorId: adminId,
      action: 'LOGOUT',
      entityType: 'AdminUser',
      entityId: adminId,
    });
  }

  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('np_session');
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  });
});

// GET /api/v1/admin/auth/me
router.get('/auth/me', requireAdmin, (req, res) => {
  res.json({
    success: true,
    data: {
      admin: req.admin,
    },
  });
});

// ==========================================
// Dashboard Overview & Enquiries
// ==========================================

// GET /api/v1/admin/dashboard
router.get('/dashboard', requireAdmin, async (_req, res, next) => {
  try {
    const [newEnquiries, totalEnquiries, publishedServices, draftServices, publishedGuidelines] =
      await Promise.all([
        Enquiry.countDocuments({ status: 'new' }),
        Enquiry.countDocuments(),
        LoanService.countDocuments({ status: 'published' }),
        LoanService.countDocuments({ status: 'draft' }),
        Guideline.countDocuments({ status: 'published' }),
      ]);

    const recentAuditLogs = await AuditLog.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .populate('actorId', 'email')
      .lean();

    res.json({
      success: true,
      data: {
        counts: {
          newEnquiries,
          totalEnquiries,
          publishedServices,
          draftServices,
          publishedGuidelines,
        },
        recentAuditLogs,
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/admin/enquiries (paginated & filtered)
router.get('/enquiries', requireAdmin, async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 15));
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status && req.query.status !== 'all') {
      filter.status = req.query.status;
    }
    if (req.query.serviceType && req.query.serviceType !== 'all') {
      filter.serviceType = req.query.serviceType;
    }
    if (req.query.search) {
      const sanitized = req.query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { name: { $regex: sanitized, $options: 'i' } },
        { referenceId: { $regex: sanitized, $options: 'i' } },
        { phone: { $regex: sanitized, $options: 'i' } },
      ];
    }

    const [items, total] = await Promise.all([
      Enquiry.find(filter)
        .select('+adminNotes')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Enquiry.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit) || 1,
        },
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/admin/enquiries/:id
router.get('/enquiries/:id', requireAdmin, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, error: { message: 'Invalid enquiry ID' } });
    }

    const item = await Enquiry.findById(req.params.id).select('+adminNotes').lean();
    if (!item) {
      return res.status(404).json({ success: false, error: { message: 'Enquiry not found' } });
    }

    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/admin/enquiries/:id
router.patch('/enquiries/:id', requireAdmin, validateBody(updateEnquiryStatusSchema), async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, error: { message: 'Invalid enquiry ID' } });
    }

    const updateFields = {};
    if (req.body.status) updateFields.status = req.body.status;
    if (typeof req.body.adminNotes === 'string') updateFields.adminNotes = req.body.adminNotes;

    const updated = await Enquiry.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
    }).select('+adminNotes').lean();

    if (!updated) {
      return res.status(404).json({ success: false, error: { message: 'Enquiry not found' } });
    }

    await logAdminAction({
      actorId: req.admin.id,
      action: req.body.status ? 'ENQUIRY_STATUS_UPDATE' : 'ENQUIRY_NOTE_UPDATE',
      entityType: 'Enquiry',
      entityId: updated._id,
      metadata: { status: updated.status },
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// Admin Services Management
// ==========================================

// GET /api/v1/admin/services (includes drafts)
router.get('/services', requireAdmin, async (_req, res, next) => {
  try {
    const list = await LoanService.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/admin/services
router.post('/services', requireAdmin, validateBody(serviceMutationSchema), async (req, res, next) => {
  try {
    const existing = await LoanService.findOne({ slug: req.body.slug });
    if (existing) {
      return res.status(409).json({ success: false, error: { message: 'Service with this slug already exists' } });
    }

    const created = await LoanService.create({
      ...req.body,
      reviewedAt: new Date(),
    });

    await logAdminAction({
      actorId: req.admin.id,
      action: 'SERVICE_CREATE',
      entityType: 'LoanService',
      entityId: created._id,
      metadata: { slug: created.slug, status: created.status },
    });

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/admin/services/:id
router.patch('/services/:id', requireAdmin, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, error: { message: 'Invalid service ID' } });
    }

    // Explicit field picking to prevent mass assignment
    const allowed = ['title', 'shortDescription', 'description', 'eligibility', 'documents', 'status', 'sortOrder'];
    const update = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) update[key] = req.body[key];
    }
    update.reviewedAt = new Date();

    const updated = await LoanService.findByIdAndUpdate(req.params.id, update, { new: true }).lean();
    if (!updated) {
      return res.status(404).json({ success: false, error: { message: 'Service not found' } });
    }

    await logAdminAction({
      actorId: req.admin.id,
      action: 'SERVICE_UPDATE',
      entityType: 'LoanService',
      entityId: updated._id,
      metadata: { slug: updated.slug, status: updated.status },
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// Admin Guidelines Management
// ==========================================

// GET /api/v1/admin/guidelines (includes drafts)
router.get('/guidelines', requireAdmin, async (_req, res, next) => {
  try {
    const list = await Guideline.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/admin/guidelines
router.post('/guidelines', requireAdmin, validateBody(guidelineMutationSchema), async (req, res, next) => {
  try {
    const existing = await Guideline.findOne({ slug: req.body.slug });
    if (existing) {
      return res.status(409).json({ success: false, error: { message: 'Guideline with this slug already exists' } });
    }

    const created = await Guideline.create({
      ...req.body,
      reviewedAt: new Date(),
    });

    await logAdminAction({
      actorId: req.admin.id,
      action: 'GUIDELINE_CREATE',
      entityType: 'Guideline',
      entityId: created._id,
      metadata: { slug: created.slug, status: created.status },
    });

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/admin/guidelines/:id
router.patch('/guidelines/:id', requireAdmin, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, error: { message: 'Invalid guideline ID' } });
    }

    const allowed = ['title', 'content', 'status', 'sortOrder'];
    const update = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) update[key] = req.body[key];
    }
    update.reviewedAt = new Date();

    const updated = await Guideline.findByIdAndUpdate(req.params.id, update, { new: true }).lean();
    if (!updated) {
      return res.status(404).json({ success: false, error: { message: 'Guideline not found' } });
    }

    await logAdminAction({
      actorId: req.admin.id,
      action: 'GUIDELINE_UPDATE',
      entityType: 'Guideline',
      entityId: updated._id,
      metadata: { slug: updated.slug, status: updated.status },
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

export default router;
