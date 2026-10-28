import { Enquiry } from '../models/Enquiry.js';
import { isDbConnected } from '../config/database.js';

export async function createPublicEnquiry(payload) {
  // Reject submission immediately if database is not connected (do not fake success)
  if (!isDbConnected()) {
    const error = new Error('Database service unavailable. Please contact us directly by phone or WhatsApp.');
    error.statusCode = 503;
    error.code = 'SERVICE_UNAVAILABLE';
    throw error;
  }

  // Pick allowed fields explicitly (prevent mass-assignment)
  const enquiry = new Enquiry({
    name: payload.name,
    phone: payload.phone,
    serviceType: payload.serviceType,
    preferredLanguage: payload.preferredLanguage,
    message: payload.message || '',
    consentGiven: payload.consentGiven,
    status: 'new',
  });

  await enquiry.save();

  // Return public safe response with referenceId only; no admin notes or internal fields
  return {
    referenceId: enquiry.referenceId,
    name: enquiry.name,
    serviceType: enquiry.serviceType,
    createdAt: enquiry.createdAt,
  };
}
