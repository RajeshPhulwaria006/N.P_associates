import { LoanService } from '../models/LoanService.js';
import { Guideline } from '../models/Guideline.js';
import { isDbConnected } from '../config/database.js';
import { SAMPLE_SERVICES, SAMPLE_GUIDELINES } from './sampleData.js';

// Safe projector ensuring private metadata/drafts are stripped
function sanitizePublicService(svc) {
  return {
    slug: svc.slug,
    category: svc.category,
    title: svc.title,
    shortDescription: svc.shortDescription,
    description: svc.description,
    eligibility: svc.eligibility,
    documents: svc.documents,
    status: svc.status,
    reviewedAt: svc.reviewedAt,
  };
}

function sanitizePublicGuideline(g) {
  return {
    slug: g.slug,
    title: g.title,
    content: g.content,
    status: g.status,
    reviewedAt: g.reviewedAt,
  };
}

export async function getPublishedServices() {
  if (isDbConnected()) {
    const list = await LoanService.find({ status: 'published' })
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();
    return list.map(sanitizePublicService);
  }
  // In dev/test when DB is not actively running, fallback to verified sample records
  return SAMPLE_SERVICES.filter((s) => s.status === 'published').map(sanitizePublicService);
}

export async function getPublishedServiceBySlug(slug) {
  if (isDbConnected()) {
    const item = await LoanService.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();
    return item ? sanitizePublicService(item) : null;
  }
  const item = SAMPLE_SERVICES.find(
    (s) => s.slug.toLowerCase() === slug.toLowerCase() && s.status === 'published'
  );
  return item ? sanitizePublicService(item) : null;
}

export async function getPublishedGuidelines() {
  if (isDbConnected()) {
    const list = await Guideline.find({ status: 'published' })
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();
    return list.map(sanitizePublicGuideline);
  }
  return SAMPLE_GUIDELINES.filter((g) => g.status === 'published').map(sanitizePublicGuideline);
}

export async function getPublishedGuidelineBySlug(slug) {
  if (isDbConnected()) {
    const item = await Guideline.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();
    return item ? sanitizePublicGuideline(item) : null;
  }
  const item = SAMPLE_GUIDELINES.find(
    (g) => g.slug.toLowerCase() === slug.toLowerCase() && g.status === 'published'
  );
  return item ? sanitizePublicGuideline(item) : null;
}
