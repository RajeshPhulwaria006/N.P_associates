import { z } from 'zod';

export const serviceCategoryEnum = z.enum([
  'home-loan',
  'business-loan',
  'personal-loan',
  'vehicle-loan',
  'loan-against-property',
  'other-services',
]);

export const bilingualTextSchema = z.object({
  en: z.string().trim().min(1, 'English text is required'),
  hi: z.string().trim().min(1, 'Hindi text is required'),
});

export const bilingualListSchema = z.object({
  en: z.array(z.string().trim()).default([]),
  hi: z.array(z.string().trim()).default([]),
});

export const enquirySubmissionSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters'),
  phone: z.string().trim().regex(/^[0-9+\s\-().]{7,20}$/, 'Please enter a valid contact phone number'),
  serviceType: serviceCategoryEnum,
  preferredLanguage: z.enum(['en', 'hi']).default('en'),
  message: z.string().trim().max(1000, 'Message cannot exceed 1000 characters').optional().default(''),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to be contacted regarding this enquiry' }),
  }),
  // Simple spam protection: honeypot field must remain empty
  website: z.string().max(0, 'Spam detected').optional().default(''),
});
