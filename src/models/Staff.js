import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  dni: { type: String, unique: true },
  birthDate: { type: Date },
  role: { type: String, enum: ['DT', 'AYUDANTE', 'PF', 'KINESIOLOGO', 'MEDICO', 'UTILERÍA'], required: true },
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
  status: { type: String, enum: ['ACTIVO', 'INACTIVO'], default: 'ACTIVO' }
}, { timestamps: true });

staffSchema.index({ role: 1, team: 1 });

export default mongoose.model('Staff', staffSchema);