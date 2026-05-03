import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  dni: { type: String, required: true, unique: true, maxlength: 15 },
  birthDate: { type: Date, required: true },
  position: {
    type: String,
    enum: ['BASE', 'ESCOLTA', 'ALERO', 'ALA-PIVOT', 'PIVOT'],
    required: true
  },
  number: { type: Number, required: true, min: 0, max: 99 },
  photo: { type: String },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  careerStats: {
    matchesPlayed: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    steals: { type: Number, default: 0 },
    blocks: { type: Number, default: 0 },
    fouls: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'INJURED', 'SUSPENDED'],
    default: 'ACTIVE'
  }
}, { timestamps: true });

playerSchema.index({ name: 1, lastName: 1 });
playerSchema.index({ dni: 1 });
playerSchema.index({ number: 1, team: 1 });

export default mongoose.model('Player', playerSchema);