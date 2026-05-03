import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['league', 'cup', 'friendly'], default: 'league' },
  season: String,
  startDate: Date,
  endDate: Date,
  isActive: { type: Boolean, default: true },
  standings: [{
    team: { type: String, required: true },
    played: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    drawn: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    goalsFor: { type: Number, default: 0 },
    goalsAgainst: { type: Number, default: 0 },
    points: { type: Number, default: 0 }
  }]
}, {
  timestamps: true
});

export default mongoose.model('Competition', competitionSchema);
