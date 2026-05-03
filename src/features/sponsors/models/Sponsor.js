import mongoose from 'mongoose';

const sponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  website: { type: String },
  description: { type: String },
  level: {
    type: String,
    enum: ['PLATINUM', 'GOLD', 'SILVER', 'BRONZE', 'OFFICIAL'],
    required: true
  },
  displayOrder: { type: Number, default: 0 },
  showOnHome: { type: Boolean, default: true },
  showOnGallery: { type: Boolean, default: false },
  dimensions: {
    width: Number,
    height: Number
  },
  contractStart: { type: Date },
  contractEnd: { type: Date },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

sponsorSchema.index({ level: 1, displayOrder: 1 });

export default mongoose.model('Sponsor', sponsorSchema);