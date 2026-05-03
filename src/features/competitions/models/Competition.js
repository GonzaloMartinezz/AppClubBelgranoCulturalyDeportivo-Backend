import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, maxlength: 20 },
  season: { type: String, required: true },
  division: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  format: {
    type: String,
    enum: ['LEAGUE', 'KNOCKOUT', 'HYBRID'],
    default: 'LEAGUE'
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  standings: [{
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    position: Number,
    played: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    pointsFor: { type: Number, default: 0 },
    pointsAgainst: { type: Number, default: 0 },
    difference: { type: Number, default: 0 },
    points: { type: Number, default: 0 }
  }],
  status: {
    type: String,
    enum: ['UPCOMING', 'ACTIVE', 'COMPLETED', 'SUSPENDED'],
    default: 'UPCOMING'
  }
}, { timestamps: true });

export default mongoose.model('Competition', competitionSchema);