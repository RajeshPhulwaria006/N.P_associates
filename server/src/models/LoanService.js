import mongoose from 'mongoose';

const bilingualTextSchema = new mongoose.Schema(
  {
    en: { type: String, required: true, trim: true },
    hi: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const bilingualListSchema = new mongoose.Schema(
  {
    en: [{ type: String, trim: true }],
    hi: [{ type: String, trim: true }],
  },
  { _id: false }
);

const loanServiceSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
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
    title: { type: bilingualTextSchema, required: true },
    shortDescription: { type: bilingualTextSchema, required: true },
    description: { type: bilingualTextSchema, required: true },
    eligibility: { type: bilingualListSchema, default: () => ({ en: [], hi: [] }) },
    documents: { type: bilingualListSchema, default: () => ({ en: [], hi: [] }) },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const LoanService = mongoose.models.LoanService || mongoose.model('LoanService', loanServiceSchema);
