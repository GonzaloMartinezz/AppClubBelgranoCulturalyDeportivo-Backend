import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  dni: { type: String, required: true, unique: true },
  birthDate: { type: Date },
  role: {
    type: String,
    enum: ['HEAD_COACH', 'ASSISTANT_COACH', 'FITNESS_COACH', 'PHYSIO', 'TEAM_MANAGER', 'UTILITY'],
    required: true
  },
  roleDisplay: { type: String, required: true },
  photo: { type: String },
  bio: { type: String, maxlength: 500 },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  credentials: {
    license: String,
    certifiedBy: String,
    certificationDate: Date
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE'
  }
}, { timestamps: true });

staffSchema.index({ role: 1, team: 1 });

export default mongoose.model('Staff', staffSchema);