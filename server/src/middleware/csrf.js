import crypto from 'crypto';

const CSRF_COOKIE_NAME = 'np_csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

export function csrfProtection(req, res, next) {
  // Safe methods do not mutate state
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];

  // Check or establish csrf token cookie
  let token = req.cookies?.[CSRF_COOKIE_NAME];
  if (!token) {
    token = crypto.randomBytes(24).toString('hex');
    res.cookie(CSRF_COOKIE_NAME, token, {
      httpOnly: false, // Must be readable by client script to include in header
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
    });
  }

  if (safeMethods.includes(req.method)) {
    return next();
  }

  // For state-changing session requests (POST, PATCH, DELETE, PUT)
  // Skip CSRF check only for unauthenticated public enquiry endpoint or public health checks
  if (req.originalUrl.startsWith('/api/v1/enquiries')) {
    return next();
  }

  const clientToken = req.headers[CSRF_HEADER_NAME] || req.body?._csrf;

  if (!clientToken || clientToken !== token) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'CSRF_INVALID',
        message: 'Invalid or missing CSRF security token',
      },
    });
  }

  next();
}
