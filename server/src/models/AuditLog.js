import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'LOGIN',
        'LOGOUT',
        'SERVICE_CREATE',
        'SERVICE_UPDATE',
        'SERVICE_DELETE',
        'GUIDELINE_CREATE',
        'GUIDELINE_UPDATE',
        'GUIDELINE_DELETE',
        'ENQUIRY_STATUS_UPDATE',
        'ENQUIRY_NOTE_UPDATE',
      ],
      index: true,
    },
    entityType: {
      type: String,
      required: true,
      enum: ['LoanService', 'Guideline', 'Enquiry', 'AdminUser'],
      index: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    // Sanitized change metadata only - strictly no passwords, session tokens, or personal identifiers
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Audit logs are append-only
  }
);

export const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
