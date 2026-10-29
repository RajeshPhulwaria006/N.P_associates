import { AdminUser } from '../models/AdminUser.js';

export async function requireAdmin(req, res, next) {
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required. Please sign in.',
      },
    });
  }

  try {
    const admin = await AdminUser.findById(req.session.adminId).lean();

    if (!admin || !admin.active) {
      // Inactive or deleted admin: destroy invalid session
      req.session.destroy(() => {});
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Admin account is inactive or no longer authorized.',
        },
      });
    }

    req.admin = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    };

    next();
  } catch (err) {
    next(err);
  }
}
