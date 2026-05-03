import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, maxlength: 20 },
  logo: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  season: { type: String, required: true },
  colors: {
    primary: { type: String },
    secondary: { type: String }
  },
  status: { type: String, enum: ['ACTIVO', 'INACTIVO'], default: 'ACTIVO' }
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);