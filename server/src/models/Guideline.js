import mongoose from 'mongoose';

const bilingualTextSchema = new mongoose.Schema(
  {
    en: { type: String, required: true, trim: true },
    hi: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const guidelineSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    title: { type: bilingualTextSchema, required: true },
    content: { type: bilingualTextSchema, required: true },
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

export const Guideline = mongoose.models.Guideline || mongoose.model('Guideline', guidelineSchema);
