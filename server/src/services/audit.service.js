import { AuditLog } from '../models/AuditLog.js';

export async function logAdminAction({ actorId, action, entityType, entityId = null, metadata = {} }) {
  try {
    // Sanitize metadata to never store passwords, secrets, or raw session IDs
    const safeMeta = { ...metadata };
    delete safeMeta.password;
    delete safeMeta.passwordHash;
    delete safeMeta.SESSION_SECRET;
    delete safeMeta._csrf;

    await AuditLog.create({
      actorId,
      action,
      entityType,
      entityId,
      metadata: safeMeta,
    });
  } catch (err) {
    console.error('[AuditLog] Error recording audit log entry:', err.message);
  }
}
