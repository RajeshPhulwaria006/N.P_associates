import mongoose from 'mongoose';
import crypto from 'crypto';

const enquirySchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: () => `NP-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    serviceType: {
      type: String,
      required: true,
      enum: [
        'home-loan',
        'business-loan',
        'personal-loan',
        'vehicle-loan',
        'loan-against-property',
        'other-services',
      ],
      index: true,
    },
    preferredLanguage: {
      type: String,
      enum: ['en', 'hi'],
      default: 'en',
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    consentGiven: {
      type: Boolean,
      required: true,
      validate: {
        validator: (v) => v === true,
        message: 'Consent must be given to submit an enquiry',
      },
    },
    consentAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'contacted', 'closed', 'spam'],
      default: 'new',
      index: true,
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: '',
      select: false, // Ensure admin notes are never included in default queries
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
